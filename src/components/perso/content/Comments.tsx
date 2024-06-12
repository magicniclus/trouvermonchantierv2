"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

const cards = [
  {
    text: "Travailler avec trouver-mon-chantier a été une expérience révolutionnaire pour notre stratégie de communication. Grâce à leur expertise en Google Ads, nous avons pu atteindre efficacement notre public cible et développer des campagnes qui ont réellement résonné avec nos clients. La plateforme comprend l'importance de la collaboration et son approche personnalisée a permis de renforcer nos relations avec des clients communs. Sa capacité à optimiser nos campagnes et à maximiser notre budget publicitaire a été un atout majeur pour notre entreprise.",
    stars: 5,
    name: "Nancy M/Chargé de communication",
  },
  {
    text: "trouver-mon-chantier a joué un rôle crucial dans la croissance spectaculaire de Terabois. Depuis que nous avons commencé à travailler ensemble, nous avons triplé notre chiffre d'affaires, un résultat que je n'aurais jamais imaginé possible. Leur compréhension approfondie du marketing digital, combinée à une connaissance spécifique de l'industrie de l'isolation et de la couverture, a permis de mettre en place des stratégies sur-mesure qui ont réellement fonctionné. Je suis extrêmement reconnaissant pour leur engagement et leur expertise qui ont transformé notre entreprise.",
    stars: 5,
    name: "Franck C/Terabois",
  },
  {
    text: "Collaborer avec trouver-mon-chantier a été une expérience exceptionnelle du début à la fin. Leur maîtrise du marketing digital et leur capacité à s'adapter à l'industrie des panneaux solaires ont grandement contribué au succès de notre entreprise. Nous avons vu une augmentation significative de notre clientèle et de notre visibilité sur le marché, grâce à leurs stratégies innovantes et efficaces. Je suis plus que satisfait des résultats obtenus et je recommande vivement les services de trouver-mon-chantier à toute entreprise cherchant à accroître sa présence en ligne.",
    stars: 5,
    name: "Nicolas R/Panneaux solaires",
  },
];

const Temoignage = () => {
  const temoignage = useRef<HTMLFormElement>(null);

  return (
    <section className="bg-slate-100">
      <div className="mx-auto flex max-w-5xl p-6 lg:px-8 lg:py-32 py-20 flex-col justify-between items-center text-slate-700">
        <h2 className="text-2xl font-bold">Témoignage client</h2>
        <p className="mt-7 w-4/6 text-center">
          Si vous désirez entendre un retour d&apos;expérience direct de
          l&apos;un de nos clients, n&apos;hésitez pas à nous contacter. Nous
          vous mettrons en relation directement.
        </p>
        <div className="flex w-full md:flex-row flex-col justify-between mt-10">
          {cards.map((card, index) => (
            <div
              className="md:w-4/12 w-full flex flex-col items-center md:max-w-[32%] p-7 text-textSecondary bg-white rounded-md md:mt-0 mt-7"
              key={index}
            >
              <p className="text-center mt-4">{card.text}</p>
              <div className="flex justify-center items-center mt-4">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <StarIcon className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="mt-4 text-center">{card.name}</p>
              <div className="flex justify-center"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Temoignage;
