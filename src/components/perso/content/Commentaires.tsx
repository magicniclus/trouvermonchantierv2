import { StarIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const reviews = {
  average: 5,
  totalCount: 1842,
  counts: [
    { rating: 5, count: 1542 },
    { rating: 4, count: 200 },
    { rating: 3, count: 60 },
    { rating: 2, count: 25 },
    { rating: 1, count: 15 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `<p>Un service exceptionnel ! J'ai reçu plusieurs demandes qualifiées dès la première semaine. Le contact direct avec les clients fait toute la différence.</p>`,
      author: "Thomas Martin",
      role: "Plombier",
      avatarSrc: "/images/avatar1.jpg",
    },
    {
      id: 2,
      rating: 5,
      content: `<p>Enfin une solution qui comprend les besoins des artisans. Plus besoin de passer par des plateformes qui prennent des commissions exorbitantes.</p>`,
      author: "Mohammed Ben",
      role: "Électricienne",
      avatarSrc: "/images/avatar2.jpg",
    },
    {
      id: 3,
      rating: 5,
      content: `<p>Mon carnet de commandes est plein depuis que j'utilise ce service. Les clients sont sérieux et les projets correspondent parfaitement à mon activité.</p>`,
      author: "Laurent Petit",
      role: "Maçon",
      avatarSrc: "/images/avatar3.jpg",
    },
    {
      id: 4,
      rating: 5,
      content: `<p>La meilleure décision que j'ai prise pour mon entreprise. Le retour sur investissement est rapide et les demandes sont vraiment qualifiées.</p>`,
      author: "Marie Lambert",
      role: "Décoratrice d'intérieur",
      avatarSrc: "/images/avatar4.jpg",
    },
    {
      id: 5,
      rating: 5,
      content: `<p>Je recommande à 100% ! Les leads sont de qualité et le contact direct avec les clients permet de mieux comprendre leurs besoins.</p>`,
      author: "François Moreau",
      role: "Menuisier",
      avatarSrc: "/images/avatar5.jpg",
    },
    {
      id: 6,
      rating: 5,
      content: `<p>Service impeccable qui m'a permis de développer mon activité. Les clients apprécient le contact direct et la transparence.</p>`,
      author: "Julie Rousseau",
      role: "Peintre",
      avatarSrc: "/images/avatar6.jpg",
    },
    {
      id: 7,
      rating: 5,
      content: `<p>Excellent système pour trouver des chantiers de qualité. Je gagne un temps précieux en évitant les intermédiaires.</p>`,
      author: "Philippe Bernard",
      role: "Carreleur",
      avatarSrc: "/images/avatar7.jpg",
    },
    {
      id: 8,
      rating: 5,
      content: `<p>Les demandes sont très bien ciblées et les clients sont au rendez-vous. Un vrai plus pour développer son entreprise.</p>`,
      author: "Isabelle Durand",
      role: "Architecte d'intérieur",
      avatarSrc: "/images/avatar8.jpg",
    },
    {
      id: 9,
      rating: 5,
      content: `<p>Je suis très satisfait du service. Les prospects sont sérieux et les projets se concrétisent rapidement.</p>`,
      author: "Michel Leroy",
      role: "Chauffagiste",
      avatarSrc: "/images/avatar9.jpg",
    },
    {
      id: 10,
      rating: 5,
      content: `<p>Une solution efficace pour développer son activité. Le rapport qualité-prix est excellent.</p>`,
      author: "Catherine Simon",
      role: "Cuisiniste",
      avatarSrc: "/images/avatar10.jpg",
    },
    {
      id: 11,
      rating: 5,
      content: `<p>Très bon service qui m'a permis d'augmenter significativement mon chiffre d'affaires. Je recommande vivement.</p>`,
      author: "Nicolas Dupont",
      role: "Plaquiste",
      avatarSrc: "/images/avatar11.jpg",
    },
    {
      id: 12,
      rating: 5,
      content: `<p>Les demandes sont pertinentes et les clients sont prêts à démarrer leurs projets. C&apos;est exactement ce dont j&apos;avais besoin.</p>`,
      author: "Valérie Morel",
      role: "Paysagiste",
      avatarSrc: "/images/avatar12.jpg",
    },
    {
      id: 13,
      rating: 5,
      content: `<p>Un excellent moyen de trouver des chantiers de qualité. Le contact direct avec les clients est un vrai plus.</p>`,
      author: "Pierre Girard",
      role: "Couvreur",
      avatarSrc: "/images/avatar13.jpg",
    },
    {
      id: 14,
      rating: 5,
      content: `<p>Service professionnel qui comprend vraiment les besoins des artisans. Les résultats sont au rendez-vous.</p>`,
      author: "Anne Mercier",
      role: "Électricienne",
      avatarSrc: "/images/avatar14.jpg",
    },
    {
      id: 15,
      rating: 5,
      content: `<p>Très satisfait de la qualité des contacts. Les projets correspondent parfaitement à mes critères.</p>`,
      author: "Jean-Marc Robert",
      role: "Menuisier",
      avatarSrc: "/images/avatar15.jpg",
    },
  ],
};

const colors = [
  "bg-slate-600",
  "bg-slate-600",
  "bg-slate-600",
  "bg-slate-600",
  "bg-slate-600",
  "bg-slate-600",
  "bg-slate-600",
];

function getColorByIndex(index: number): string {
  return colors[index % colors.length];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Commentaires() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll
    ? reviews.featured
    : reviews.featured.slice(0, 3);
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-5xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-700">
            Avis Clients
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "size-5 shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Basé sur {reviews.totalCount} avis
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Données des avis</h3>

            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-slate-700">
                      {count.rating}
                      <span className="sr-only"> étoiles</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex flex-1 items-center"
                    >
                      <StarIcon
                        aria-hidden="true"
                        className={classNames(
                          count.count > 0 ? "text-yellow-400" : "text-gray-300",
                          "size-5 shrink-0"
                        )}
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count.count > 0 ? (
                          <div
                            style={{
                              width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                            }}
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm text-slate-700 tabular-nums">
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Avis récents</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {displayedReviews.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <div
                      className={classNames(
                        "size-12 rounded-full flex items-center justify-center",
                        getColorByIndex(review.id - 1)
                      )}
                    >
                      <span className="text-lg font-semibold text-white">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-slate-700">
                        {review.author.split(" ")[0]}{" "}
                        {review.author.split(" ")[1].charAt(0)}.
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "size-5 shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} sur 5 étoiles</p>
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className="mt-4 space-y-6 text-base text-gray-600 italic"
                  />
                </div>
              ))}
            </div>
            {reviews.featured.length > 5 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  {showAll ? (
                    <>
                      Voir moins d&apos;avis
                      <ChevronUpIcon className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Voir plus d&apos;avis
                      <ChevronDownIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
