import { Metadata } from 'next';
import Link from 'next/link';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { 
  Wrench, 
  MapPin, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Star,
  Target,
  Zap,
  Hammer
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trouver des Chantiers en Plomberie | Solutions Google Ads pour Plombiers',
  description: 'Découvrez les meilleures stratégies pour trouver des chantiers plomberie : Google Ads optimisé, référencement local, dépannages urgents. Devis gratuit.',
  keywords: 'trouver chantiers plombier, clients plombier, prospection plombier, leads plombier, Google Ads plombier, chantiers plomberie',
  openGraph: {
    title: 'Trouver des Chantiers en Plomberie - Guide Complet 2024',
    description: 'Stratégies éprouvées pour générer des clients plombier avec Google Ads et le référencement local.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/secteurs/plombier',
  },
};

const strategies = [
  {
    title: 'Campagnes urgence 24h/24',
    description: 'Ciblage des recherches "plombier urgence" avec budget prioritaire sur les créneaux critiques',
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Référencement local optimisé',
    description: 'Fiche Google My Business avec photos avant/après et gestion proactive des avis',
    icon: MapPin,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Landing pages spécialisées',
    description: 'Pages dédiées par service : dépannage, installation, rénovation salle de bain',
    icon: TrendingUp,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Suivi ROI en temps réel',
    description: 'Dashboard pour mesurer la rentabilité de chaque type d\'intervention',
    icon: Users,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  }
];

const zones = [
  { ville: 'Paris & Île-de-France', demande: 'Très forte', cpc: '8-15€' },
  { ville: 'Lyon & Rhône-Alpes', demande: 'Forte', cpc: '5-10€' },
  { ville: 'Marseille & PACA', demande: 'Forte', cpc: '4-8€' },
  { ville: 'Toulouse & Occitanie', demande: 'Forte', cpc: '4-7€' },
  { ville: 'Bordeaux & Nouvelle-Aquitaine', demande: 'Moyenne', cpc: '3-6€' },
  { ville: 'Lille & Hauts-de-France', demande: 'Moyenne', cpc: '3-6€' }
];

const temoignages = [
  {
    nom: 'Jean-Luc R.',
    ville: 'Marseille',
    metier: 'Plombier-Chauffagiste',
    resultat: '+60% de dépannages urgents',
    commentaire: 'Les campagnes urgence m\'ont permis de doubler mon activité de dépannage. Le téléphone sonne même la nuit !'
  },
  {
    nom: 'Stéphane B.',
    ville: 'Lyon', 
    metier: 'Plombier',
    resultat: '30 nouveaux chantiers/mois',
    commentaire: 'Excellent ROI sur les rénovations de salle de bain. Je n\'arrive plus à suivre toutes les demandes.'
  }
];

export default function PlombierPage() {
  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm/10 mb-6">
              🔧 Plombier
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Trouver des Chantiers en <span className="text-blue-500">Plomberie</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl">
              Découvrez comment générer un flux constant de clients plombiers grâce à Google Ads, 
              du dépannage urgent aux gros chantiers de rénovation. Solutions adaptées à votre spécialité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
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
              Les meilleures stratégies pour trouver des chantiers plomberie
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Méthodes spécialisées pour maximiser vos interventions et développer votre activité
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
                Combien coûte une campagne Google Ads pour un plombier ?
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Les coûts varient selon le type d'intervention et l'urgence. 
                Voici les fourchettes moyennes pour les plombiers en 2024 :
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Dépannage urgent 24h</span>
                  <span className="text-blue-600 font-bold">10-20€/clic</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Installation/Rénovation</span>
                  <span className="text-blue-600 font-bold">4-10€/clic</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60">
                  <span className="font-medium text-slate-900">Entretien/Maintenance</span>
                  <span className="text-blue-600 font-bold">2-6€/clic</span>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200/60">
                <h4 className="font-bold text-slate-900 mb-2">💡 Conseil d'expert</h4>
                <p className="text-slate-700 text-sm">
                  Les dépannages urgents ont le meilleur ROI : avec 600-1000€/mois de budget, 
                  générez 20-30 interventions urgentes à 150-300€ chacune.
                </p>
              </div>
            </div>
            
            <div>
              <Link href="/blog/prix-google-ads-artisan-2024" className="block group">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200/60 group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Analyse complète des coûts
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Tous les prix détaillés par type d'intervention plomberie
                    </p>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                      Voir l'analyse complète
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
              Analyse de la demande et des coûts publicitaires par région pour les plombiers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200/60 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-500" />
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
              Témoignages de plombiers qui ont réussi
            </h2>
            <p className="text-xl text-slate-600">
              Découvrez les résultats obtenus par nos clients plombiers
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
            Prêt à développer votre activité de plombier ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Rejoignez les centaines de plombiers qui génèrent déjà leurs propres clients 
            grâce à notre solution Google Ads spécialisée plomberie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
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
            <Link href="/secteurs/electricien" className="group">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <h4 className="font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                    Électricien
                  </h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Solutions spécialisées pour les électriciens
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
            
            <Link href="/blog/comment-trouver-clients-plombier-2024" className="group">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="w-6 h-6 text-blue-500" />
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Guide complet plombier
                  </h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Méthodes pour trouver des clients plombier en 2024
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
