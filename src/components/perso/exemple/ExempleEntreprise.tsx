"use client"

interface ExempleEntrepriseProps {
  variant?: 'light' | 'dark'
}

export default function ExempleEntreprise({ variant = 'light' }: ExempleEntrepriseProps) {
  const entrepriseInfo = {
    nom: "Plomberie Martin",
    metier: "Plomberie",
    experience: "15 ans",
    ca: "320 000€",
    equipe: "1 salarié"
  }

  const avantData = [
    { label: "Demandes/mois", value: "2-3" },
    { label: "Conversion", value: "30%" },
    { label: "Temps prospection", value: "12h/sem" }
  ]

  const apresData = [
    { label: "Demandes/mois", value: "10-15" },
    { label: "Conversion", value: "65%" },
    { label: "Temps prospection", value: "1h/sem" }
  ]

  const gainsKPI = [
    {
      chiffre: "+288k€",
      legende: "CA supplémentaire",
      icon: "💰"
    },
    {
      chiffre: "9h/sem",
      legende: "Temps économisé",
      icon: "⏰"
    },
    {
      chiffre: "2400%",
      legende: "ROI obtenu",
      icon: "📈"
    },
    {
      chiffre: "100%",
      legende: "Clients qualifiés",
      icon: "✅"
    }
  ]

  return (
    <section className="relative pt-20 pb-24 md:pt-16 md:pb-20 bg-gray-100 overflow-hidden">
      {/* Gradients décoratifs subtils */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 space-y-8">
        {/* En-tête de section */}
        <div className="text-center" data-animate>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Cas client réel
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
            Comment{" "}
            <span className="text-yellow-500">
              {entrepriseInfo.nom}
            </span>{" "}
            a transformé son activité
          </h2>
          
          <p className="text-slate-600 md:text-lg max-w-3xl mx-auto">
            Découvrez les résultats concrets obtenus par une entreprise de plomberie lyonnaise 
            après 6 mois de partenariat avec Trouver Mon Chantier.
          </p>
        </div>

        {/* Carte "Informations entreprise" */}
        <div className="rounded-2xl border bg-white shadow-sm p-5 md:p-6 hover:shadow-md hover:border-slate-200 transition-all duration-200" data-animate>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-1">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Nom</div>
              <div className="text-slate-900 font-semibold">{entrepriseInfo.nom}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Métier</div>
              <div className="text-slate-900 font-semibold">{entrepriseInfo.metier}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Expérience</div>
              <div className="text-slate-900 font-semibold">{entrepriseInfo.experience}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">CA</div>
              <div className="text-slate-900 font-semibold">{entrepriseInfo.ca}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Équipe</div>
              <div className="text-slate-900 font-semibold">{entrepriseInfo.equipe}</div>
            </div>
          </div>
        </div>

        {/* Comparatif Avant / Après */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8">
          {/* Carte "Avant" */}
          <div className="bg-rose-50 border-rose-100 rounded-2xl p-6 md:p-8 shadow-sm" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Avant Trouver Mon Chantier</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              {avantData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-semibold text-rose-600">{item.value}</span>
                </div>
              ))}
            </div>
            
            <blockquote className="bg-white/70 rounded-xl p-4 border border-rose-100 text-slate-700 italic">
              "Je passais mes soirées à chercher des clients sur internet et à répondre à des demandes 
              qui n'aboutissaient jamais..."
            </blockquote>
          </div>

          {/* Carte "Après" */}
          <div className="bg-emerald-50 border-emerald-100 rounded-2xl p-6 md:p-8 shadow-sm" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Avec Trouver Mon Chantier</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              {apresData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-700">{item.value}</span>
                    {index === 0 && <span className="inline-flex rounded-full bg-emerald-600/10 text-emerald-700 text-xs px-2 py-0.5">+400%</span>}
                    {index === 1 && <span className="inline-flex rounded-full bg-emerald-600/10 text-emerald-700 text-xs px-2 py-0.5">+117%</span>}
                    {index === 2 && <span className="inline-flex rounded-full bg-emerald-600/10 text-emerald-700 text-xs px-2 py-0.5">-92%</span>}
                  </div>
                </div>
              ))}
            </div>
            
            <blockquote className="bg-white/70 rounded-xl p-4 border border-emerald-100 text-slate-700 italic">
              "Maintenant je me concentre sur mon métier. Les clients viennent à moi avec des projets 
              concrets et un budget défini !"
            </blockquote>
          </div>
        </div>

        {/* Gains clés (KPI) */}
        {/* <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-8">
          {gainsKPI.map((kpi, index) => (
            <div key={index} className="rounded-2xl border bg-white p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-200" data-animate>
              <div className="w-12 h-12 rounded-full bg-slate-50 border flex items-center justify-center mx-auto mb-4 text-xl">
                {kpi.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {kpi.chiffre}
              </div>
              <div className="text-slate-600">
                {kpi.legende}
              </div>
            </div>
          ))}
        </div> */}

        {/* CTA final */}
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
