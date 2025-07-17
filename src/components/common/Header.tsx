"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  // Le titre à afficher (si pas de logo)
  title?: string;
  // Le chemin vers le logo (si pas de titre)
  logoPath?: string;
  // Hauteur du logo en pixels
  logoHeight?: number;
  // Largeur du logo en pixels
  logoWidth?: number;
  // Liens de navigation personnalisés
  navLinks?: Array<{
    label: string;
    href: string;
  }>;
  // Texte du bouton CTA
  ctaText?: string;
  // URL du bouton CTA
  ctaHref?: string;
}

export default function Header({
  title = "moncouvreur",
  logoPath,
  logoHeight = 40,
  logoWidth = 160,
  navLinks = [
    { label: "qui sommes nous ?", href: "/qui-sommes-nous" },
    { label: "préstations", href: "/prestations" },
    { label: "réalisation", href: "/realisation" },
  ],
  ctaText = "Prendre rendez-vous",
  ctaHref = "/contact",
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  // Fonction throttle pour limiter les appels lors du défilement
  const throttleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Cibler spécifiquement le composant Hero par son ID
        const heroSection = document.getElementById('hero-section');
        
        if (heroSection) {
          // Calculer la position du bas du Hero par rapport au haut de la page
          const heroRect = heroSection.getBoundingClientRect();
          const heroBottom = heroRect.bottom;
          
          // Activer le header fixe uniquement lorsque le bas du Hero passe au-dessus du haut de l'écran
          if (heroBottom <= 0) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        } else {
          // Fallback au comportement précédent si on ne trouve pas le Hero
          const headerElement = headerRef.current;
          if (headerElement && currentScrollY >= headerElement.offsetHeight) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', throttleScroll, { passive: true });
    
    // Mesurer la hauteur initiale du header
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, [throttleScroll]);
  
  useEffect(() => {
    // Mettre à jour la hauteur du spacer avec une transition fluide
    const spacer = document.getElementById('header-spacer');
    if (spacer && headerHeight > 0) {
      if (isScrolled) {
        spacer.style.height = `${headerHeight}px`;
      } else {
        spacer.style.height = '0px';
      }
    }
  }, [isScrolled, headerHeight]);
  return (
    <>
      {/* Header normal (visible au début) */}
      {!isScrolled && (
        <header 
          ref={headerRef} 
          className="w-full bg-white shadow-sm z-10"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo ou Titre */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                {logoPath ? (
                  <Image 
                    src={logoPath} 
                    alt="Logo" 
                    width={logoWidth} 
                    height={logoHeight} 
                    className="h-auto" 
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-900">{title}</span>
                )}
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href}
                  className="text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bouton CTA */}
            <div className="flex-shrink-0">
              <Link 
                href={ctaHref}
                className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded transition-colors"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </header>
      )}
      
      {/* Header fixe (apparait lors du défilement) */}
      <header 
        className="w-full bg-white shadow-md z-50 transition-all duration-500 ease-in-out"
        style={{
          position: 'fixed',
          top: 'var(--banner-height, 32px)', // Utilise la variable CSS avec une valeur par défaut
          left: 0,
          right: 0,
          transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isScrolled ? 1 : 0,
          visibility: isScrolled ? 'visible' : 'hidden',
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
        }}
      >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo ou Titre */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            {logoPath ? (
              <Image 
                src={logoPath} 
                alt="Logo" 
                width={logoWidth} 
                height={logoHeight} 
                className="h-auto" 
              />
            ) : (
              <span className="text-2xl font-bold text-gray-900">{title}</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="text-base text-gray-800 hover:text-gray-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bouton CTA */}
        <div className="flex-shrink-0">
          <Link 
            href={ctaHref}
            className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded transition-colors"
          >
            {ctaText}
          </Link>
        </div>

      </div>
    </header>
    </>
  );
}
