import ModalFixed from "@/components/perso/ModalFixed";
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
      </main>
    </>
  );
}
