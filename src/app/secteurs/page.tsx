import { Metadata } from 'next';
import Link from 'next/link';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Home, 
  Building, 
  Triangle, 
  Snowflake, 
  Flame,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trouver des Chantiers par Métier et par Ville | Trouver Mon Chantier',
  description: 'Découvrez comment nous aidons chaque artisan à générer ses propres clients grâce à Google Ads. Solutions sur mesure par métier : électricien, plombier, menuisier et plus.',
  keywords: 'trouver chantiers artisan, clients BTP, prospection métier, Google Ads artisan, leads électricien plombier menuisier',
  openGraph: {
    title: 'Trouver des Chantiers par Métier - Solutions Google Ads pour Artisans',
    description: 'Solutions personnalisées pour chaque métier du BTP. Générez vos propres clients avec Google Ads.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/secteurs',
  },
};

const metiers = [
  {
    name: 'Électricien',
    slug: 'electricien',
    icon: Zap,
    description: 'Installations, dépannages, mises aux normes électriques',
    demande: 'Très forte',
    cpc: '3-8€',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    name: 'Plombier',
    slug: 'plombier',
    icon: Wrench,
    description: 'Plomberie, chauffage, sanitaires, dépannages urgents',
    demande: 'Très forte',
    cpc: '4-10€',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    name: 'Menuisier',
    slug: 'menuisier',
    icon: Hammer,
    description: 'Menuiserie, agencement, pose de fenêtres et portes',
    demande: 'Forte',
    cpc: '2-6€',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    name: 'Peintre',
    slug: 'peintre',
    icon: Paintbrush,
    description: 'Peinture intérieure/extérieure, décoration, ravalement',
    demande: 'Forte',
    cpc: '2-5€',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    name: 'Isolation',
    slug: 'isolation',
    icon: Home,
    description: 'Isolation thermique, phonique, combles, murs',
    demande: 'Très forte',
    cpc: '3-7€',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    name: 'Maçon',
    slug: 'macon',
    icon: Building,
    description: 'Maçonnerie générale, gros œuvre, rénovation',
    demande: 'Forte',
    cpc: '3-8€',
    color: 'text-stone-600',
    bgColor: 'bg-stone-50',
    borderColor: 'border-stone-200'
  },
  {
    name: 'Couvreur',
    slug: 'toiture',
    icon: Triangle,
    description: 'Toiture, charpente, zinguerie, démoussage',
    demande: 'Forte',
    cpc: '4-9€',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    name: 'Climatisation',
    slug: 'climatisation',
    icon: Snowflake,
    description: 'Installation, maintenance climatisation et pompes à chaleur',
    demande: 'Très forte',
    cpc: '5-12€',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    name: 'Chauffagiste',
    slug: 'chauffagiste',
    icon: Flame,
    description: 'Chauffage, chaudières, radiateurs, dépannages',
    demande: 'Très forte',
    cpc: '4-10€',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

const avantages = [
  'Site web optimisé pour votre métier',
  'Campagnes Google Ads ciblées géographiquement',
  'Suivi des leads et conversions en temps réel',
  'Support dédié par un expert de votre secteur',
  'Pas d\'engagement, résiliable à tout moment'
];

export default function SecteursPage() {
  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10 mb-6">
              🧭 Métiers & Zones d'intervention
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Trouver des Chantiers par <span className="text-yellow-500">Métier et par Ville</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl mx-auto">
              Découvrez comment nous aidons chaque artisan à générer ses propres clients 
              grâce au référencement naturel (SEO). Solutions personnalisées par métier avec un site web optimisé 
              pour apparaître en première position sur Google.
            </p>
          </div>
        </div>
      </section>

      {/* Métiers Grid */}
      <main className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metiers.map((metier) => {
              const IconComponent = metier.icon;
              return (
                <article
                  key={metier.slug}
                  className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group"
                >
                  <div className="aspect-video overflow-hidden bg-slate-50">
                    <div className="w-full h-full flex items-center justify-center">
                      <IconComponent className={`w-16 h-16 ${metier.color}`} />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Badge métier */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-md ${metier.bgColor} ${metier.color} text-xs font-medium mb-3`}>
                      🎯 {metier.name}
                    </div>
                    
                    {/* Titre */}
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                      <Link href={`/secteurs/${metier.slug}`}>
                        Trouver des chantiers {metier.name.toLowerCase()}
                      </Link>
                    </h2>
                    
                    {/* Meta informations */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Demande : {metier.demande}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" />
                        CPC : {metier.cpc}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {metier.description}. Solutions personnalisées pour générer vos propres clients avec un site web optimisé pour le référencement local.
                    </p>
                    
                    {/* Lien */}
                    <Link
                      href={`/secteurs/${metier.slug}`}
                      className="inline-flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                    >
                      Voir les stratégies
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* Section Avantages */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1 rounded-full border border-yellow-200/70 bg-yellow-50/80 px-3 py-1 text-xs font-medium text-yellow-700 shadow-sm/10 mb-6">
                ⚡ Solution complète
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Pourquoi choisir <span className="text-yellow-500">Trouver Mon Chantier</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nous créons votre écosystème digital complet : site web optimisé pour le référencement naturel (SEO) 
                ciblé sur votre métier et votre zone d'intervention.
              </p>
              <ul className="space-y-4">
                {avantages.map((avantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 leading-relaxed">{avantage}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-white mb-4">
                    🚀 Offre de lancement
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Créez votre site + pub dès maintenant
                  </h3>
                  <p className="text-slate-600">
                    Solution clé en main pour artisans ambitieux
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Site web optimisé</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Campagnes Google Ads</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Suivi des performances</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">Support dédié</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                
                <Link
                  href="/tarifs"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl text-center transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span className="text-white">Créer mon site maintenant</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>
                
                <p className="text-xs text-slate-500 text-center mt-4">
                  Sans engagement • Résiliable à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SecondaryFooter />
    </>
  );
}
