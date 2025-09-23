"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface StatsSectionProps {
  variant?: 'light' | 'dark'
}

export default function StatsSection({ variant = 'light' }: StatsSectionProps) {
  const isDark = variant === 'dark'
  
  const stats = [
    {
      number: "12,000+",
      label: "Artisans partenaires",
      description: "dans toute la France"
    },
    {
      number: "45,000+",
      label: "Demandes traitées",
      description: "chaque mois"
    },
    {
      number: "94%",
      label: "Taux de satisfaction",
      description: "de nos partenaires"
    },
    {
      number: "48h",
      label: "Délai moyen",
      description: "de validation"
    }
  ]

  const chartData = [
    { month: 'Jan', demandes: 1200 },
    { month: 'Fév', demandes: 1800 },
    { month: 'Mar', demandes: 2400 },
    { month: 'Avr', demandes: 2800 },
    { month: 'Mai', demandes: 3200 },
    { month: 'Jun', demandes: 3600 },
    { month: 'Jul', demandes: 4000 },
    { month: 'Aoû', demandes: 4200 },
    { month: 'Sep', demandes: 4400 },
    { month: 'Oct', demandes: 4600 },
    { month: 'Nov', demandes: 4800 },
    { month: 'Déc', demandes: 5000 }
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Gradients décoratifs subtils */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-50/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Zone 1 */}
        <div className="text-center mb-16 max-w-3xl mx-auto" data-animate>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/10 border border-slate-900/20 px-4 py-2 text-sm font-medium text-slate-900 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Nos chiffres clés
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Trouver Mon Chantier en{" "}
            <span className="text-yellow-500">
              quelques chiffres
            </span>
          </h2>
          
          <p className="text-xl text-slate-500/85 max-w-[65ch] mx-auto leading-relaxed">
            La plateforme de référence qui connecte les artisans qualifiés avec des clients sérieux. 
            Des chiffres qui parlent d'eux-mêmes et une croissance qui ne s'arrête jamais.
          </p>
        </div>

        {/* Stats Grid - 4 gros chiffres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:-translate-y-0.5 hover:shadow-sm/10 hover:ring-1 hover:ring-slate-200/60 transition-all duration-200 ease-out rounded-xl p-4 -m-4"
              data-animate 
              data-animate-delay={index * 100}
            >
              <div className="text-5xl lg:text-6xl font-bold text-yellow-500 mb-3">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-slate-900 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-slate-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Zone 2 - Stats + Graphique */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche - Points clés */}
          <div className="space-y-6 lg:space-y-8" data-animate data-animate-delay="400">
            <div className="flex items-start gap-4 group hover:shadow-md/10 hover:ring-1 hover:ring-slate-200/60 hover:-translate-y-0.5 transition-all duration-200 ease-out rounded-xl p-3 -m-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 ring-1 ring-green-100 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Croissance constante depuis 2019
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  +150% de croissance annuelle avec une expansion dans toutes les régions françaises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:shadow-md/10 hover:ring-1 hover:ring-slate-200/60 hover:-translate-y-0.5 transition-all duration-200 ease-out rounded-xl p-3 -m-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Réseau d'artisans qualifiés
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Chaque partenaire est vérifié, certifié et accompagné pour garantir un service de qualité.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:shadow-md/10 hover:ring-1 hover:ring-slate-200/60 hover:-translate-y-0.5 transition-all duration-200 ease-out rounded-xl p-3 -m-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 ring-1 ring-indigo-100 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Innovation technologique
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  IA pour le matching, outils de gestion intégrés et plateforme optimisée pour la performance.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Carte graphique */}
          <div className="relative group" data-animate data-animate-delay="600">
            <div className="relative rounded-2xl bg-white shadow-xl/10 ring-1 ring-slate-200/60 p-6 group-hover:scale-[1.01] group-hover:shadow-2xl/10 transition-all duration-500">
              {/* Growth Chart Visualization */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                  Évolution mensuelle des demandes (12 derniers mois)
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorDemandes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ 
                          fontSize: 12, 
                          fill: '#64748b' 
                        }}
                      />
                      <YAxis hide />
                      <Area
                        type="monotone"
                        dataKey="demandes"
                        stroke="#eab308"
                        strokeWidth={3}
                        fill="url(#colorDemandes)"
                        dot={{ 
                          fill: '#eab308', 
                          strokeWidth: 0, 
                          r: 4 
                        }}
                        activeDot={{ 
                          r: 6, 
                          fill: '#eab308' 
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Footer jaune pâle */}
              <div className="bg-amber-50/60 rounded-xl ring-1 ring-amber-200/40 p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">+280%</div>
                <div className="text-sm text-slate-600">
                  Croissance sur 12 mois
                </div>
              </div>
            </div>

            {/* Badge flottant #1 en France */}
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition-transform duration-300">
              #1 en France
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
