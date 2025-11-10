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
  DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tarifs Google Ads Artisan - 49€/mois Sans Engagement | Trouver Mon Chantier',
  description: 'Découvrez nos tarifs transparents : 49€/mois + 3% de commission. Site internet artisan + Google Ads clé en main. Générez des chantiers dès 24h, sans engagement.',
  keywords: 'tarif Google Ads artisan, prix site internet artisan, offre prospection artisan, 49€/mois sans engagement, générer chantiers artisans, campagne Google Ads artisan',
  openGraph: {
    title: 'Tarifs Transparents - Solution Google Ads pour Artisans',
    description: 'Site web + Google Ads pour artisans à partir de 49€/mois. Sans engagement, résultats sous 24h.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/tarifs',
  },
};

const avantages = [
  {
    icon: Target,
    title: 'Création de votre site professionnel personnalisé',
    description: 'Site web optimisé pour votre métier avec vos couleurs et vos réalisations'
  },
  {
    icon: Zap,
    title: 'Campagne Google Ads clé en main',
    description: 'Configuration et gestion complète de vos publicités par nos experts'
  },
  {
    icon: BarChart3,
    title: 'Accès à vos statistiques et prospects en temps réel',
    description: 'Dashboard complet pour suivre vos leads et votre retour sur investissement'
  },
  {
    icon: Users,
    title: 'Assistance et optimisation continue',
    description: 'Support dédié et amélioration constante de vos performances'
  },
  {
    icon: Shield,
    title: 'Aucun engagement, résiliable à tout moment',
    description: 'Liberté totale, pas de contrat contraignant ni de frais cachés'
  }
];

const faq = [
  {
    question: 'Est-ce que je garde mes campagnes Google Ads ?',
    answer: 'Oui, absolument ! Vos campagnes Google Ads sont créées sur VOTRE compte Google Ads. Vous en restez propriétaire à 100%. Si vous décidez d\'arrêter notre service, vous gardez tout : votre site, vos campagnes et vos données.'
  },
  {
    question: 'Puis-je arrêter quand je veux ?',
    answer: 'Oui, sans aucune contrainte ! Il n\'y a aucun engagement de durée. Vous pouvez résilier votre abonnement à tout moment depuis votre espace client ou en nous contactant. Aucuns frais de résiliation.'
  },
  {
    question: 'Comment se passe la facturation des 3% ?',
    answer: 'Les 3% de commission se calculent uniquement sur les chantiers que vous signez grâce à nos leads. Vous déclarez vos ventes dans votre espace client. Si vous ne signez aucun chantier, vous ne payez que les 49€/mois.'
  },
  {
    question: 'Est-ce que je peux modifier mon budget publicitaire ?',
    answer: 'Oui, vous contrôlez entièrement votre budget Google Ads. Vous pouvez l\'augmenter, le diminuer ou le mettre en pause à tout moment depuis votre compte Google Ads ou en nous contactant.'
  },
  {
    question: 'Combien de temps pour voir les premiers résultats ?',
    answer: 'Vos campagnes Google Ads sont activées sous 24-48h après validation de votre site. Les premiers appels arrivent généralement dans la semaine qui suit le lancement.'
  },
  {
    question: 'Dans quelles zones géographiques intervenez-vous ?',
    answer: 'Nous intervenons dans toute la France métropolitaine. Vos campagnes Google Ads sont ciblées précisément sur votre zone d\'intervention (rayon que vous définissez autour de votre ville).'
  }
];

const comparaison = [
  {
    critere: 'Coût de mise en place',
    traditionnel: '2000-5000€',
    trouverMonChantier: '0€',
    avantage: true
  },
  {
    critere: 'Abonnement mensuel',
    traditionnel: '300-800€/mois',
    trouverMonChantier: '49€/mois',
    avantage: true
  },
  {
    critere: 'Gestion des campagnes',
    traditionnel: '500-1500€/mois',
    trouverMonChantier: 'Inclus',
    avantage: true
  },
  {
    critere: 'Engagement',
    traditionnel: '12-24 mois',
    trouverMonChantier: 'Aucun',
    avantage: true
  },
  {
    critere: 'Support technique',
    traditionnel: 'Payant',
    trouverMonChantier: 'Inclus',
    avantage: true
  }
];

export default function TarifsPage() {
  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1 rounded-full border border-green-200/70 bg-green-50/80 px-3 py-1 text-xs font-medium text-green-700 shadow-sm/10 mb-6">
              💰 Tarifs transparents
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Tarifs simples et <span className="text-yellow-500">transparents</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl mx-auto">
              Aucun engagement, aucun frais caché. Notre solution vous permet de générer des chantiers réels 
              rapidement avec un site web professionnel et des campagnes Google Ads optimisées. 
              Résultats sous 24h, résiliable à tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* Formule Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Notre formule unique
            </h2>
            <p className="text-xl text-slate-600">
              Tout ce qu'il faut pour trouver vos propres clients
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-slate-200/60 overflow-hidden">
              {/* Header du pricing */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-8 text-center">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Solution Complète Artisan</h3>
                  <p className="text-yellow-100 mb-6">Site web + Google Ads + Support</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">49€</div>
                      <div className="text-yellow-100 text-sm">par mois</div>
                    </div>
                    <div className="text-2xl font-light text-yellow-100">+</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold">3%</div>
                      <div className="text-yellow-100 text-sm">de commission</div>
                    </div>
                  </div>
                  <p className="text-yellow-100 text-sm mt-4">
                    Commission uniquement sur les chantiers signés
                  </p>
                </div>
              </div>

              {/* Contenu du pricing */}
              <div className="p-8">
                <div className="space-y-6">
                  {avantages.map((avantage, index) => {
                    const IconComponent = avantage.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-green-50 p-2 rounded-lg border border-green-200/60">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {avantage.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {avantage.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl text-center transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <span className="text-white">Créer mon site maintenant</span>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-6 py-4 rounded-xl text-center border border-slate-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Demander un devis
                    </Link>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    ✅ Sans engagement • ✅ Résultats sous 24h • ✅ Support inclus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Combien ça rapporte ? 💰
            </h2>
            <p className="text-xl text-slate-600">
              ROI concret pour votre activité d'artisan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-green-50 rounded-2xl p-8 border border-green-200/60">
                <div className="text-center mb-6">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Exemple concret
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-slate-600">1 chantier/mois à 3000€</span>
                    <span className="font-bold text-green-600">+3000€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-slate-600">Abonnement mensuel</span>
                    <span className="font-bold text-red-500">-49€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-slate-600">Commission (3%)</span>
                    <span className="font-bold text-red-500">-90€</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center p-4 bg-green-100 rounded-xl">
                      <span className="font-bold text-slate-900">Bénéfice net/mois</span>
                      <span className="font-bold text-green-600 text-xl">+2861€</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200/60">
                  <p className="text-sm text-yellow-800 text-center">
                    <strong>💡 Un seul chantier par mois amortit 5 ans d'abonnement !</strong>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Comparaison avec la publicité traditionnelle
              </h3>
              
              <div className="space-y-4">
                {comparaison.map((item, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="font-medium text-slate-900">
                        {item.critere}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 mb-1">Agence classique</div>
                        <div className="font-semibold text-red-600">{item.traditionnel}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 mb-1">Trouver Mon Chantier</div>
                        <div className="font-semibold text-green-600 flex items-center justify-center gap-1">
                          {item.trouverMonChantier}
                          {item.avantage && <CheckCircle className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi moins cher */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi c'est moins cher qu'une agence ? 🤔
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Notre approche automatisée et spécialisée artisans nous permet de proposer 
              des tarifs imbattables sans compromis sur la qualité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Automatisation complète
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Nos processus automatisés réduisent drastiquement les coûts de gestion 
                tout en maintenant une qualité optimale.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Spécialisation artisans
              </h3>
              <p className="text-slate-600 leading-relaxed">
                100% focalisés sur les artisans, nous maîtrisons parfaitement vos besoins 
                et optimisons chaque euro investi.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Transparence totale
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Aucun frais caché, aucun engagement. Vous payez uniquement pour les résultats 
                que vous obtenez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Questions fréquentes 🤝
            </h2>
            <p className="text-xl text-slate-600">
              Toutes les réponses à vos questions sur nos tarifs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faq.map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Démarrez dès aujourd'hui — 0 engagement, résultats sous 24h ⚡
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Rejoignez les centaines d'artisans qui génèrent déjà leurs propres clients 
              grâce à notre solution Google Ads personnalisée.
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
                href="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                Parler à un conseiller
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Sans engagement
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Résultats sous 24h
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Support inclus
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Vous gardez tout
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-bold text-white">Pierre M.</div>
                    <div className="text-slate-400 text-sm">Électricien, Lyon</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "En 3 mois, j'ai doublé mon chiffre d'affaires. 
                  Le ROI est exceptionnel !"
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-bold text-white">Marie D.</div>
                    <div className="text-slate-400 text-sm">Plombier, Bordeaux</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "Enfin une solution qui marche ! 
                  Mon planning est rempli pour 3 mois."
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-bold text-white">Jean L.</div>
                    <div className="text-slate-400 text-sm">Menuisier, Nantes</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "Simple, efficace, rentable. 
                  Je recommande à tous mes confrères !"
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
