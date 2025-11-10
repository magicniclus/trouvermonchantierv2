import { Metadata } from 'next';
import Link from 'next/link';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { 
  CheckCircle, 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Clock,
  Users,
  BarChart3,
  Zap,
  Phone,
  Star,
  Target,
  Globe,
  AlertTriangle,
  Wrench,
  Hammer,
  Paintbrush,
  Home,
  Building
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solution Prospection Artisan - Site Internet + Google Ads Clé en Main',
  description: 'La solution la plus simple pour générer vos propres clients artisans. Site web + campagne Google Ads optimisée. 49€/mois, résultats sous 24h, sans engagement.',
  keywords: 'solution prospection artisan, trouver des chantiers, générer clients artisans, campagne Google Ads bâtiment, site internet artisan clé en main, prospection digitale BTP',
  openGraph: {
    title: 'Solution Clé en Main pour Artisans - Site Web + Google Ads',
    description: 'Générez vos propres clients avec notre solution automatisée. Site professionnel + campagnes Google Ads optimisées.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/solution',
  },
};

const etapes = [
  {
    numero: '01',
    titre: 'Création automatique de votre site professionnel',
    description: 'En 24h, nous créons votre site web optimisé avec vos couleurs, vos services et vos réalisations. Prêt à convertir vos visiteurs en clients.',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    numero: '02',
    titre: 'Mise en ligne de votre campagne Google Ads optimisée',
    description: 'Nos experts configurent et lancent vos campagnes publicitaires ciblées sur votre zone d\'intervention. Visibilité immédiate sur Google.',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    numero: '03',
    titre: 'Réception directe de vos contacts prospects',
    description: 'Les clients vous contactent directement via votre site. Pas d\'intermédiaire, pas de commission sur les leads. Vous gardez 100% du contrôle.',
    icon: Phone,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  }
];

const avantages = [
  {
    titre: 'Pas d\'agence, pas d\'intermédiaire, pas d\'engagement',
    description: 'Solution directe sans contrainte de durée',
    icon: Shield
  },
  {
    titre: 'Résultats sous 24h',
    description: 'Site en ligne et campagnes actives rapidement',
    icon: Clock
  },
  {
    titre: '49€/mois seulement',
    description: 'Tarif transparent et accessible à tous',
    icon: CheckCircle
  },
  {
    titre: '3% de commission sur les ventes réalisées',
    description: 'Vous ne payez que sur vos succès',
    icon: TrendingUp
  }
];

const metiers = [
  { nom: 'Plombiers', icon: Wrench, color: 'text-blue-500' },
  { nom: 'Électriciens', icon: Zap, color: 'text-yellow-500' },
  { nom: 'Menuisiers', icon: Hammer, color: 'text-amber-600' },
  { nom: 'Peintres', icon: Paintbrush, color: 'text-purple-500' },
  { nom: 'Couvreurs', icon: Home, color: 'text-red-500' },
  { nom: 'Maçons', icon: Building, color: 'text-stone-600' }
];

const differenciateurs = [
  {
    titre: 'Transparence totale sur les coûts',
    description: 'Aucun frais caché, tarification claire et prévisible'
  },
  {
    titre: 'Campagnes optimisées en continu',
    description: 'Nos experts améliorent constamment vos performances'
  },
  {
    titre: '100% de contrôle pour l\'artisan',
    description: 'Vous gardez la propriété de votre site et de vos campagnes'
  }
];

const temoignages = [
  {
    nom: 'Pierre M.',
    metier: 'Électricien',
    ville: 'Lyon',
    resultat: '1er sur Google local',
    commentaire: 'Depuis que j\'utilise Trouver Mon Chantier, je suis en première position sur Google. Les clients me trouvent facilement.',
    note: 5
  },
  {
    nom: 'Marie D.',
    metier: 'Plombier',
    ville: 'Bordeaux',
    resultat: '+300% de visibilité',
    commentaire: 'ROI exceptionnel ! Mon site apparaît maintenant en première page pour tous mes services. Le téléphone sonne sans arrêt.',
    note: 5
  },
  {
    nom: 'Jean L.',
    metier: 'Menuisier',
    ville: 'Nantes',
    resultat: 'Planning rempli 3 mois à l\'avance',
    commentaire: 'Simple, efficace, rentable. Mon référencement local fonctionne parfaitement. Je recommande à tous mes confrères !',
    note: 5
  }
];

export default function SolutionPage() {
  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10 mb-6">
              🚀 Solution clé en main
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              La solution la plus simple pour <span className="text-yellow-500">générer vos propres clients</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl mx-auto">
              Trouver Mon Chantier aide les artisans à obtenir des clients grâce à un site web professionnel 
              optimisé pour le référencement naturel (SEO). Plus besoin de plateformes coûteuses ou d'agences compliquées. 
              Votre solution digitale complète en 24h, sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Problème actuel */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-slate-100/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm/10 mb-6">
              <AlertTriangle className="w-4 h-4" />
              Le problème actuel
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Les artisans perdent temps et argent
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Artisan frustré par les commissions élevées"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium mb-3">
                  ⚠️ Problème
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Commissions énormes
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  Les plateformes de devis prennent 15 à 30% de commission sur chaque chantier. 
                  Votre marge fond comme neige au soleil.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Interface complexe de campagnes publicitaires"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium mb-3">
                  ⚠️ Problème
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  SEO compliqué
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  Référencement naturel, optimisation technique, contenu... Impossible de s'y retrouver sans expertise. 
                  Les agences SEO coûtent une fortune.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Artisan perdant du temps avec la paperasse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium mb-3">
                  ⚠️ Problème
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Perte de temps
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  Entre la prospection, les devis non signés et la gestion administrative, 
                  vous passez plus de temps à chercher qu'à travailler.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Notre solution */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Notre solution clé en main
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              3 étapes simples pour générer vos propres clients
            </p>
          </div>

          <div className="space-y-16">
            {etapes.map((etape, index) => {
              const IconComponent = etape.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white font-bold text-lg">
                        {etape.numero}
                      </div>
                      <div className={`${etape.bgColor} p-3 rounded-xl border border-slate-200/60`}>
                        <IconComponent className={`w-6 h-6 ${etape.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {etape.titre}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {etape.description}
                    </p>
                  </div>
                  
                  <div className={isEven ? 'lg:col-start-1' : ''}>
                    <div className={`${etape.bgColor} rounded-2xl p-8 border border-slate-200/60`}>
                      <div className="text-center">
                        <IconComponent className={`w-24 h-24 ${etape.color} mx-auto mb-4`} />
                        <div className="text-6xl font-bold text-slate-200 mb-2">
                          {etape.numero}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ce que vous obtenez */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ce que vous obtenez concrètement
            </h2>
            <p className="text-xl text-slate-600">
              Votre écosystème digital complet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Site web professionnel optimisé pour artisans"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                  ✅ Inclus
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Site optimisé pour la conversion
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Landing page dédiée à votre activité avec formulaires de contact optimisés
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Campagne Google Ads ciblée pour artisans"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                  ✅ Inclus
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Référencement local optimisé
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  SEO local optimisé pour votre zone d'intervention avec mots-clés géolocalisés
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Dashboard analytics pour suivre les performances"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                  ✅ Inclus
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Accès à votre espace client
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Dashboard complet pour suivre vos résultats et gérer vos prospects
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Support et assistance dédiée aux artisans"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                  ✅ Inclus
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                  Assistance en continu
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Support dédié et optimisation continue de vos performances
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Les avantages de Trouver Mon Chantier
            </h2>
            <p className="text-xl text-slate-600">
              Pourquoi choisir notre solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {avantages.map((avantage, index) => {
              const IconComponent = avantage.icon;
              return (
                <div key={index} className="flex items-start gap-6 p-6 bg-green-50 rounded-2xl border border-green-200/60">
                  <div className="bg-green-100 p-3 rounded-xl border border-green-200/60">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {avantage.titre}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {avantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pour qui ?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Toute entreprise du bâtiment qui veut générer ses propres chantiers sans dépendre d'une plateforme
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {metiers.map((metier, index) => {
              const IconComponent = metier.icon;
              return (
                <article key={index} className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group">
                  <div className="aspect-square overflow-hidden bg-slate-50">
                    <div className="w-full h-full flex items-center justify-center">
                      <IconComponent className={`w-12 h-12 ${metier.color}`} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs font-medium mb-2">
                      🎯 Métier
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors duration-200">
                      {metier.nom}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-600">
              Et tous les autres métiers du bâtiment : couvreurs, maçons, carreleurs, 
              chauffagistes, climaticiens, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Ce qui nous rend différents */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ce qui nous rend différents
            </h2>
            <p className="text-xl text-slate-600">
              Notre approche unique pour votre succès
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differenciateurs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.titre}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Résultats typiques de nos clients
            </h2>
            <p className="text-xl text-slate-600">
              1ère position Google local, +300% de visibilité en moyenne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(temoignage.note)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-6 leading-relaxed">
                  "{temoignage.commentaire}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{temoignage.nom}</div>
                    <div className="text-sm text-slate-600">{temoignage.metier} • {temoignage.ville}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-sm">{temoignage.resultat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Lancez votre solution dès aujourd'hui — aucun engagement, résultats sous 24h ⚡
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Rejoignez les centaines d'artisans qui ont choisi l'indépendance digitale 
            plutôt que la dépendance aux plateformes coûteuses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="text-white">Créer mon site maintenant</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <BarChart3 className="w-5 h-5" />
              Voir les tarifs
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Site en ligne sous 24h
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Aucun engagement
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Support inclus
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              49€/mois seulement
            </div>
          </div>
        </div>
      </section>

      <SecondaryFooter />
    </>
  );
}
