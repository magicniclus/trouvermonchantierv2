"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ComputerDesktopIcon, MegaphoneIcon, ChatBubbleBottomCenterTextIcon, ChartBarIcon, StarIcon, CalendarIcon, QrCodeIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  impact: string;
  icon: React.ReactNode;
  stat?: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  expanded: boolean;
  onClick: () => void;
}

const FeatureCard = ({ feature, index, expanded, onClick }: FeatureCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-yellow-500">
            {feature.icon}
          </div>
          <h3 className="font-semibold text-slate-800">{feature.name}</h3>
        </div>
        {feature.stat && (
          <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
            {feature.stat}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{feature.description}</p>
      
      <div className={`overflow-hidden transition-all ${expanded ? 'max-h-40' : 'max-h-0'}`}>
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start">
            <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{feature.impact}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="inline-flex items-center gap-1 text-yellow-600 text-sm font-medium group-hover:translate-x-1 transition">
          {expanded ? 'Voir moins' : 'En savoir plus'}
          <ArrowRightIcon className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
};

export default function ToolsFeatures() {
  const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  
  // Définition des fonctionnalités actuelles avec icônes et statistiques
  const currentFeatures: Feature[] = [
    { 
      name: "Site vitrine / page d'atterrissage", 
      description: "Présente vos services, vos photos et vos coordonnées sur une page rapide, claire et adaptée au mobile.",
      impact: "Les visiteurs trouvent tout de suite quoi faire : davantage d'appels et de formulaires.",
      stat: "+20%",
      icon: <ComputerDesktopIcon className="h-6 w-6" />
    },
    { 
      name: "Campagnes Google Ads gérées de A à Z", 
      description: "Vos annonces sortent exactement quand quelqu'un cherche « artisan + ville ». Nous optimisons mots-clés, budget et suivi des conversions.",
      impact: "Un flux régulier de prospects chauds dès le premier jour, avec un coût par lead sous contrôle.",
      stat: "400€",
      icon: <MegaphoneIcon className="h-6 w-6" />
    },
    { 
      name: "Chatbot IA disponible 24 h/24", 
      description: "Accueille chaque visiteur, pose deux-trois questions clés, récupère photos et adresse, puis propose un créneau de rappel.",
      impact: "Vous captez les demandes qui arrivent le soir ou le week-end : environ 30 % de contacts supplémentaires.",
      stat: "+30%",
      icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
    },
    { 
      name: "CRM de suivi des prospects", 
      description: "Pipeline clair : Nouveau → Devis envoyé → Relance → Gagné/Perdu, avec rappels SMS/e-mail automatisés.",
      impact: "Fini les devis qui dorment : les relances systématiques ajoutent +20 – 30 % de signatures.",
      stat: "+25%",
      icon: <ChartBarIcon className="h-6 w-6" />
    },
  ];

  // Définition des fonctionnalités futures avec icônes
  const futureFeatures: Feature[] = [
    { 
      name: "Gestion des commentaires", 
      description: "Réunit tous vos avis dans un seul tableau, vous alerte dès qu'un nouveau commentaire tombe.", 
      impact: "Répondez rapidement aux avis clients et améliorez votre réputation en ligne.",
      icon: <StarIcon className="h-6 w-6" />
    },
    { 
      name: "Planning en ligne partagé", 
      description: "Vos créneaux de visites s'affichent en temps réel ; le prospect réserve son heure sans appels interminables.", 
      impact: "Réduisez les allers-retours téléphoniques et optimisez votre agenda.",
      icon: <CalendarIcon className="h-6 w-6" />
    },
    { 
      name: "QR Code 'Laisser un avis'", 
      description: "Un autocollant ou un lien sur la facture : le client scanne, tombe directement sur la page Google Avis.", 
      impact: "Multipliez par 3 le nombre d'avis positifs sur votre entreprise.",
      icon: <QrCodeIcon className="h-6 w-6" />
    },
    { 
      name: "Générateur de posts réseaux sociaux", 
      description: "À partir d'une photo de chantier, l'IA crée le texte, les hashtags et même une idée de Story.", 
      impact: "Restez visible sur les réseaux sans y passer des heures chaque semaine.",
      icon: <PhotoIcon className="h-6 w-6" />
    },
  ];

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section id="outils" className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <section className="bg-slate-50/80 rounded-3xl p-10 lg:p-14 shadow-sm">
          {/* En-tête de section */}
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Tous les outils dont vous avez besoin</h2>
            <p className="text-slate-600 mt-4">Une solution complète pour générer et convertir plus de prospects</p>
          </header>
          
          {/* Tabs pour switcher entre fonctionnalités actuelles et futures */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              <button 
                onClick={() => setActiveTab('current')}
                className={`rounded-full px-4 py-2 font-medium text-sm transition-all ${activeTab === 'current' ? 'bg-yellow-500/10 text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Inclus maintenant
              </button>
              <button 
                onClick={() => setActiveTab('future')}
                className={`rounded-full px-4 py-2 font-medium text-sm transition-all ${activeTab === 'future' ? 'bg-yellow-500/10 text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                À venir bientôt
              </button>
            </div>
          </div>

          {/* Prix et CTA */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-10 mx-auto max-w-[380px] -mt-6 shadow-xl ring-1 ring-yellow-200">
            <div className="flex justify-center items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">99€</span>
              <span className="text-xl font-semibold text-gray-500">/mois</span>
            </div>
            <p className="mt-4 text-gray-600">Tous les outils pour générer plus de clients</p>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-3 mt-6 transition">
              Commencer pour 99€
            </button>
          </div>

          {/* Grille de fonctionnalités */}
          <div className="grid gap-8 md:grid-cols-2 mt-16">
          {activeTab === 'current' ? (
            currentFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                feature={feature} 
                index={index} 
                expanded={expandedFeature === index}
                onClick={() => toggleFeature(index)}
              />
            ))
          ) : (
            futureFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-dashed border-gray-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-gray-400">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-slate-800">{feature.name}</h3>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <SparklesIcon className="h-3 w-3 mr-1" />
                      Bientôt
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500 italic">{feature.impact}</p>
                </div>
              </motion.div>
            ))
          )}
          </div>
        </section>
      </div>
    </section>
  );
}
