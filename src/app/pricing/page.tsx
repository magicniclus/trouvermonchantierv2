"use client";

import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";
import { updateProspect } from "@/firebase/database";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation"; // Importer useRouter de Next.js
import { useEffect, useState } from "react";

const pricing = {
  frequencies: [
    { value: "mois", label: "Mois" },
    { value: "an", label: "An" },
  ],
  tiers: [
    {
      name: "1 Demande de devis par mois",
      id: "tier-starter",
      href: "#",
      featured: false,
      description:
        "Notre pack d’essai pour les artisans souhaitant découvrir notre service.",
      price: { mois: "49€", an: "499€" },
      mainFeatures: [
        "1 demande de devis dans votre secteur et prestations",
        "Page Web dédiée avec nom de domaine personnalisé",
        "Sans engagement",
        "Service support 6j/7",
      ],
    },
    {
      name: "5 Demandes de devis par mois",
      id: "tier-scale",
      href: "#",
      featured: true,
      description:
        "Notre pack essentiel pour les artisans désireux de faire croître leur chiffre d'affaires.",
      price: { mois: "199€", an: "1999€" },
      mainFeatures: [
        "5 demandes de devis minimum dans votre secteur et prestations",
        "Page Web dédiée avec nom de domaine personnalisé",
        "Sans engagement",
        "Service support Premium 6j/7",
      ],
    },
    {
      name: "10 Demandes de devis par mois",
      id: "tier-growth",
      href: "#",
      featured: false,
      description: "Notre pack ultime pour les artisans ambitieux.",
      price: { mois: "349€", an: "3799€" },
      mainFeatures: [
        "10 demandes de devis minimum dans votre secteur et prestations",
        "Page Web dédiée avec nom de domaine personnalisé",
        "Sans engagement",
        "Service support Premium 6j/7",
      ],
    },
  ],
  sections: [
    {
      name: "Services inclus",
      features: [
        {
          name: "Nombre de demandes de devis",
          tiers: {
            Starter: "1 demande",
            Scale: "5 demandes",
            Growth: "10 demandes",
          },
        },
        {
          name: "Service support",
          tiers: {
            Starter: "6j/7",
            Scale: "Premium 6j/7",
            Growth: "Premium 6j/7",
          },
        },
        {
          name: "Page Web dédiée",
          tiers: {
            Starter: true,
            Scale: true,
            Growth: true,
          },
        },
        {
          name: "Nom de domaine personnalisé",
          tiers: {
            Starter: true,
            Scale: true,
            Growth: true,
          },
        },
      ],
    },
    {
      name: "Autres avantages",
      features: [
        {
          name: "Sans engagement",
          tiers: { Starter: true, Scale: true, Growth: true },
        },
        {
          name: "Support client 24/7",
          tiers: { Starter: false, Scale: true, Growth: true },
        },
        {
          name: "Notifications instantanées",
          tiers: { Starter: true, Scale: true, Growth: true },
        },
      ],
    },
  ],
};

const faqs = [
  {
    id: 2,
    question: "Comment puis-je m'abonner?",
    answer:
      "Vous pouvez vous abonner en cliquant sur le bouton 'S'abonner' sur notre page de tarification et en suivant les instructions.",
  },
  {
    id: 3,
    question: "Quels modes de paiement acceptez-vous?",
    answer:
      "Nous acceptons les paiements par carte de crédit, PayPal et virement bancaire.",
  },
  {
    id: 4,
    question: "Puis-je annuler mon abonnement à tout moment?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre compte en ligne.",
  },
  {
    id: 6,
    question: "Comment puis-je contacter le support client?",
    answer:
      "Vous pouvez contacter notre support client par email à support@example.com ou par téléphone au 01 23 45 67 89.",
  },
  {
    id: 7,
    question: "Quels sont les avantages d'un abonnement annuel?",
    answer:
      "Un abonnement annuel vous permet de bénéficier de deux mois gratuits par rapport à un abonnement mensuel.",
  },
  {
    id: 8,
    question: "Puis-je changer de plan d'abonnement?",
    answer:
      "Oui, vous pouvez changer de plan d'abonnement à tout moment depuis votre compte en ligne.",
  },
  {
    id: 9,
    question: "Comment puis-je accéder à mes factures?",
    answer:
      "Vous pouvez accéder à vos factures depuis votre compte en ligne sous la section 'Facturation'.",
  },
  {
    id: 10,
    question: "Offrez-vous des réductions pour les étudiants?",
    answer:
      "Oui, nous offrons des réductions pour les étudiants. Veuillez nous contacter avec une preuve de votre statut d'étudiant pour en bénéficier.",
  },
  {
    id: 11,
    question: "Comment puis-je mettre à jour mes informations de paiement?",
    answer:
      "Vous pouvez mettre à jour vos informations de paiement depuis votre compte en ligne sous la section 'Paiement'.",
  },
  {
    id: 12,
    question: "Y a-t-il des frais d'installation?",
    answer:
      "Non, il n'y a pas de frais d'installation pour utiliser notre service.",
  },
];

const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type FeatureTiers = {
  Starter: boolean | string;
  Scale: boolean | string;
  Growth: boolean | string;
};

const Page = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const uidParam = searchParams.get("uid");
    if (uidParam) {
      setUid(uidParam);
    }
  }, [searchParams]);

  const handleSubscribe = async (tierId: string) => {
    if (!uid) return;

    const data = {
      formula: tierId,
      recurrence: frequency.value,
    };

    try {
      await updateProspect(uid, data);
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);

      searchParams.set("tier", tierId);
      searchParams.set("frequency", frequency.value);

      const newUrl = `/pricing/secteur?${searchParams.toString()}`;
      router.push(newUrl);
    } catch (error) {
      console.error("Failed to update prospect: ", error);
    }
  };

  return (
    <>
      <Nav withMenu={false} />
      <main>
        {/* Pricing section */}
        <div className="isolate overflow-hidden">
          <div className="flow-root bg-gray-900 py-16 sm:pt-32 lg:pb-0">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <div className="relative z-10">
                <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
                  Faites passer votre entreprise au{" "}
                  <span className="text-yellow-500">niveau supérieur</span>.
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
                  Avec Trouver-mon-chantier.fr, obtenir des chantiers n&apos;a
                  jamais été aussi simple.
                </p>
                <div className="mt-16 flex justify-center">
                  <fieldset aria-label="Payment frequency">
                    <RadioGroup
                      value={frequency}
                      onChange={setFrequency}
                      className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
                    >
                      {pricing.frequencies.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={({ checked }) =>
                            classNames(
                              checked ? "bg-yellow-500" : "",
                              "cursor-pointer rounded-full px-2.5 py-1"
                            )
                          }
                        >
                          {option.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              </div>
              <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
                <svg
                  viewBox="0 0 1208 1024"
                  aria-hidden="true"
                  className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
                >
                  <ellipse
                    cx={604}
                    cy={512}
                    fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                    rx={604}
                    ry={512}
                  />
                  <defs>
                    <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                      <stop stopColor="#334155" />
                      <stop offset={1} stopColor="#084A59" />
                    </radialGradient>
                  </defs>
                </svg>
                <div
                  className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                  aria-hidden="true"
                />
                {pricing.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={classNames(
                      tier.featured
                        ? "z-10 bg-white shadow-xl ring-1 ring-gray-900/10"
                        : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
                      "relative rounded-2xl"
                    )}
                  >
                    <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                      <h2
                        id={tier.id}
                        className={classNames(
                          tier.featured ? "text-gray-900" : "text-white",
                          "text-sm font-semibold leading-6"
                        )}
                      >
                        {tier.name}
                      </h2>
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                        <div className="mt-2 flex items-center gap-x-4">
                          <p
                            className={classNames(
                              tier.featured ? "text-gray-900" : "text-white",
                              "text-4xl font-bold tracking-tight"
                            )}
                          >
                            {
                              tier.price[
                                frequency.value as keyof typeof tier.price
                              ]
                            }
                          </p>
                          <div className="text-sm leading-5">
                            <p
                              className={
                                tier.featured ? "text-gray-900" : "text-white"
                              }
                            >
                              EUR
                            </p>
                            <p
                              className={
                                tier.featured
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }
                            >{`Par ${frequency.label.toLowerCase()}`}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSubscribe(tier.id)}
                          aria-describedby={tier.id}
                          className={classNames(
                            tier.featured
                              ? "bg-yellow-500 shadow-sm hover:bg-yellow-400 focus-visible:outline-yellow-500"
                              : "bg-white/10 hover:bg-white/20 focus-visible:outline-white",
                            "rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          )}
                        >
                          S&apos;abonner
                        </button>
                      </div>
                      <div className="mt-8 flow-root sm:mt-10">
                        <ul
                          role="list"
                          className={classNames(
                            tier.featured
                              ? "divide-gray-900/5 border-gray-900/5 text-gray-600"
                              : "divide-white/5 border-white/5 text-white",
                            "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
                          )}
                        >
                          {tier.mainFeatures.map((mainFeature) => (
                            <li key={mainFeature} className="flex gap-x-3 py-2">
                              <CheckIcon
                                className={classNames(
                                  tier.featured
                                    ? "text-yellow-600"
                                    : "text-gray-500",
                                  "h-6 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                              {mainFeature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative bg-gray-50 lg:pt-14">
            <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
              {/* Feature comparison (up to lg) */}
              <section
                aria-labelledby="mobile-comparison-heading"
                className="lg:hidden"
              >
                <h2 id="mobile-comparison-heading" className="sr-only">
                  Feature comparison
                </h2>

                <div className="mx-auto max-w-2xl space-y-16">
                  <div className="border-t border-gray-900/10">
                    <div className="border-t-2 border-transparent pt-10 md:w-80">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        {pricing.tiers[0].name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {pricing.tiers[0].description}
                      </p>
                    </div>
                    <div className="mt-10 space-y-10">
                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Services inclus
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nombre de demandes de devis
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">1 demande</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Service support
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">6j/7</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Page Web dédiée
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nom de domaine personnalisé
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Autres avantages
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Sans engagement
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Support client 24/7
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <XMarkIconMini
                                  className="mx-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">No</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Notifications instantanées
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-900/10">
                    <div className="border-t-2 border-transparent pt-10 md:w-80">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        {pricing.tiers[1].name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {pricing.tiers[1].description}
                      </p>
                    </div>
                    <div className="mt-10 space-y-10">
                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Services inclus
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nombre de demandes de devis
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">
                                  5 demandes
                                </span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Service support
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">
                                  Premium 6j/7
                                </span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Page Web dédiée
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nom de domaine personnalisé
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Autres avantages
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Sans engagement
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Support client 24/7
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Notifications instantanées
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-900/10">
                    <div className="border-t-2 border-transparent pt-10 md:w-80">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        {pricing.tiers[2].name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {pricing.tiers[2].description}
                      </p>
                    </div>
                    <div className="mt-10 space-y-10">
                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Services inclus
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nombre de demandes de devis
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">
                                  10 demandes
                                </span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Service support
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <span className="text-gray-900">
                                  Premium 6j/7
                                </span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Page Web dédiée
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Nom de domaine personnalisé
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">
                          Autres avantages
                        </h4>
                        <div className="relative mt-6 rounded-lg bg-white shadow-sm ring-1 ring-gray-900/10">
                          <dl className="divide-y divide-gray-200 text-sm leading-6">
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Sans engagement
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Support client 24/7
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-gray-600">
                                Notifications instantanées
                              </dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Feature comparison (lg+) */}
              <section
                aria-labelledby="comparison-heading"
                className="hidden lg:block"
              >
                <h2 id="comparison-heading" className="sr-only">
                  Feature comparison
                </h2>

                <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
                  {pricing.tiers.map((tier) => (
                    <div key={tier.id} aria-hidden="true" className="-mt-px">
                      <div
                        className={classNames(
                          tier.featured
                            ? "border-yellow-600"
                            : "border-transparent",
                          "border-t-2 pt-10"
                        )}
                      >
                        <p
                          className={classNames(
                            tier.featured ? "text-yellow-600" : "text-gray-900",
                            "text-sm font-semibold leading-6"
                          )}
                        >
                          {tier.name}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="-mt-6 space-y-16">
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      Services inclus
                    </h3>
                    <div className="relative -mx-8 mt-10">
                      <div
                        className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                        aria-hidden="true"
                      >
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                      </div>

                      <table className="relative w-full border-separate border-spacing-x-8">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {pricing.tiers.map((tier) => (
                              <th key={tier.id} scope="col">
                                <span className="sr-only">
                                  {tier.name} tier
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Nombre de demandes de devis
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">1 demande</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">
                                  5 demandes
                                </span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">
                                  10 demandes
                                </span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Service support
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">6j/7</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">
                                  Premium 6j/7
                                </span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <span className="text-gray-900">
                                  Premium 6j/7
                                </span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Page Web dédiée
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Nom de domaine personnalisé
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      Autres avantages
                    </h3>
                    <div className="relative -mx-8 mt-10">
                      <div
                        className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                        aria-hidden="true"
                      >
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                      </div>

                      <table className="relative w-full border-separate border-spacing-x-8">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {pricing.tiers.map((tier) => (
                              <th key={tier.id} scope="col">
                                <span className="sr-only">
                                  {tier.name} tier
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Sans engagement
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Support client 24/7
                              <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <XMarkIconMini
                                  className="mx-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">No</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              Notifications instantanées
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-yellow-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Yes</span>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto my-24 max-w-5xl divide-y divide-gray-900/10 px-6 sm:my-56 lg:px-8 ">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                  {faq.question}
                </dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      <Footer className="bg-slate-900" />
    </>
  );
};

export default Page;
