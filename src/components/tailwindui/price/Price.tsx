"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Frequency {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
}

interface Tier {
  name: string;
  id: string;
  href: string;
  price: { monthly: string; annually: string };
  description: string;
  features: string[];
  mostPopular: boolean;
}

const frequencies: Frequency[] = [
  { value: "monthly", label: "Mois", priceSuffix: "/mois" },
  { value: "annually", label: "Ans", priceSuffix: "/an" },
];

const tiers: Tier[] = [
  {
    name: "1 Demande de devis par mois",
    id: "tier-freelancer",
    href: "#hero",
    price: { monthly: "49€", annually: "499€" },
    description:
      "Notre pack d’essai pour les artisans souhaitant découvrir notre service.",
    features: [
      "1 demande de devis dans votre secteur et prestations",
      "Page Web dédié avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support 6j/7",
    ],
    mostPopular: false,
  },
  {
    name: "5 demande de devis par mois",
    id: "tier-startup",
    href: "#hero",
    price: { monthly: "199€", annually: "1999€" },
    description:
      "Notre pack essentiel pour les artisans désireux de faire croître leur chiffre d'affaires.",
    features: [
      "5 demandes de devis minimum dans votre secteur et prestations",
      "Page Web dédié avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support Premium 6j/7",
    ],
    mostPopular: true,
  },
  {
    name: "10 demande de devis par mois",
    id: "tier-enterprise",
    href: "#hero",
    price: { monthly: "349€", annually: "3799€" },
    description: "Notre pack ultime pour les artisans ambitieux.",
    features: [
      "10 demandes de devis minimum dans votre secteur et prestations",
      "Page Web dédié avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support Premium 6j/7",
    ],
    mostPopular: false,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Price() {
  const [frequency, setFrequency] = useState<Frequency>(frequencies[0]);

  useEffect(() => {
    setFrequency(frequencies[0]);
  }, []);

  return (
    <>
      <div className="mt-16 flex justify-center">
        <fieldset aria-label="Payment frequency">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            {frequencies.map((option) => (
              <Radio
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? "bg-yellow-500 text-white" : "text-gray-500",
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
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 z-10">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.mostPopular
                ? "ring-2 ring-yellow-500"
                : "ring-1 ring-gray-200",
              "rounded-3xl p-8 xl:p-10 bg-white"
            )}
          >
            <div className="flex items-center justify-between gap-x-4">
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? "text-yellow-500" : "text-gray-900",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              {tier.mostPopular ? (
                <p className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-yellow-500 text-center">
                  Plus populaire
                </p>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              {tier.description}
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                {tier.price[frequency.value]}
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                {frequency.priceSuffix}
              </span>
            </p>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "bg-yellow-500 text-white shadow-sm hover:bg-yellow-500"
                  : "text-yellow-500 ring-1 ring-inset ring-yellow-400 hover:ring-yellow-400",
                "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              )}
            >
              S&apos;ABONNER
            </a>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-yellow-500"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
