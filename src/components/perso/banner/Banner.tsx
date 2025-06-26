"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const Banner = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  
  // Gérer le clic sur le bouton avec défilement fluide
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isHomePage) {
      // Si on est sur la page d'accueil, faire un défilement fluide vers l'ancre
      const element = document.getElementById("pricing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Si on est sur une autre page, naviguer vers la page d'accueil
      // Le défilement sera géré après le chargement de la page
      router.push("/#pricing");
    }
  }, [isHomePage, router]);

  return (
    <section className="w-full relative flex items-center h-full py-5 bg-[#12A67C]">
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl md:items-center justify-between p-6 lg:px-4 md:py-6 py-16 z-10 h-[170px]">
        <div className="w-full max-w-[450px]">
          <h2 className="text-xl text-bgPrimary font-bold">
            Vous êtes un professionnel du bâtiment ?
          </h2>
          <h3 className="text-bgPrimary font-semibold mt-1">
            Obtenez votre machine à chantier{" "}
            <span className="text-yellow-500">trouver-mon-chantier.fr</span>
          </h3>
        </div>
        <a
          href={isHomePage ? "#pricing" : "/#pricing"}
          onClick={handleClick}
          className="bg-bgPrimary text-white p-3 font-xl flex rounded-full w-max mt-5 md:mt-0 cursor-pointer"
        >
          OBTENIR MES CHANTIERS{" "}
          <ArrowRightIcon className="h-6 w-6 text-white ml-3" />
        </a>
      </div>
    </section>
  );
};

export default Banner;
