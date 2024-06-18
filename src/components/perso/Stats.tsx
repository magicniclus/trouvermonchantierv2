import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  PhoneArrowUpRightIcon,
  WrenchIcon,
} from "@heroicons/react/20/solid";

const Stats = () => {
  return (
    <section className="w-full relative flex items-center h-full py-5">
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl items-center justify-between p-6 lg:px-4 md:py-6 py-16 z-10 h-[170px]">
        <div className="w-full md:w-[40%] h-full rounded-2xl bg-slate-100 p-3 px-7 flex flex-col justify-center">
          <h2 className="font-semibold text-slate-700">
            Comment{" "}
            <span className="text-yellow-500">Trouver-Mon-Chantier.fr</span>{" "}
            vous aide à obtenir plus de client ?
          </h2>
          <ArrowRightIcon className="h-6 w-6 text-slate-700" />
        </div>
        <div className="w-full md:w-[16%] h-full rounded-2xl p-3 px-7 flex flex-col justify-between text-white bg-slate-700 md:mt-0 mt-5">
          <ArrowTrendingUpIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <h3 className="font-semibold">+ de 7000</h3>
            <p className="text-xs">demande de devis par mois</p>
          </div>
        </div>
        <div className="w-full md:w-[16%] h-full rounded-2xl p-3 px-7 flex flex-col justify-between text-white bg-slate-700 md:mt-0 mt-5">
          <WrenchIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <h3 className="font-semibold">+ de 70 000</h3>
            <p className="text-xs">artisans tout corps d&apos;état</p>
          </div>
        </div>{" "}
        <div className="w-full md:w-[16%] h-full rounded-2xl p-3 px-7 flex flex-col justify-between text-white bg-slate-700 md:mt-0 mt-5">
          <PhoneArrowUpRightIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <h3 className="font-semibold">Jusqu’à 15</h3>
            <p className="text-xs">demandes par jour</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
