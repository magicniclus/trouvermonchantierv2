"use client";

import React, { useEffect, useRef } from 'react';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

interface PromoBannerProps {
  message?: string;
}

export default function PromoBanner({ 
  message = "En ce moment 3 mois à 29€/mois offerts ( sans angagement ) !" 
}: PromoBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Mesurer la hauteur de la bannière et la définir comme variable CSS
    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${bannerHeight}px`);
    }
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="w-full bg-yellow-500 text-white py-2 fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 text-center text-sm font-medium flex items-center justify-center">
        <RocketLaunchIcon className="h-4 w-4 mr-1 text-white animate-pulse" />
        <span>{message}</span>
        <RocketLaunchIcon className="h-4 w-4 ml-1 text-white animate-pulse" />
      </div>
    </div>
  );
}
