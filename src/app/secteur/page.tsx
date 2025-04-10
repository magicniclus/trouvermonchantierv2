"use client";

import SearchWithCards from "@/components/mapbox/SearchWithCards";
import Nav from "@/components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav withMenu={false} />
      <main className="min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-7 md:px-0">
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-slate-700 mt-7">
            Sélectionnez votre{" "}
            <span className="text-yellow-500">lieu d&apos;exercice.</span>
          </h1>
          <h2 className="text-center my-7">
            Pour notre projection, nous ajoutons un minimum de 10 km autour de
            la zone définie en fonction de la demande.
          </h2>
        </div>
        <SearchWithCards />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default page;
