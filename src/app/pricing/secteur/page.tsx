"use client";

import SearchWithCards from "@/components/mapbox/SearchWithCards";
import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav withMenu={false} />
      <main className="min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h1 className="text-4xl text-center mt-10 underline decoration-yellow-500">
            Selectionné votre lieux d&apos;exercice
          </h1>
          <h2 className="text-center my-7">
            Pour notre projection, nous ajoutons minimum 10km au tour de la zone
            defini en fonction de la demande
          </h2>
        </div>
        <SearchWithCards />
      </main>
      <Footer />
    </>
  );
};

export default page;
