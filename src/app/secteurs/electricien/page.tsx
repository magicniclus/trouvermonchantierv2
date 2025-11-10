import { Metadata } from 'next';
import Link from 'next/link';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { 
  Zap, 
  MapPin, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Star,
  Target,
  Wrench,
  Hammer
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trouver des Chantiers en Électricité | Solutions Google Ads pour Électriciens',
  description: 'Découvrez les meilleures stratégies pour trouver des chantiers électriques : Google Ads optimisé, référencement local, zones à forte demande. Devis gratuit.',
  keywords: 'trouver chantiers électricien, clients électricien, prospection électricien, leads électricien, Google Ads électricien, chantiers électricité',
  openGraph: {
    title: 'Trouver des Chantiers en Électricité - Guide Complet 2024',
    description: 'Stratégies éprouvées pour générer des clients électricien avec Google Ads et le référencement local.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/secteurs/electricien',
  },
};

const strategies = [
  {
    title: 'Google Ads ciblé géographiquement',
    description: 'Campagnes optimisées sur les mots-clés "électricien + ville" avec un budget maîtrisé',
    icon: Target,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    title: 'Référencement local Google My Business',
    description: 'Optimisation de votre fiche pour apparaître dans les recherches locales',
    icon: MapPin,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Site web optimisé pour la conversion',
    description: 'Landing pages spécialisées électricité avec formulaires de contact optimisés',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Suivi des performances en temps réel',
    description: 'Dashboard pour suivre vos leads, conversions et retour sur investissement',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
];

const zones = [
  { ville: 'Paris & Île-de-France', demande: 'Très forte', cpc: '6-12€' },
  { ville: 'Lyon & Rhône-Alpes', demande: 'Forte', cpc: '4-8€' },
  { ville: 'Marseille & PACA', demande: 'Forte', cpc: '4-7€' },
  { ville: 'Toulouse & Occitanie', demande: 'Forte', cpc: '3-6€' },
  { ville: 'Bordeaux & Nouvelle-Aquitaine', demande: 'Moyenne', cpc: '3-5€' },
  { ville: 'Nantes & Pays de la Loire', demande: 'Moyenne', cpc: '3-5€' }
];

const temoignages = [
  {
    nom: 'Pierre M.',
    ville: 'Lyon',
    metier: 'Électricien',
    resultat: '+40% de chantiers en 3 mois',
    commentaire: 'Grâce à Trouver Mon Chantier, j\'ai enfin un planning rempli toute l\'année. Les leads sont de qualité.'
  },
  {
    nom: 'Marc D.',
    ville: 'Bordeaux', 
    metier: 'Électricien',
    resultat: '25 nouveaux clients/mois',
    commentaire: 'Le ROI est exceptionnel. Pour 800€ de pub par mois, je génère plus de 15 000€ de CA supplémentaire.'
  }
];

export default function ElectricienPage() {
  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1 rounded-full border border-yellow-200/70 bg-yellow-50/80 px-3 py-1 text-xs font-medium text-yellow-700 shadow-sm/10 mb-6">
              ⚡ Électricien
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Trouver des Chantiers en <span className="text-yellow-500">Électricité</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl">
              Découvrez les stratégies les plus efficaces pour générer un flux constant de clients électriciens 
              grâce à Google Ads, le référencement local et un site web optimisé pour votre métier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="text-white">Créer mon site maintenant</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-xl font-semibold border border-slate-200 transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stratégies Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Les meilleures stratégies pour trouver des chantiers électriques
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Méthodes éprouvées utilisées par plus de 200 électriciens pour développer leur activité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {strategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div key={index} className={`${strategy.bgColor} border border-slate-200/60 rounded-2xl p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`${strategy.bgColor} p-3 rounded-xl border border-slate-200/60`}>
                      <IconComponent className={`w-6 h-6 ${strategy.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {strategy.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coûts Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Combien coûte une campagne Google Ads pour un électricien ?
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Le coût par clic varie selon votre zone géographique et la concurrence locale. 
                Voici les fourchettes moyennes observées en 2024 :
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Mots-clés d'urgence</span>
                  <span className="text-yellow-600 font-bold">8-15€/clic</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Services généraux</span>
                  <span className="text-yellow-600 font-bold">3-8€/clic</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Mots-clés locaux</span>
                  <span className="text-yellow-600 font-bold">2-6€/clic</span>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200/60">
                <h4 className="font-bold text-slate-900 mb-2">💡 Conseil d'expert</h4>
                <p className="text-slate-700 text-sm">
                  Avec un budget de 500-800€/mois, vous pouvez générer 15-25 leads qualifiés, 
                  soit un ROI moyen de 300-500% selon votre taux de conversion.
                </p>
              </div>
            </div>
            
            <div>
              <Link href="/blog/prix-google-ads-artisan-2024" className="block group">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200/60 group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      Guide complet des prix Google Ads
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Découvrez tous les coûts détaillés par métier et par région
                    </p>
                    <div className="inline-flex items-center gap-2 text-yellow-600 font-medium">
                      Lire l'article complet
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Les zones où la demande est la plus forte
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Analyse de la demande et des coûts publicitaires par région
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200/60 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-bold text-slate-900">{zone.ville}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Demande :</span>
                    <span className={`font-medium ${
                      zone.demande === 'Très forte' ? 'text-green-600' : 
                      zone.demande === 'Forte' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {zone.demande}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">CPC moyen :</span>
                    <span className="font-medium text-slate-900">{zone.cpc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Témoignages d'électriciens qui ont réussi
            </h2>
            <p className="text-xl text-slate-600">
              Découvrez les résultats obtenus par nos clients électriciens
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
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
                    <div className="font-bold text-green-600">{temoignage.resultat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à développer votre activité d'électricien ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Rejoignez les centaines d'électriciens qui génèrent déjà leurs propres clients 
            grâce à notre solution Google Ads personnalisée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="text-white">Créer mon site maintenant</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              Audit gratuit de mon potentiel
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Sans engagement
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Support dédié
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Résultats garantis
            </div>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Découvrez aussi nos solutions pour d'autres métiers
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/secteurs/plombier" className="group">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="w-6 h-6 text-blue-500" />
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Plombier
                  </h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Solutions spécialisées pour les plombiers-chauffagistes
                </p>
              </div>
            </Link>
            
            <Link href="/secteurs/menuisier" className="group">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Hammer className="w-6 h-6 text-amber-600" />
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Menuisier
                  </h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Stratégies adaptées aux menuisiers et agenceurs
                </p>
              </div>
            </Link>
            
            <Link href="/blog/comment-trouver-clients-electricien-2024" className="group">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <h4 className="font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                    Guide complet électricien
                  </h4>
                </div>
                <p className="text-slate-600 text-sm">
                  7 méthodes pour trouver des clients électricien en 2024
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <SecondaryFooter />
    </>
  );
}
