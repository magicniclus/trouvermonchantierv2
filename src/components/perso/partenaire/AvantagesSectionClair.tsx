"use client"

export default function AvantagesSectionClair() {
    return (
        <section className="relative py-20 bg-gray-100 overflow-hidden">
            {/* Auréole de fond subtile */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16" data-animate>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/10 border border-slate-900/20 px-4 py-2 text-sm font-medium text-slate-900 mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        nos avantages
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Pourquoi rejoindre{" "}
                        <span className="text-yellow-500">
                            Trouver Mon Chantier
                        </span>
                        ?
                    </h2>
                    <p className="text-xl text-slate-500/80 max-w-[65ch] mx-auto leading-relaxed">
                        Nous ne cherchons pas à multiplier les inscriptions. Notre objectif est de créer un réseau solide, 
                        composé uniquement d'entreprises sérieuses et qualifiées.
                    </p>
                </div>

                {/* Layout principal */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Colonne gauche - Avantages */}
                    <div className="space-y-8">
                        {/* Avantage 1 */}
                        <div className="flex items-start gap-4 group rounded-xl p-2 -m-2 hover:-translate-y-0.5 hover:shadow-md/10 hover:ring-1 hover:ring-slate-200 transition-all duration-200 ease-out" data-animate>
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-md/10 transition-shadow duration-200 ease-out">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Exclusivité territoriale garantie</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Un nombre strictement limité d'entreprises par zone géographique. Votre secteur, votre territoire, 
                                    sans concurrence déloyale entre partenaires.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 2 */}
                        <div className="flex items-start gap-4 group rounded-xl p-2 -m-2 hover:-translate-y-0.5 hover:shadow-md/10 hover:ring-1 hover:ring-slate-200 transition-all duration-200 ease-out" data-animate data-animate-delay="100">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 ring-1 ring-green-100 flex items-center justify-center shadow-sm group-hover:shadow-md/10 transition-shadow duration-200 ease-out">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Projets pré-qualifiés</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Fini les devis fantaisistes. Recevez uniquement des demandes vérifiées avec budget confirmé 
                                    et clients réellement motivés.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 3 */}
                        <div className="flex items-start gap-4 group rounded-xl p-2 -m-2 hover:-translate-y-0.5 hover:shadow-md/10 hover:ring-1 hover:ring-slate-200 transition-all duration-200 ease-out" data-animate data-animate-delay="200">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 ring-1 ring-indigo-100 flex items-center justify-center shadow-sm group-hover:shadow-md/10 transition-shadow duration-200 ease-out">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Écosystème digital complet</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Site professionnel livré en 24h, SEO local optimisé, campagnes Google Ads et certification officielle 
                                    pour rassurer vos prospects.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 4 */}
                        <div className="flex items-start gap-4 group rounded-xl p-2 -m-2 hover:-translate-y-0.5 hover:shadow-md/10 hover:ring-1 hover:ring-slate-200 transition-all duration-200 ease-out" data-animate data-animate-delay="300">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 ring-1 ring-amber-100 flex items-center justify-center shadow-sm group-hover:shadow-md/10 transition-shadow duration-200 ease-out">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Outils de gestion intégrés</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Devis, factures, suivi de projets, visibilité sur les réseaux sociaux... 
                                    Tout ce dont vous avez besoin dans une seule interface.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite - Visuel */}
                    <div className="lg:sticky lg:top-8" data-animate data-animate-delay="400">
                        <div className="relative group">
                            {/* Image principale */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl/10 ring-1 ring-slate-200/60 group-hover:scale-[1.01] group-hover:shadow-2xl/10 transition-all duration-300 ease-out">
                                <img
                                    src="/images/client.png"
                                    alt="Partenaire Trouver Mon Chantier"
                                    className="w-full aspect-[4/5] lg:aspect-[4/5] md:aspect-video object-cover"
                                />
                                {/* Vignettage léger */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 to-slate-900/[0.03]"></div>
                            </div>

                            {/* Badge satisfaction - top-right */}
                            <div className="absolute -top-3 -right-3 bg-yellow-500 rounded-xl px-4 py-3 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-white">94%</div>
                                    <div className="text-xs text-yellow-100">Satisfaction</div>
                                </div>
                            </div>

                            {/* Pastille Partenaire certifié - bottom */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2 shadow-lg ring-1 ring-slate-200/70 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-green-100 ring-1 ring-green-200 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-900">Partenaire certifié</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6" data-animate>
          <a 
            href="#hero" 
            className="inline-flex mt-10 items-center rounded-xl bg-yellow-500 hover:bg-white border border-yellow-500 hover:text-yellow-500 text-white px-6 py-3 shadow-md transition-all duration-200 font-medium"
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
