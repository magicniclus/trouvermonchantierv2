"use client"

import { useState } from 'react'

interface TemoignagesClientsProps {
  variant?: 'light' | 'dark'
}

export default function TemoignagesClients({ variant = 'light' }: TemoignagesClientsProps) {
  const isDark = variant === 'dark'
  
  const [activeIndex, setActiveIndex] = useState(0)

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


  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % temoignages.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + temoignages.length) % temoignages.length)
  }

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  return (
    <section className={`relative py-20 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100'
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 right-0 w-full h-full ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]'
            : 'bg-[radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.05)_0%,transparent_50%)]'
        }`}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-animate>
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-6 ${
            isDark 
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-slate-900/10 border border-slate-900/20 text-slate-900'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Témoignages clients
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Ils ont transformé leur{" "}
            <span className={`${
              isDark ? 'text-yellow-400' : 'text-yellow-500'
            }`}>
              activité
            </span>
          </h2>
          
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Découvrez comment nos partenaires ont multiplié leur chiffre d'affaires 
            grâce à notre écosystème digital complet.
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="relative max-w-4xl mx-auto" data-animate>
          {/* Flèche gauche */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 border border-slate-600 text-white hover:bg-slate-700'
                : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flèche droite */}
          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 border border-slate-600 text-white hover:bg-slate-700'
                : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden mx-16">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {temoignages.map((temoignage, index) => (
                <div key={temoignage.id} className="w-full flex-shrink-0 px-4">
                  <div className={`w-full max-w-2xl mx-auto rounded-3xl p-8 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800/90 to-slate-700/90 border border-slate-600/30'
                      : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'
                  }`}>
                    
                    {/* Header avec logo et entreprise */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-white p-2 shadow-lg flex items-center justify-center">
                        <img 
                          src={temoignage.logo} 
                          alt={temoignage.entreprise}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
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
                        <p className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
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
                      <span className={`ml-2 text-sm font-medium ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        5.0/5
                      </span>
                    </div>

                    {/* Commentaire */}
                    <blockquote className={`text-lg leading-relaxed mb-8 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      "{temoignage.commentaire}"
                    </blockquote>

                    {/* Signature */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {temoignage.dirigeant}
                        </div>
                        <div className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {temoignage.poste}
                        </div>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full ${
                        isDark 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                        Partenaire vérifié
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs - plus bas */}
          <div className="flex justify-center mt-12 gap-3">
            {temoignages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-yellow-500 scale-125'
                    : isDark 
                      ? 'bg-slate-600 hover:bg-slate-500'
                      : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-animate data-animate-delay="400">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
            isDark 
              ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
              : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-semibold">
              Rejoignez ces entreprises qui ont transformé leur activité
            </span>
          </div>
        </div>

        <div className="text-center mt-6" data-animate>
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
