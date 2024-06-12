/* eslint-disable @next/next/no-img-element */
import ModalFixed from "@/components/perso/ModalFixed";
import Stats from "@/components/perso/Stats";
import Comments from "@/components/perso/content/Comments";
import Fonctionnement from "@/components/perso/content/Fonctionnement";
import Process from "@/components/perso/content/Process";
import Prospection from "@/components/perso/content/Prospection";
import Tarifs from "@/components/perso/content/Tarifs";
import Hero from "@/components/perso/hero/Hero";
import Nav from "../components/tailwindui/nav/Nav";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="relative">
        <ModalFixed />
        <Hero />
        <Stats />
        <Fonctionnement />
        <Prospection />
        <div className="absolute w-full overflow-hidden">
          <img
            src="/images/Ellipse.png"
            alt="ellipse"
            className="absolute -top-[20%] -left-[20%] w-full object-cover h-auto -z-10 opacity-30"
          />
          <img
            src="/images/Ellipse2.png"
            alt="ellipse"
            className="absolute top-[50%] -right-[20%] w-full object-cover h-auto -z-10 opacity-30"
          />
          <Tarifs />
          <Process />
          <Comments />
        </div>
      </main>
    </>
  );
}
