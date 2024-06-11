import ModalFixed from "@/components/perso/ModalFixed";
import Stats from "@/components/perso/Stats";
import Fonctionnement from "@/components/perso/content/Fonctionnement";
import Prospection from "@/components/perso/content/Prospection";
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
      </main>
    </>
  );
}
