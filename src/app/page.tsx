/* eslint-disable @next/next/no-img-element */
"use client";

import ModalFixed from "@/components/perso/ModalFixed";
import Stats from "@/components/perso/Stats";
import Banner from "@/components/perso/banner/Banner";
import PromoBanner from "@/components/common/PromoBanner";
import ArticlesALaUne from "@/components/perso/content/ArticlesALaUne";
import Commentaires from "@/components/perso/content/Commentaires";
import FAQ from "@/components/perso/content/FAQ";
import ToolsFeatures from "@/components/perso/content/ToolsFeatures";
import Fonctionnement from "@/components/perso/content/Fonctionnement";
import Process from "@/components/perso/content/Process";
import Pricing from "@/components/perso/content/Pricing";
import Prospection from "@/components/perso/content/Prospection";
import Footer from "@/components/perso/footer/Footer";
import HeroV2 from "@/components/perso/hero/HeroV2";
import Nav from "@/components/tailwindui/nav/Nav";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleSmoothScroll = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches("a[href^='#']")) {
        event.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);
  return (
    <>
      <PromoBanner message="99€/mois seulement - 2ème mois offert si vous recevez moins de 5 demandes !" />
      {/* Espace pour compenser la hauteur de la bannière fixe */}
      <div style={{ height: 'var(--banner-height, 32px)' }}></div>
      <header>
        <Nav />
      </header>
      <main className="relative">
        <ModalFixed />
        <HeroV2 />
        <Stats />
        <Fonctionnement />
        <Prospection />
        <div className="relative w-full overflow-hidden">
          <img
            src="/images/Ellipse.png"
            alt="ellipse"
            className="absolute -top-[20%] -left-[20%] w-full object-cover h-auto -z-10 opacity-60"
          />
          <img
            src="/images/Ellipse2.png"
            alt="ellipse"
            className="absolute top-[50%] -right-[20%] w-full object-cover h-auto -z-10 opacity-60"
          />
          {/* <Pricing /> */}
          <Process />
          {/* <ToolsFeatures /> */}
          <FAQ />
          <ArticlesALaUne />
          <Commentaires />
          <Banner />
        </div>
      </main>
      <Footer className="bg-slate-900" />
    </>
  );
}
