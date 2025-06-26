"use client";

import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    id: 'freelancer',
    name: 'Freelancer',
    price: { monthly: '99€', annually: '199€' },
    description: 'L\'essentiel pour démarrer votre activité d\'artisan.',
    features: ['5 chantiers par mois', 'Jusqu\'à 10 contacts', 'Analyses de base', 'Support sous 48h'],
    featured: false,
    cta: 'Choisir ce forfait',
  },
  {
    id: 'startup',
    name: 'Artisan Pro',
    price: { monthly: '149€', annually: '299€' },
    description: 'Un forfait qui évolue avec votre entreprise en pleine croissance.',
    features: [
      'Jusqu\'à 25 chantiers par mois',
      'Jusqu\'à 10 contacts par jour',
      'Analyses avancées',
      'Support sous 24h',
      'Page Web dédié avec nom de domaine personnalisé',
      'Google Ads Manager attribué',
      'Sans engagement',
    ],
    featured: true,
    cta: 'Choisir ce forfait',
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    price: 'Sur mesure',
    description: 'Support dédié et infrastructure pour votre entreprise.',
    features: [
      'Chantiers illimités',
      'Contacts illimités',
      'Analyses avancées',
      'Support dédié sous 1h',
      'Automatisations marketing',
      'Outils de reporting personnalisés',
    ],
    featured: false,
    cta: 'Contacter l\'équipe',
  },
];

const Pricing = () => {
  return (
    <section className="group/tiers bg-white py-16 sm:py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-blue-600">Tarification</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-balance text-slate-800 sm:text-5xl">
            Des tarifs qui évoluent avec vous
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-slate-600 sm:text-xl/8">
          Choisissez un forfait abordable avec les meilleures fonctionnalités pour trouver vos clients, 
          fidéliser votre clientèle et développer votre activité.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              data-featured={tier.featured ? 'true' : undefined}
              className="group/tier rounded-3xl p-8 ring-1 ring-slate-200 data-featured:bg-blue-50 data-featured:ring-blue-600 xl:p-10"
            >
              <h3
                id={`tier-${tier.id}`}
                className="text-lg/8 font-semibold text-slate-800 group-data-featured/tier:text-blue-600"
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm/6 text-slate-600 group-data-featured/tier:text-slate-700">{tier.description}</p>
              {typeof tier.price === 'string' ? (
                <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-800 group-data-featured/tier:text-blue-600">
                  {tier.price}
                </p>
              ) : (
                <>
                  <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden">
                    <span className="text-4xl font-semibold tracking-tight text-slate-800 group-data-featured/tier:text-blue-600">
                      {tier.price.monthly}
                    </span>
                    <span className="text-sm/6 font-semibold text-slate-600 group-data-featured/tier:text-slate-700">
                      /mois
                    </span>
                  </p>
                </>
              )}

              <button
                value={tier.id}
                name="tier"
                type="button"
                aria-describedby={`tier-${tier.id}`}
                className="mt-6 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-xs group-data-featured/tier:bg-blue-700 hover:bg-blue-500 group-data-featured/tier:hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {tier.cta}
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-slate-600 group-data-featured/tier:text-slate-700 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-600 group-data-featured/tier:text-blue-700"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
