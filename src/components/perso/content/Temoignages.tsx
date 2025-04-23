"use client";

import { Marquee } from "@/components/magicui/marquee";

const temoignages = [
  {
    nom: "Pierre D.",
    commentaire:
      "Service exceptionnel ! J'ai reçu 3 demandes de devis dès la première semaine.",
    role: "Artisan Plombier",
  },
  {
    nom: "Marie L.",
    commentaire:
      "Enfin un service qui nous permet de travailler directement avec nos clients, sans intermédiaire !",
    role: "Électricienne",
  },
  {
    nom: "Thomas B.",
    commentaire:
      "Les demandes sont qualifiées et les clients sérieux. Un vrai gain de temps.",
    role: "Couvreur",
  },
  {
    nom: "Sophie M.",
    commentaire:
      "Je recommande à 100%. Mon carnet de commandes est plein depuis 3 mois.",
    role: "Peintre en bâtiment",
  },
  {
    nom: "Laurent F.",
    commentaire:
      "L'investissement est rapidement rentabilisé. Les clients apprécient le contact direct.",
    role: "Maçon",
  },
  {
    nom: "Isabelle R.",
    commentaire:
      "Excellent retour sur investissement. Je suis très satisfaite du service.",
    role: "Décoratrice d'intérieur",
  },
  {
    nom: "Michel P.",
    commentaire:
      "Plus besoin de passer par des plateformes qui prennent des commissions. C'est parfait !",
    role: "Carreleur",
  },
  {
    nom: "Anne S.",
    commentaire:
      "La qualité des leads est impressionnante. Presque tous se transforment en chantiers.",
    role: "Architecte d'intérieur",
  },
  {
    nom: "François D.",
    commentaire:
      "Je gagne un temps précieux grâce à ce service. Les demandes sont pertinentes.",
    role: "Menuisier",
  },
  {
    nom: "Julie M.",
    commentaire:
      "Très satisfaite de l'efficacité du système. Les clients sont au rendez-vous.",
    role: "Paysagiste",
  },
  {
    nom: "Philippe L.",
    commentaire:
      "Enfin une solution qui comprend vraiment les besoins des artisans !",
    role: "Chauffagiste",
  },
  {
    nom: "Catherine B.",
    commentaire:
      "Le meilleur investissement que j'ai fait pour mon entreprise cette année.",
    role: "Cuisiniste",
  },
  {
    nom: "Nicolas R.",
    commentaire:
      "Les demandes sont ciblées et correspondent parfaitement à mon activité.",
    role: "Plaquiste",
  },
  {
    nom: "Valérie T.",
    commentaire:
      "Je recommande vivement. Un vrai plus pour développer son activité.",
    role: "Décoratrice",
  },
  {
    nom: "Jean-Marc P.",
    commentaire:
      "Service client au top et résultats concrets. Que demander de plus ?",
    role: "Électricien",
  },
];

export default function Temoignages() {
  return (
    <section className="bg-slate-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Ce que nos clients disent de nous
        </h2>
        <p className="text-slate-600 text-center">
          Découvrez les témoignages de nos artisans satisfaits
        </p>
      </div>
      <div className="space-y-8">
        <Marquee className="py-6" pauseOnHover>
          {temoignages.slice(0, 7).map((temoignage, index) => (
            <div
              key={index}
              className="mx-4 bg-white rounded-lg shadow-sm p-6 min-w-[300px]"
            >
              <p className="text-slate-700 mb-4">{temoignage.commentaire}</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-slate-900">
                    {temoignage.nom}
                  </p>
                  <p className="text-sm text-slate-500">{temoignage.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        <Marquee className="py-6" reverse pauseOnHover>
          {temoignages.slice(3, 15).map((temoignage, index) => (
            <div
              key={index}
              className="mx-4 bg-white rounded-lg shadow-sm p-6 min-w-[300px]"
            >
              <p className="text-slate-700 mb-4">{temoignage.commentaire}</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-slate-900">
                    {temoignage.nom}
                  </p>
                  <p className="text-sm text-slate-500">{temoignage.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
