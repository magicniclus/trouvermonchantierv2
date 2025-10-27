/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

const Fonctionnement = () => {
  const metiers = [
    "Plomberie",
    "Toiture",
    "Électricité",
    "Carrelage",
    "Peinture",
    "Maçonnerie"
  ];
  
  // État pour les compteurs animés
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  // Référence pour détecter quand la section est visible
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Étapes du fonctionnement mémorisées pour éviter les re-rendus inutiles
  const etapes = useMemo(() => [
    {
      numero: 1,
      titre: "On crée votre site",
      description: "Nous développons un site optimisé pour convertir les visiteurs en clients",
      valeurFinale: 24,
      unite: "h/24",
      couleur: "bg-blue-500"
    },
    {
      numero: 2,
      titre: "On attire des clients",
      description: "Votre site apparaît en tête des résultats Google dans votre zone",
      valeurFinale: 7,
      unite: "j/7",
      couleur: "bg-green-500"
    },
    {
      numero: 3,
      titre: "Vous recevez des appels",
      description: "Des prospects qualifiés vous contactent directement",
      valeurFinale: 365,
      unite: "j/an",
      couleur: "bg-yellow-500"
    }
  ], []);
  
  // Détecter quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  // Animation des compteurs
  useEffect(() => {
    if (isVisible) {
      // Animation du premier compteur
      let startCount1 = 0;
      const interval1 = setInterval(() => {
        if (startCount1 < etapes[0].valeurFinale) {
          startCount1 += 1;
          setCount1(startCount1);
        } else {
          clearInterval(interval1);
        }
      }, 50);
      
      // Animation du deuxième compteur avec délai
      setTimeout(() => {
        let startCount2 = 0;
        const interval2 = setInterval(() => {
          if (startCount2 < etapes[1].valeurFinale) {
            startCount2 += 1;
            setCount2(startCount2);
          } else {
            clearInterval(interval2);
          }
        }, 100);
      }, 500);
      
      // Animation du troisième compteur avec délai
      setTimeout(() => {
        let startCount3 = 0;
        const interval3 = setInterval(() => {
          if (startCount3 < etapes[2].valeurFinale) {
            startCount3 += Math.ceil(etapes[2].valeurFinale / 20); // Plus rapide pour les grands nombres
            if (startCount3 > etapes[2].valeurFinale) startCount3 = etapes[2].valeurFinale;
            setCount3(startCount3);
          } else {
            clearInterval(interval3);
          }
        }, 50);
      }, 1000);
      
      return () => {
        clearInterval(interval1);
      };
    }
  }, [isVisible, etapes]);

  const scrollToVideo = () => {
    const videoSection = document.getElementById('pricing');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full md:pb-20" id="why" ref={sectionRef}>
      <div className="w-full max-w-5xl mx-auto lg:px-4">
        <div className="w-full bg-slate-50/80 rounded-3xl p-8 md:p-14 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="text-slate-700">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Votre site et vos pubs Google travaillent pour vous, même quand vous dormez.
              </h2>
              <div className="h-1 w-14 bg-yellow-500 rounded mt-4" />
              
              <p className="leading-7 text-lg text-slate-700 mt-6">
              Grâce à notre système, vos clients vous trouvent sur Google quand ils recherchent votre métier dans votre ville.
              </p>
              
              <p className="leading-7 text-lg text-slate-700 mt-4">
              Votre site et vos campagnes Google Ads sont prêts en 24h, et vous commencez à recevoir des appels dès demain.
              </p>
              
              <div className="mt-6">
                <p className="font-medium text-slate-800 mb-2">Pour tous les secteurs de la construction et du bâtiment.</p>
                <p className="font-medium text-slate-800 mb-2">Zéro plateforme. Zéro demande de chantier partagée.</p>
                <p className="font-medium text-slate-800 mb-2">Les demandes vous arrivent en direct, sans intermédiaire.</p>
              </div>
              <button 
                onClick={scrollToVideo}
                className="bg-yellow-500 mt-4 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 shadow-lg"
              >
Obtenir mes clients
              </button>
            </div>
            
              
              {/* Image */}
              <div className="flex itens-center aspect-[16/10] w-full md:w-[420px] mx-auto mt-10">
                <img
                  src="/images/desktop.png"
                  alt="Landing page optimisée pour la conversion"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnement;
