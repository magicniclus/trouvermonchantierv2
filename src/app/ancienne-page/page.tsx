"use client"

import Nav from "@/components/tailwindui/nav/Nav"
import Footer from "@/components/perso/footer/Footer"
import HeroNetwork from "@/components/perso/hero/HeroNetwork"
import AvantagesSection from "@/components/perso/partenaire/AvantagesSection"
import AvantagesSectionClair from "@/components/perso/partenaire/AvantagesSectionClair"
import StatsSection from "@/components/perso/stats/StatsSection"
import ExempleEntreprise from "@/components/perso/exemple/ExempleEntreprise"
import OutilsInclus from "@/components/perso/outils/OutilsInclus"
import TemoignagesClients from "@/components/perso/temoignages/TemoignagesClients"
import { useEffect } from "react"

export default function AnciennePage() {
    useEffect(() => {
        // Animation au scroll avec IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-animate-delay') || '0';
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, parseInt(delay));
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer tous les éléments avec data-animate
        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <style jsx global>{`
                [data-animate] {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Animation plus douce pour les éléments avec délai */
                [data-animate-delay] {
                    transition-duration: 1s;
                }
            `}</style>
            
            <Nav />
            <HeroNetwork />
            
            <AvantagesSectionClair />
            <StatsSection variant="light" />
            <ExempleEntreprise variant="light" />
            <OutilsInclus variant="light" />
            <TemoignagesClients variant="light" />
            
            <Footer className="bg-slate-900" />
        </div>
    )
}
