"use client"

export default function AvantagesSection() {
    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
            </div>
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16" data-animate>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        nos avantages
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Pourquoi rejoindre{" "}
                        <span className="text-transparent bg-clip-text bg-yellow-400 ">
                            Trouver Mon Chantier
                        </span>
                        ?
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Nous ne cherchons pas à multiplier les inscriptions. Notre objectif est de créer un réseau solide, 
                        composé uniquement d'entreprises sérieuses et qualifiées.
                    </p>
                </div>

                {/* Layout principal */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Colonne gauche - Avantages */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Avantage 1 */}
                        <div className="flex items-start gap-6 group" data-animate>
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-3">Exclusivité territoriale garantie</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Un nombre strictement limité d'entreprises par zone géographique. Votre secteur, votre territoire, 
                                    sans concurrence déloyale entre partenaires.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 2 */}
                        <div className="flex items-start gap-6 group" data-animate data-animate-delay="100">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-3">Projets pré-qualifiés</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Fini les devis fantaisistes. Recevez uniquement des demandes vérifiées avec budget confirmé 
                                    et clients réellement motivés.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 3 */}
                        <div className="flex items-start gap-6 group" data-animate data-animate-delay="200">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-3">Écosystème digital complet</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Site professionnel livré en 24h, SEO local optimisé, campagnes Google Ads et certification officielle 
                                    pour rassurer vos prospects.
                                </p>
                            </div>
                        </div>

                        {/* Avantage 4 */}
                        <div className="flex items-start gap-6 group" data-animate data-animate-delay="300">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-3">Outils de gestion intégrés</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Devis, factures, suivi de projets, visibilité sur les réseaux sociaux... 
                                    Tout ce dont vous avez besoin dans une seule interface.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite - Visuel */}
                    <div className="lg:col-span-5" data-animate data-animate-delay="400">
                        <div className="relative">
                            {/* Image principale */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/images/client.png"
                                    alt="Partenaire Trouver Mon Chantier"
                                    className="w-full h-[600px] object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                            </div>

                            {/* Badge flottant */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">Partenaire Certifié</div>
                                        <div className="text-sm text-slate-600">Réseau d'élite TMC</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats flottantes */}
                            <div className="absolute -top-6 -right-6 bg-yellow-500 rounded-2xl p-4 shadow-2xl">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">94%</div>
                                    <div className="text-xs text-yellow-100">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
