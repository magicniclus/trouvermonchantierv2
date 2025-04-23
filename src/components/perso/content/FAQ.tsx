import { Disclosure } from "@headlessui/react";

const faqs = [
  {
    question: "Que contient le site créé pour moi ?",
    answer:
      "Votre site est une landing page optimisée, conçue spécifiquement pour générer des demandes de devis. Nous l’optimisons entièrement pour vous. Vous pourrez nous transmettre vos ajustements via votre espace personnel, mais l’optimisation reste sous notre contrôle pour garantir des performances maximales.",
  },
  {
    question: "Quels types de travaux sont éligibles à votre service ?",
    answer:
      "Notre solution est conçue pour tous les professionnels du bâtiment souhaitant générer des demandes de devis locales via Google. Voici quelques exemples de métiers compatibles : Isolation (intérieure, extérieure, combles), Toiture et couverture, Plomberie et chauffage (PAC, chaudière, plomberie générale), Électricité générale, Maçonnerie, carrelage, gros œuvre, Rénovation de salle de bain et cuisine, Ossature bois, charpente, menuiserie, Piscines, pergolas, clôtures, terrasses, Ravalement de façade, peinture extérieure. \n\nEn résumé : si vous réalisez des travaux chez des particuliers, vous êtes éligible. Et si vous avez un doute, notre équipe vous répond sous 24h.",
  },
  {
    question: "C’est quoi une landing page ?",
    answer:
      "C’est une page web unique, pensée pour transformer les visiteurs en prospects. Elle va droit au but, sans distraction, et pousse à l’action : vous contacter pour un devis.",
  },
  {
    question: "Que comprend l’offre à 149€ ?",
    answer:
      "L’offre inclut une landing page ultra-optimisée clé en main, un nom de domaine personnalisé, des images professionnelles optimisées, et un logo premium si vous n’en avez pas déjà un.",
  },
  {
    question: "Que comprend l’abonnement à 29€/mois ?",
    answer:
      "L’abonnement couvre l’hébergement de votre site, les serveurs, les APIs et le renouvellement de votre nom de domaine.",
  },
  {
    question: "Comment fonctionne l’offre Google Ads de 400€ offerts ?",
    answer:
      "Google propose une offre de bienvenue : pour toute création d’un nouveau compte Google Ads, si vous dépensez 400€, Google vous offre 400€ supplémentaires en crédit publicitaire. \n\nPour en bénéficier, vous devez créer votre compte en passant par notre lien partenaire Google Ads, que nous vous transmettons dans votre espace personnel après l'achat. \n\nNous vous guidons étape par étape pour activer correctement cette offre et lancer votre première campagne optimisée.",
  },
  {
    question: "Puis-je arrêter mon abonnement quand je veux ?",
    answer:
      "Oui, vous êtes libre de stopper à tout moment. Votre site sera simplement mis hors ligne tant que l’abonnement est suspendu (jusqu’à 6 mois maximum). Nous avons des frais techniques à couvrir, d’où la nécessité de maintenir l’abonnement actif.",
  },
  {
    question: "Pourquoi le site est-il aussi peu cher ?",
    answer:
      "Nous avons développé des modèles ultra optimisés de landing pages. Notre mission est de les mettre à disposition des artisans du bâtiment à un tarif quasi coûtant. C’est notre choix stratégique : créer des 'machines à chantiers' accessibles.",
  },
  {
    question: "Comment fonctionne Google Ads ?",
    answer:
      "Google Ads permet d’apparaître en haut des résultats de recherche dès qu’un client tape une requête comme 'artisan toiture Bordeaux'. Vous payez uniquement quand quelqu’un clique. Nous configurons tout pour vous avec des mots-clés rentables.",
  },
  {
    question: "Comment vous transmettre les infos de mon entreprise ?",
    answer:
      "Dès votre paiement, un espace personnel est automatiquement créé. Vous y trouverez un formulaire pour nous envoyer toutes vos informations (nom, secteur, type de travaux, logo, zone géographique, etc.).",
  },
  {
    question: "Comment gérer Google Ads ?",
    answer:
      "Pas d’inquiétude. Nous vous guidons pas à pas : création du compte, activation du crédit Google offert, lancement de la campagne. Vous n’avez rien à configurer vous-même.",
  },
  {
    question: "Ai-je un contact si j’ai un souci ?",
    answer:
      "Oui, vous aurez un conseiller dédié dans votre espace personnel, ainsi qu’un numéro de téléphone en cas de besoin urgent.",
  },
  {
    question: "Puis-je modifier moi-même le site ?",
    answer:
      "Vous pouvez demander des ajustements via votre espace client. Notre équipe applique les modifications qui respectent l’équilibre entre votre demande et la performance du site.",
  },
  {
    question: "Combien de demandes puis-je recevoir ?",
    answer:
      "Tout dépend de votre secteur et de la zone ciblée, mais certains clients reçoivent 10 demandes par jour, parfois plus. Votre site est conçu pour maximiser le nombre de prospect.",
  },
  {
    question: "Et si je n’ai aucun résultat ?",
    answer:
      "On ne peut jamais garantir un nombre de chantiers exact, mais on optimise tout pour maximiser vos chances. Nos clients reçoivent en moyenne plusieurs demandes la première semaine. Si besoin, votre conseiller peut analyser avec vous la campagne.",
  },
  {
    question: "Y a-t-il un engagement minimum ?",
    answer:
      "Aucun. Vous pouvez arrêter quand vous voulez, sans frais cachés. Vous restez libre.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-slate-50" id="faq">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-700 sm:text-5xl">
            Questions fréquentes
          </h2>
          <dl className="mt-16 divide-y divide-slate-300/10">
            {faqs.map((faq) => (
              <Disclosure
                key={faq.question}
                as="div"
                className="py-6 first:pt-0 last:pb-0"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="group flex w-full items-start justify-between text-left text-slate-700">
                      <span className="text-base/7 font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <span className="text-2xl">{open ? "-" : "+"}</span>
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 pr-12">
                      <p className="text-base/7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
