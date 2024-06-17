"use client";

// CheckoutPage component
import Nav from "@/components/tailwindui/nav/Nav";
import { transferProspectToClient } from "@/firebase/database";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const CheckoutForm = ({
  tier,
  frequency,
  price,
  email,
  setEmail,
  metier,
  address,
}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceIds[tier][frequency],
        email,
        uid: searchParams.get("uid"),
      }),
    });

    const session = await response.json();
    const result = await stripe.confirmCardPayment(session.clientSecret, {
      payment_method: {
        card: cardNumberElement!,
        billing_details: {
          email,
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await handleSuccessfulPayment(searchParams.get("uid")!, email);
      }
    }
  };

  const handleSuccessfulPayment = async (uid: string, email: string) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "defaultPassword"
      );
      const user = userCredential.user;

      await transferProspectToClient(uid);
      console.log("Prospect transferred to client");

      const db = getDatabase();
      await set(ref(db, `clients/${user.uid}`), {
        email,
        metier,
        address,
        tier,
        frequency,
      });

      console.log("Client data saved");
    } catch (error) {
      console.error("Error handling successful payment: ", error);
    }
  };

  return (
    <form className="mt-6" onSubmit={handlePayment}>
      <div className="grid grid-cols-12 gap-x-4 gap-y-6">
        <div className="col-span-full">
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email-address"
              name="email-address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700"
          >
            Informations de la carte
          </label>
          <div className="mt-1">
            <CardNumberElement
              id="card-number-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="expiry-element"
            className="block text-sm font-medium text-gray-700"
          >
            Date d&apos;expiration
          </label>
          <div className="mt-1">
            <CardExpiryElement
              id="expiry-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="cvc-element"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <CardCvcElement
              id="cvc-element"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        Payer {price?.toFixed(2)}€
      </button>

      <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
        <LockClosedIcon
          className="mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Paiement securisé SSL par STRIPE
      </p>
    </form>
  );
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const [tier, setTier] = useState<TierKey | null>(null);
  const [frequency, setFrequency] = useState<FrequencyKey | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [mainFeatures, setMainFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [metier, setMetier] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const tierParam = searchParams.get("tier") as TierKey | null;
    const frequencyParam = searchParams.get("frequency") as FrequencyKey | null;
    const metierParam = searchParams.get("metier");
    const emailParam = searchParams.get("email");
    const addressParam = searchParams.get("address");

    if (tierParam) setTier(tierParam);
    if (frequencyParam) setFrequency(frequencyParam);
    if (metierParam) setMetier(metierParam);
    if (emailParam) setEmail(emailParam);
    if (addressParam) setAddress(addressParam);

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
            <h2 id="pt-4 text-slate-700 font-bold">
              Récapitulatif de la commande
            </h2>
            <ul className="mt-6 space-y-4 border-gray-200">
              <li className={`flex items-start ${"slate-700"}`}>
                Metier choisi:{" "}
                <span className="text-yellow-500 font-semibold">{metier}</span>
              </li>
              <li className={`flex items-start ${"slate-700"}`}>
                Secteur:{" "}
                <span className="text-yellow-500 font-semibold">{address}</span>
              </li>
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    index === 0 ? "font-bold slate-700" : "text-slate-700"
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
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <div className="flex-auto px-6 py-6">
            <h2 id="pt-4 text-slate-700 font-bold">
              Récapitulatif de la commande
            </h2>
            <ul className="mt-6 space-y-4 border-gray-200">
              <li className={`flex items-start ${"slate-700"}`}>
                Metier choisi:{" "}
                <span className="text-yellow-500 font-semibold">{metier}</span>
              </li>
              <li className={`flex items-start ${"font slate-700"}`}>
                Secteur:{" "}
                <span className="text-yellow-500 font-semibold">{address}</span>
              </li>
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    index === 0 ? "font-bold slate-700" : "text-slate-700"
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
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-4 rounded-md"
        >
          <h2 id="payment-heading" className="text-center">
            Information de paiement
          </h2>

          <div className="mx-auto max-w-lg lg:pt-16">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                tier={tier}
                frequency={frequency}
                price={total}
                email={email}
                setEmail={setEmail}
                metier={metier}
                address={address}
              />
            </Elements>
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckoutPage;
