"use client";

import { FlagIcon } from "@heroicons/react/20/solid";
import ProcessMobile from "./ProcessMobile";

const Process = () => {
  return (
    <section className="py-24">
      {/* Version Mobile */}
      <ProcessMobile />
      
      {/* Version Desktop */}
      <div className="w-full flex flex-col relative hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[550px] border-r border-dashed border-yellow-500" />
        <div className="w-full max-w-5xl mx-auto lg:px-4 flex">
          <div className="w-1/2 md:block hidden"></div>
          <div className="relative w-1/2 text-slate-700 max-w-[300px] flex flex-col items-end md:ml-14 ml-0">
            <div className="absolute top-0 -left-[77px] w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center text-xl text-white">
              1
            </div>
            <h2 className="font-bold text-2xl">
              Vous recevez des demandes de devis
            </h2>
            <p>
              Les demandes sont générées automatiquement depuis votre site, via
              des campagnes Google Ads optimisées pour vous.
            </p>
          </div>
          <div className="w-1/2 md:hidden block"></div>
        </div>
        <div className="w-full max-w-5xl mx-auto lg:px-4 flex mt-10">
          <div className="w-1/2 md:block hidden"></div>
          <div className="relative w-1/2 text-slate-700 max-w-[300px] flex flex-col items-end md:ml-14 ml-0">
            <div className="absolute top-0 -left-[77px] w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center text-xl text-white">
              2
            </div>
            <h2 className="font-bold text-2xl">
              Vous effectuez et validez le devis
            </h2>
            <p>
              Les prospects vous contactent directement. Aucune plateforme,
              aucune mise en concurrence : le client, c’est le vôtre.
            </p>
          </div>
          <div className="w-1/2 md:hidden block"></div>
        </div>{" "}
        <div className="w-full max-w-5xl mx-auto lg:px-4 flex items-end mt-10">
          <div className="relative w-1/2 flex flex-col items-end mr-20 text-slate-700">
            <div className="absolute top-0 -right-[60px] w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center text-xl text-white">
              3
            </div>
            <h2 className="font-bold max-w-[300px] text-2xl text-start mr-8">
              Vous réalisez le chantier
            </h2>
            <p className=" max-w-[290px] text-start mr-8">
              Sans commission, sans intermédiaire. <br /> Juste vous, et le
              résultat d’un système qui travaille pour vous.
            </p>
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="w-full max-w-5xl mx-auto lg:px-4 flex mt-10">
          <div className="w-1/2 md:block hidden"></div>
          <div className="relative w-1/2 text-slate-700 max-w-[300px] flex flex-col items-start md:ml-14 ml-0">
            <div className="absolute top-0 -left-[95px] w-20 h-20 rounded-full bg-white border border-yellow-500 rounded-full flex justify-center items-center text-xl text-white">
              <FlagIcon className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="font-bold text-2xl ml-8">Final</h2>
            <p className=" ml-8">
              Vous encaissez. <br />
              Simple, efficace, direct. <br />
              C’est vous qui avez la main.
            </p>
          </div>
          <div className="w-1/2 md:hidden block"></div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Process;
