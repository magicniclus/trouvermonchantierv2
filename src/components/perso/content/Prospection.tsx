/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Prospection = () => {
  // Référence pour le compteur
  const counterRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // État pour le compteur
  const [count, setCount] = useState(0);
  
  // Leads simulés pour le GIF
  const leads = [
    { name: "Martin", cp: "75011", service: "Rénovation toiture" },
    { name: "Sophie", cp: "69003", service: "Installation électrique" },
    { name: "Thomas", cp: "33000", service: "Plomberie salle de bain" },
    { name: "Julie", cp: "59000", service: "Pose de carrelage" },
  ];
  
  // État pour le lead actuel
  const [currentLead, setCurrentLead] = useState(0);
  
  // Animation GSAP pour le compteur
  useEffect(() => {
    // S'assurer que les refs sont définies
    if (!counterRef.current || !sectionRef.current) return;
    
    // Animation du compteur avec GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Déclencher quand le haut de la section atteint 80% de la fenêtre
        once: true, // Ne s'exécute qu'une seule fois
      }
    });
    
    // Animation du compteur de 0 à 10
    tl.to(counterRef.current, {
      innerHTML: 10,
      duration: 1.5,
      ease: "power2.out",
      snap: { innerHTML: 1 }, // Pour des nombres entiers
      onUpdate: () => {
        // Mettre à jour l'état React pour la cohérence
        if (counterRef.current) {
          setCount(parseInt(counterRef.current.innerHTML));
        }
      }
    });
    
    // Nettoyage
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  // Animation de rotation des leads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLead(prev => (prev + 1) % leads.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToVideo = () => {
    const videoSection = document.getElementById('pricing');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-12 bg-gradient-to-b from-slate-900 to-slate-700" 
      id="avantages"
    >
      <div className="w-full max-w-5xl mx-auto px-4 lg:px-8">
        <div className="w-full rounded-lg p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          
          {/* Partie gauche - Mock-up mobile avec animation */}
          <div className="md:w-5/12 w-full flex flex-col items-center relative">
            <div className="relative">
              <img
                src="/images/phone.png"
                alt="Application mobile avec leads"
                className="w-[280px] md:w-[320px] h-auto object-contain drop-shadow-xl"
              />
              
              {/* Overlay des leads animés */}
              <div className="absolute top-[25%] left-[15%] right-[15%] bg-white bg-opacity-95 rounded-md p-3 shadow-lg animate-bounce">
                <div className="text-xs font-medium text-gray-800">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Nouveau lead</span>
                    <span className="text-green-600 font-semibold animate-pulse">À l'instant</span>
                  </div>
                  <div 
                    key={`name-${currentLead}`} 
                    className="font-bold text-sm mb-1 animate-smooth-fade" 
                    style={{ animationDuration: '0.6s' }}
                  >
                    {leads[currentLead].name} - {leads[currentLead].cp}
                  </div>
                  <div 
                    key={`service-${currentLead}`} 
                    className="text-blue-600 animate-smooth-fade" 
                    style={{ animationDuration: '0.8s' }}
                  >
                    {leads[currentLead].service}
                  </div>
                </div>
              </div>
              
              {/* Badge "Preuve réelle" */}
              <div className="absolute -bottom-2 right-0 bg-yellow-500 text-xs font-bold text-white px-3 py-1 rounded-full shadow-md">
                Preuve réelle - client Dupont
              </div>
              
              {/* Témoignage en overlay */}
              <div className="absolute -bottom-12 -left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md max-w-[200px] transform -rotate-3">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/images/avatar-artisan.jpg" alt="Jean, Plombier" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-xs font-bold">Jean, Plombier</span>
                </div>
                <p className="text-xs italic">"J'ai eu 8 devis le premier mois!"</p>
              </div>
            </div>
          </div>
          
          {/* Partie droite - Texte et CTA */}
          <div className="md:w-7/1 md:mt-0 mt-20 w-full text-white">
            <div className="transform transition-all duration-700">
              <div className="flex items-baseline gap-2 mb-2">
                <span 
                  ref={counterRef} 
                  className="text-4xl md:text-5xl font-bold text-yellow-400"
                >
                  0
                </span>
                <h3 className="text-2xl md:text-3xl font-bold">
                  prospects qualifiés par jour
                </h3>
              </div>
              <h4 className="text-lg text-yellow-300 font-medium mb-6">garanti ou 2<sup>ème</sup> mois offert</h4>
              
              {/* Logo Google + texte */}
              <div className="flex items-center gap-3 mb-6">
                <img src="/logos/google.jpeg" alt="Google" className="w-8 h-8" />
                <span className="text-sm text-gray-300">Campagne gérée pour vous</span>
              </div>

              {/* Points clés avec icônes */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <span className="font-semibold block">Visibilité garantie</span>
                    <p className="text-gray-300">Être visible sur Google aujourd'hui, ce n'est plus un bonus : c'est indispensable.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <span className="font-semibold block">Clients ciblés par zone</span>
                    <p className="text-gray-300">Vous apparaissez exactement là où vos clients cherchent, avant vos concurrents.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <span className="font-semibold block">Zéro effort de votre part</span>
                    <p className="text-gray-300">On s'occupe de tout pour vous - création, optimisation et suivi.</p>
                  </div>
                </li>
              </ul>
              
              {/* CTA */}
              <button 
                onClick={scrollToVideo}
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 shadow-lg"
              >
                Voir comment ça marche
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prospection;
