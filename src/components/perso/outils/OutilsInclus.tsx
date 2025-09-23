"use client"

interface OutilsInclusProps {
  variant?: 'light' | 'dark'
}

export default function OutilsInclus({ variant = 'light' }: OutilsInclusProps) {

  const outils = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      name: "CRM",
      description: "Gestion clients",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      name: "Devis",
      description: "Logiciel de devis",
      color: "from-green-500 to-green-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      name: "Assistant IA",
      description: "Intelligence artificielle",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      name: "Avis Google",
      description: "Notation automatisée",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
        </svg>
      ),
      name: "Google Ads",
      description: "Publicité ciblée",
      color: "from-red-500 to-red-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      name: "Meta Ads",
      description: "Publication automatisée",
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <section className="relative pt-20 pb-24 md:pt-16 md:pb-20 bg-white overflow-hidden">
      {/* Gradients décoratifs subtils */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4" data-animate>
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Outils inclus
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Tous les outils dont vous avez besoin,{" "}
            <span className="text-yellow-500">
              sans
            </span>{" "}
            supplément
          </h2>
          
          <p className="text-xl text-slate-500/85 max-w-3xl mx-auto leading-relaxed">
            Nous fournissons à tous nos partenaires un écosystème complet d'outils digitaux 
            pour automatiser et optimiser leur activité commerciale.
          </p>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Constellation d'icônes responsive */}
          <div className="relative" data-animate>
            {/* Halo jaune sous le noyau - responsive */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-r from-amber-100/40 via-amber-50/20 to-transparent rounded-full blur-2xl"></div>
            
            {/* Container responsive avec aspect ratio */}
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto aspect-square">
              {/* Lignes de connexion pointillées - responsive */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {outils.map((_, index) => {
                  const angle = (index * 60) - 90
                  const startRadius = 16 // Pourcentage du rayon
                  const endRadius = 36 // Pourcentage du rayon
                  const x1 = 50 + Math.cos(angle * Math.PI / 180) * startRadius
                  const y1 = 50 + Math.sin(angle * Math.PI / 180) * startRadius
                  const x2 = 50 + Math.cos(angle * Math.PI / 180) * endRadius
                  const y2 = 50 + Math.sin(angle * Math.PI / 180) * endRadius
                  
                  return (
                    <line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.4"
                    />
                  )
                })}
              </svg>

              {/* Disque central - responsive */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-slate-200/70 shadow-xl/10 flex items-center justify-center z-10"
                style={{
                  width: 'clamp(4rem, 12vw, 8rem)', // Responsive entre 64px et 128px
                  height: 'clamp(4rem, 12vw, 8rem)'
                }}
              >
                <img 
                  src="/images/favicon.png" 
                  alt="Trouver Mon Chantier" 
                  className="rounded-full"
                  style={{
                    width: 'clamp(2.5rem, 8vw, 5rem)', // Responsive entre 40px et 80px
                    height: 'clamp(2.5rem, 8vw, 5rem)'
                  }}
                />
              </div>

              {/* Icônes satellites - responsive */}
              {outils.map((outil, index) => {
                const angle = (index * 60) - 90
                // Radius responsive basé sur la taille du container
                const radiusPercent = 36 // 36% du container
                
                return (
                  <div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${outil.color} flex items-center justify-center shadow-md/10 ring-1 ring-slate-200/50 hover:-translate-y-0.5 hover:shadow-lg/10 transition-all duration-200 ease-out cursor-pointer group z-20`}
                    style={{
                      width: 'clamp(3rem, 8vw, 5rem)', // Responsive entre 48px et 80px
                      height: 'clamp(3rem, 8vw, 5rem)',
                      left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * radiusPercent}% - clamp(1.5rem, 4vw, 2.5rem))`,
                      top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * radiusPercent}% - clamp(1.5rem, 4vw, 2.5rem))`,
                    }}
                    data-animate
                    data-animate-delay={index * 100}
                  >
                    <div className="flex items-center justify-center" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
                      {outil.icon}
                    </div>
                    
                    {/* Tooltip responsive */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-slate-900 border border-slate-200 shadow-lg pointer-events-none"
                    style={{ 
                      zIndex: 9999,
                      bottom: 'calc(100% + 0.5rem)'
                    }}>
                      <div className="font-semibold">{outil.name}</div>
                      <div className="text-slate-600 hidden sm:block">
                        {outil.description}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Colonne texte */}
          <div className="space-y-6" data-animate data-animate-delay="200">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                Une suite d'outils professionnels complète
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Chaque partenaire bénéficie d'un accès complet à notre écosystème d'outils 
                professionnels, sans frais supplémentaires.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              {[
                {
                  title: "Tout inclus dans votre abonnement",
                  description: "Aucun coût supplémentaire, aucune surprise"
                },
                {
                  title: "Automatisation complète",
                  description: "Gagnez du temps sur les tâches répétitives"
                },
                {
                  title: "Suivi des performances",
                  description: "Tableaux de bord et analytics en temps réel"
                },
                {
                  title: "Formation et support",
                  description: "Accompagnement pour maîtriser tous les outils"
                }
              ].map((avantage, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60 shadow-sm/5 flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-medium mb-1">
                      {avantage.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {avantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cartouche Valeur estimée */}
            <div className="bg-amber-50/70 rounded-xl ring-1 ring-amber-200/60 shadow-md/10 p-5 md:p-6 hover:shadow-lg/10 hover:-translate-y-px transition-all duration-200 ease-out">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white text-amber-500 ring-1 ring-amber-200/60 shadow-sm/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-amber-700 font-semibold">
                  Entre 10 et 15 demandes de projet par mois
                </h4>
              </div>
              <p className="text-sm text-amber-700/85 leading-relaxed">
                Grâce à notre écosystème d'outils intégrés, nos partenaires reçoivent 
                en moyenne entre 10 et 15 demandes qualifiées chaque mois.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
