import React from 'react';

interface ExperienceProps {
  title?: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  mediaPlaceholder?: string;
  accentColor?: string;
}

const Experience: React.FC<ExperienceProps> = ({
  title = "l'expérience",
  subtitle = "Mon Couvreur",
  description,
  buttonText = "Prendre Rendez-vous",
  buttonHref = "#contact",
  mediaType = 'video',
  mediaUrl,
  mediaPlaceholder = '/images/demo/video-placeholder.jpg',
  accentColor = '#F97316' // Orange par défaut
}) => {
  return (
    <div className="relative py-16">
      {/* Fond gris sur la partie supérieure */}
      <div className="absolute top-0 left-0 right-0 h-[70%] bg-[#F5F5F5] z-0"></div>
      
      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 h-full md:min-h-[500px]">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2">
              {/* Titre principal */}
              <h3 className="text-[48px] md:text-[64px] font-light text-gray-700 mb-2">{title}</h3>
              
              {/* Sous-titre et badges */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[48px] md:text-[64px] font-bold text-slate-900">{subtitle}</h2>
                  <div 
                    className="h-1 w-20 mt-3 rounded-full" 
                    style={{ backgroundColor: accentColor }}
                  ></div>
                </div>
                
               
              </div>
              
              {/* Texte descriptif */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <p className="text-gray-700">
                  {description}
                </p>
                
                {buttonText && (
                  <div className="mt-6">
                    <a 
                      href={buttonHref}
                      className="inline-block border border-orange-400 hover:border-orange-500 text-orange-400 font-medium py-3 px-6 rounded-md transition-all duration-300"
                    >
                      {buttonText}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Media */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-md p-4 w-full">
                {mediaType === 'video' ? (
                  <div className="relative rounded-md overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      {/* Placeholder image or video thumbnail */}
                      <img 
                        src={mediaPlaceholder} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-white/80 flex items-center justify-center">
                          <div 
                            className="h-16 w-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: accentColor }}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-8 w-8 text-white" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md overflow-hidden aspect-video">
                    <img 
                      src={mediaUrl} 
                      alt={subtitle} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
