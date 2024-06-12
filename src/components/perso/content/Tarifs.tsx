/* eslint-disable @next/next/no-img-element */
import Price from "@/components/tailwindui/price/Price";

const Tarifs = () => {
  return (
    <section className="w-full py-16 px-4 pb-20 relative">
      <div className="w-full max-w-5xl mx-auto lg:px-4 flex items-center flex-col">
        <h3 className="text-yellow-500 text-xl font-semibold text-center">
          Tarifs
        </h3>
        <h2 className="text-yellow-slate-500 mt-5 text-2xl text-center font-semibold">
          L’ensemble de nos offres disponible pour nos partenaires
        </h2>
        <Price />
      </div>
    </section>
  );
};

export default Tarifs;
