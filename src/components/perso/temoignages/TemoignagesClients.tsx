"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface TemoignagesClientsProps {
  variant?: 'light' | 'dark'
}

export default function TemoignagesClients({ variant = 'light' }: TemoignagesClientsProps) {
  // Suppression du variant dark selon les mémoires d'harmonisation
  const temoignages = [
    {
      id: 0,
      entreprise: "Terabois",
      logo: "/images/logos/terabois.png",
      site: "https://www.terabois.fr/",
      dirigeant: "France C.",
      poste: "Gérant",
      localisation: "Bordeaux (33)",
      metier: "Menuiserie bois",
      commentaire: "Depuis qu'on travaille avec Trouver Mon Chantier, notre activité a complètement décollé ! Les clients arrivent pré-qualifiés avec des projets concrets. Plus besoin de courir après les prospects, ils viennent à nous avec des demandes sérieuses.",
      note: 5
    },
    {
      id: 1,
      entreprise: "IDF Environnement",
      logo: "/images/logos/idf-environnement.png",
      site: "https://www.idf-environnement.fr/",
      dirigeant: "Tunay S.",
      poste: "Directrice",
      localisation: "Créteil (94)",
      metier: "Aménagement extérieur",
      commentaire: "Incroyable transformation ! En quelques mois, on est passé de quelques devis par mois à un planning complet. L'équipe TMC nous accompagne vraiment bien, les outils CRM et de suivi sont parfaits. Je recommande à 100%.",
      note: 5
    },
    {
      id: 2,
      entreprise: "France Terrasse Bois",
      logo: "/images/logos/france-terrasse-bois.png",
      site: "https://france-terrasse-bois.fr/",
      dirigeant: "Nicolas C.",
      poste: "Fondateur",
      localisation: "Lyon (69)",
      metier: "Terrasses bois",
      commentaire: "TMC a révolutionné notre business ! Avant on galèrait pour trouver des clients, maintenant on doit même refuser des chantiers. Les outils Google Ads et Meta inclus nous font économiser un temps précieux et nous apportent une visibilité incroyable.",
      note: 5
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gray-100">
      {/* Fond avec gradients décoratifs subtils selon les mémoires */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl"></div>
      </div>

      {/* Conteneur global harmonisé selon les mémoires */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 pb-24 md:pt-16 md:pb-20">
        {/* Header harmonisé */}
        <div className="text-center mb-16 space-y-4" data-animate>
          {/* Chip style Hero selon les mémoires */}
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Témoignages clients
          </div>
          
          {/* Titre harmonisé selon les mémoires */}
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Ils ont transformé leur{" "}
            <span className="text-yellow-500">
              activité
            </span>
          </h2>
          
          {/* Sous-titre harmonisé selon les mémoires */}
          <p className="text-xl text-slate-500/85 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nos partenaires ont multiplié leur chiffre d'affaires 
            grâce à notre écosystème digital complet.
          </p>
        </div>

        {/* Carousel shadcn/ui */}
        <div className="max-w-4xl mx-auto" data-animate>
          <Carousel className="w-full">
            <CarouselContent>
              {temoignages.map((temoignage) => (
                <CarouselItem key={temoignage.id}>
                  <div className="p-4">
                    <Card className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 hover:shadow-2xl/10 hover:-translate-y-px transition-all duration-200 ease-out">
                      <CardContent className="p-8">
                        {/* Header avec logo et entreprise */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-white p-2 shadow-lg flex items-center justify-center ring-1 ring-slate-200/60">
                            <img 
                              src={temoignage.logo} 
                              alt={temoignage.entreprise}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              <a 
                                href={temoignage.site} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-yellow-500 transition-colors duration-300 flex items-center gap-2"
                              >
                                {temoignage.entreprise}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </h3>
                            <p className="text-sm text-slate-600">
                              {temoignage.metier} • {temoignage.localisation}
                            </p>
                          </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium text-slate-600">
                            5.0/5
                          </span>
                        </div>

                        {/* Commentaire */}
                        <blockquote className="text-lg leading-relaxed mb-8 text-slate-700">
                          "{temoignage.commentaire}"
                        </blockquote>

                        {/* Signature */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-900">
                              {temoignage.dirigeant}
                            </div>
                            <div className="text-sm text-slate-600">
                              {temoignage.poste}
                            </div>
                          </div>
                          <div className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60">
                            Partenaire vérifié
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-md/10 ring-1 ring-slate-200/50" />
            <CarouselNext className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-md/10 ring-1 ring-slate-200/50" />
          </Carousel>
        </div>

        {/* CTA harmonisé */}
        <div className="text-center mt-16 space-y-6" data-animate data-animate-delay="400">
          <a 
            href="#hero" 
            className="inline-flex items-center rounded-xl bg-yellow-500 hover:bg-white border border-yellow-500 hover:text-yellow-500 text-white px-6 py-3 shadow-md transition-all duration-200 font-medium"
          >
            Rejoindre mon secteur
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
