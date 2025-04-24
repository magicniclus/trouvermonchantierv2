/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CheckoutForm from "@/components/stripe/CheckoutForm";
import Nav from "@/components/tailwindui/nav/Nav";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const pricing = {
  tiers: {
    "tier-starter": { mois: "49€", an: "499€" },
    "tier-scale": { mois: "199€", an: "1999€" },
    "tier-growth": { mois: "349€", an: "3799€" },
  },
  features: {
    "tier-starter": [
      "1 demande de devis par mois",
      "Page Web dédiée avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support 6j/7",
    ],
    "tier-scale": [
      "5 demandes de devis par mois",
      "Page Web dédiée avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support Premium 6j/7",
    ],
    "tier-growth": [
      "10 demandes de devis par mois",
      "Page Web dédiée avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support Premium 6j/7",
    ],
  },
};

const priceIds = {
  "tier-starter": {
    mois: process.env.NEXT_PUBLIC_SENDGRID_STARTER_MOIS,
    an: process.env.NEXT_PUBLIC_SENDGRID_STARTER_ANNEE,
  },
  "tier-scale": {
    mois: process.env.NEXT_PUBLIC_SENDGRID_SCALE_MOIS,
    an: process.env.NEXT_PUBLIC_SENDGRID_SCALE_ANNEE,
  },
  "tier-growth": {
    mois: process.env.NEXT_PUBLIC_SENDGRID_GROWTH_MOIS,
    an: process.env.NEXT_PUBLIC_SENDGRID_GROWTH_ANNEE,
  },
};

type TierKey = keyof typeof pricing.tiers;
type FrequencyKey = keyof (typeof pricing.tiers)[TierKey];

const CheckoutPageContent = () => {
  const searchParams = useSearchParams();
  const [tier, setTier] = useState<TierKey | null>(null);
  const [frequency, setFrequency] = useState<FrequencyKey | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [mainFeatures, setMainFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [metier, setMetier] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const tierParam = searchParams?.get("tier") as TierKey | null;
    const frequencyParam = searchParams?.get(
      "frequency"
    ) as FrequencyKey | null;
    const metierParam = searchParams?.get("metier");
    const emailParam = searchParams?.get("email");
    const addressParam = searchParams?.get("address");
    const telephone = searchParams?.get("telephone");
    const name = searchParams?.get("name");

    if (tierParam) setTier(tierParam);
    if (frequencyParam) setFrequency(frequencyParam);
    if (metierParam) setMetier(metierParam);
    if (emailParam) setEmail(emailParam);
    if (addressParam) setAddress(addressParam);
    if (telephone) setTelephone(telephone);
    if (name) setName(name);

    if (tierParam && frequencyParam) {
      setMainFeatures(pricing.features[tierParam]);
      const selectedPriceString = pricing.tiers[tierParam][frequencyParam];
      const selectedPrice = parseFloat(selectedPriceString.replace("€", ""));
      setPrice(selectedPrice);
    }
  }, [searchParams]);

  const VAT_RATE = 0.2;
  const subtotal = price ? price / (1 + VAT_RATE) : 0;
  const VAT = price ? price - subtotal : 0;
  const total = price || 0;

  return (
    <>
      <Nav withMenu={false} />
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden max-w-5xl mx-auto">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <div className="flex-auto px-6 py-6">
            <h2 className="pt-4 text-slate-700 font-bold">
              Récapitulatif de la commande
            </h2>
            <ul className="mt-6 space-y-4 border-gray-200">
              <li className="flex items-start slate-700">
                Metier choisi:<span>&nbsp;</span>
                <span className="text-slate-700 ">{metier}</span>
              </li>
              <li className="flex items-start font slate-700">
                Secteur:<span>&nbsp;</span>
                <span className="text-slate-700 ">{address}</span>
              </li>
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    index === 0 ? "slate-700" : "text-slate-700"
                  }`}
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-yellow-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Sous-total</dt>
                <dd className="text-gray-900">{subtotal.toFixed(2)}€</dd>
              </div>
              <div className="flex justify-between">
                <dt>TVA (20%)</dt>
                <dd className="text-gray-900">{VAT.toFixed(2)}€</dd>
              </div>
              <div className="flex justify-between border-t pt-6">
                <dt>Total</dt>
                <dd className="text-gray-900">{total.toFixed(2)}€</dd>
              </div>
            </dl>
            <p className="mt-10 text-xs text-slate-400">
              Un prélèvement sera effectué chaque{" "}
              {frequency === "mois" ? "mois" : "année"}. L&apos;abonnement peut
              être arrêté à tout moment et prendra fin à la date
              d&apos;expiration de la période en cours.
            </p>
          </div>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex rounded-md"
        >
          <div className="flex-auto px-6 py-6">
            <h2 className="pt-4 text-slate-700 font-bold">
              Récapitulatif de la commande
            </h2>
            <ul className="mt-6 space-y-4 border-gray-200">
              <li className="flex items-start slate-700">
                Metier choisi:<span>&nbsp;</span>
                <span className="text-slate-700 font-semibold">{metier}</span>
              </li>
              <li className="flex items-start font slate-700">
                Secteur:<span>&nbsp;</span>
                <span className="text-slate-700 font-semibold">{address}</span>
              </li>
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    index === 0 ? "text-slate-700" : "text-slate-700"
                  }`}
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-yellow-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Sous-total</dt>
                <dd className="text-gray-900">{subtotal.toFixed(2)}€</dd>
              </div>
              <div className="flex justify-between">
                <dt>TVA (20%)</dt>
                <dd className="text-gray-900">{VAT.toFixed(2)}€</dd>
              </div>
              <div className="flex justify-between border-t pt-6">
                <dt>Total</dt>
                <dd className="text-gray-900">{total.toFixed(2)}€</dd>
              </div>
            </dl>
            <p className="mt-10 text-xs text-slate-400">
              Un prélèvement sera effectué chaque{" "}
              {frequency === "mois" ? "mois" : "année"}. L&apos;abonnement peut
              être arrêté à tout moment et prendra fin à la date
              d&apos;expiration de la période en cours.
            </p>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 py-10 sm:px-12 rounded-md"
        >
          <h2
            id="payment-heading"
            className="text-center text-slate-700 font-bold"
          >
            Information de paiement
          </h2>

          <div className="mx-auto max-w-lg lg:pt-10">
            {tier && frequency ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  tier={tier}
                  frequency={frequency}
                  price={total}
                  email={email}
                  setEmail={setEmail}
                  metier={metier}
                  address={address}
                  telephone={telephone}
                  name={name}
                />
              </Elements>
            ) : (
              <p className="text-slate-700">Chargement...</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
    </div>}>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;
