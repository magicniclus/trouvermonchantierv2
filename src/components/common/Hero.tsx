import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  label: string;
}

interface HeroProps {
  profession: string;
  professionColor?: string;
  region?: string;
  services: ServiceItem[];
  backgroundImage?: string;
  formTitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  profession,
  professionColor = '#F7B820', // Jaune primaire selon la DA
  region = 'votre région',
  services = [],
  backgroundImage = '/images/demo/couvreur.png',
  formTitle = 'Vous souhaitez obtenir un devis ?'
}) => {
  // Utiliser des classes CSS pour les animations au lieu de framer-motion

  return (
    <div className="relative overflow-hidden">
      {/* Fond avec dégradé subtil */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50/80 to-transparent z-0"></div>
      
      <section id="hero-section" className="relative z-10">
        {/* Scroll Indicator avec animation CSS */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in">
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-white text-sm mb-1 font-medium">Découvrir</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
        
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src={backgroundImage}
              alt={`${profession} background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/75"></div>
          </div>
        </div>

        {/* Content Container with improved spacing */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl md:py-40 py-24 flex flex-col md:flex-row items-center justify-between">
          {/* Left Column - Enhanced Text Content */}
          <div className="w-full md:w-1/2 text-white mb-16 md:mb-0 animate-fade-in">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="block mb-2">Votre</span>
                <span className="text-yellow-500 block mb-2">
                  artisan {profession}
                </span>
                <span className="block">dans {region}</span>
              </h1>
            </div>
            
            <div className="h-1 w-20 bg-yellow-500 rounded my-6 animate-slide-up-delay-1"></div>
            
            <ul className="mt-8 space-y-4 animate-slide-up-delay-2">
              {services.map((service, index) => (
                <li key={index} className="flex items-center animate-fade-in-delay" style={{animationDelay: `${index * 0.15 + 0.5}s`}}>
                  <svg className="h-5 w-5 text-yellow-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-medium">{service.label}</span>
                </li>
              ))}
            </ul>
            
            {/* Rating Stars with improved visual */}
            <div className="mt-12 flex items-center bg-slate-800/50 p-3 rounded-lg inline-flex animate-slide-up-delay-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">Nos clients nous notent <span className="font-bold">4.8/5</span></span>
            </div>
          </div>
          
          {/* Right Column - Enhanced Form */}
          <div className="w-full md:w-5/12 bg-white/95 rounded-2xl p-6 md:p-8 relative mt-10 md:mt-0 shadow-xl animate-slide-in-right">
            <div className="bg-yellow-500 text-slate-900 text-center py-2 px-4 rounded-full mb-6 font-semibold absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-md">
              Devis gratuit sous 48h
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">
              {formTitle}
            </h3>
            
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom, prénom"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  aria-label="Votre nom et prénom"
                />
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom de l'entreprise"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  aria-label="Nom de votre entreprise"
                />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  aria-label="Votre adresse email"
                />
              </div>
              
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  aria-label="Votre numéro de téléphone"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                Demander un devis gratuit
              </button>
              <p className="text-xs text-slate-500 mt-2">Sans engagement. Début immédiat.</p>
            </form>
            
            <div className="flex items-center justify-center mt-6 text-xs text-slate-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p>
                <a href="#" className="underline hover:text-yellow-600 transition-colors">Conditions générales</a> et <a href="#" className="underline hover:text-yellow-600 transition-colors">politique de confidentialité</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
