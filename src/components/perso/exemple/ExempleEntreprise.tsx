"use client"

import { Building2, Wrench, Calendar, Euro, Users, TrendingUp, Clock, Target, CheckCircle, XCircle, ArrowRight, Zap } from 'lucide-react'

interface ExempleEntrepriseProps {
  variant?: 'light' | 'dark'
}

export default function ExempleEntreprise({ variant = 'light' }: ExempleEntrepriseProps) {
  const entrepriseInfo = [
    { 
      icon: <Building2 className="w-4 h-4" />, 
      label: "Nom", 
      value: "Plomberie Martin" 
    },
    { 
      icon: <Wrench className="w-4 h-4" />, 
      label: "Métier", 
      value: "Plomberie" 
    },
    { 
      icon: <Calendar className="w-4 h-4" />, 
      label: "Expérience", 
      value: "15 ans" 
    },
    { 
      icon: <Euro className="w-4 h-4" />, 
      label: "CA", 
      value: "320 000€" 
    },
    { 
      icon: <Users className="w-4 h-4" />, 
      label: "Équipe", 
      value: "1 salarié" 
    }
  ]

  const avantData = [
    { label: "Demandes/mois", value: "2-3", delta: null },
    { label: "Conversion", value: "30%", delta: null },
    { label: "Temps prospection", value: "12h/sem", delta: null }
  ]

  const apresData = [
    { label: "Demandes/mois", value: "10-15", delta: "+400%" },
    { label: "Conversion", value: "65%", delta: "+117%" },
    { label: "Temps prospection", value: "1h/sem", delta: "-92%" }
  ]

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Gradients décoratifs subtils selon les mémoires */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl"></div>
      </div>

      {/* Conteneur global harmonisé selon les mémoires */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 pb-24 md:pt-16 md:pb-20 space-y-10">
        
        {/* Header avec titre et sous-titre */}
        <div className="text-center space-y-4" data-animate>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Comment{" "}
            <span className="text-yellow-500">Plomberie Martin</span>{" "}
            a transformé son activité
          </h2>
          
          <p className="text-xl text-slate-500/85 max-w-3xl mx-auto leading-relaxed">
            Découvrez les résultats concrets obtenus par une entreprise de plomberie lyonnaise 
            après 6 mois de partenariat avec Trouver Mon Chantier.
          </p>
        </div>

        {/* Barre d'infos clés avec badge */}
        <div className="relative" data-animate>
          {/* Badge "Cas client réel" */}
          <div className="absolute -top-3 left-6 z-10">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10">
              <Target className="w-3 h-3" />
              Cas client réel
            </div>
          </div>
          
          {/* Carte d'identité premium */}
          <div className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 hover:shadow-2xl/10 hover:-translate-y-px transition-all duration-200 ease-out p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {entrepriseInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white ring-1 ring-slate-200/60 flex items-center justify-center text-slate-600">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 font-medium">{info.label}</div>
                    <div className="text-sm font-semibold text-slate-900 truncate">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cartes comparatives Avant/Après */}
        <div className="grid md:grid-cols-2 gap-8" data-animate>
          
          {/* Carte "Avec Trouver Mon Chantier" (ordre inversé sur mobile) */}
          <div className="order-2 md:order-2 bg-emerald-50 ring-1 ring-emerald-200/60 rounded-2xl shadow-md/10 hover:-translate-y-0.5 hover:shadow-lg/10 transition-all duration-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center ring-1 ring-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">APRÈS</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Avec Trouver Mon Chantier</h3>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {apresData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-emerald-600">{item.value}</span>
                    {item.delta && (
                      <span className="inline-flex rounded-full bg-emerald-600/10 text-emerald-700 text-xs px-2 py-1 font-medium">
                        {item.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <blockquote className="bg-white/70 rounded-xl p-4 ring-1 ring-emerald-200/50 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xs">"</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-200 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Maintenant je me concentre sur mon métier. Les clients viennent à moi avec des projets concrets et un budget défini !"
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">— P. Martin</p>
                </div>
              </div>
            </blockquote>

            {/* CTA sous la carte "Après" */}
            <div className="mt-8 space-y-3">
              <a href="#hero" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 hover:bg-white border border-yellow-500 hover:text-yellow-500 text-white px-6 py-4 shadow-md transition-all duration-200 font-semibold text-lg">
                Obtenir les mêmes résultats
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-center text-slate-500">
                Validation sous 48h – Places limitées par zone
              </p>
            </div>
          </div>

          {/* Carte "Avant Trouver Mon Chantier" */}
          <div className="order-1 md:order-1 bg-rose-50 ring-1 ring-rose-200/60 rounded-2xl shadow-md/10 hover:-translate-y-0.5 hover:shadow-lg/10 transition-all duration-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center ring-1 ring-rose-500">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">AVANT</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Avant Trouver Mon Chantier</h3>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {avantData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-2xl font-semibold text-rose-600">{item.value}</span>
                </div>
              ))}
            </div>
            
            <blockquote className="bg-white/60 rounded-xl p-4 ring-1 ring-rose-200/50 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-rose-600 text-xs">"</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-200 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Je passais mes soirées à chercher des clients sur internet et à répondre à des demandes qui n'aboutissaient jamais..."
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">— P. Martin</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>

        {/* Barre de réassurance */}
        <div className="bg-amber-50/70 rounded-xl ring-1 ring-amber-200/60 shadow-md/10 p-6 text-center" data-animate>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-amber-700 font-semibold">
              Vous aussi, obtenez des résultats similaires en rejoignant notre réseau
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
