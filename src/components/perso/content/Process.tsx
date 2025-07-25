"use client";

import { FlagIcon } from "@heroicons/react/20/solid";
import ProcessMobile from "./ProcessMobile";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Process = () => {
  const scrollToVideo = () => {
    const videoSection = document.getElementById('pricing');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
            Le prospect vous appelle ou vous écrit directement.
            </h2>
            <p>
            Pas de plateforme, pas de concurrence, pas de frais cachés : c’est votre client, votre prix.
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
            Le devis est validé et envoyé directement au prospect.
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
            Vous réalisez le chantier, et vous encaissez.
            </h2>
            <p className=" max-w-[290px] text-start mr-10">
            Pas de commission, pas d’intermédiaire. <br/>
            Vous récoltez 100% du fruit de votre travail.
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
            <h2 className="font-bold text-2xl ml-8">🎯 Objectif atteint : vous avez un client, un chantier, un revenu.</h2>
            <p className=" ml-8">
              Vous encaissez. <br />
              Simple, efficace, direct. <br />
              Vous gardez le contrôle, nous gérons le reste.
            </p>
            <button 
                onClick={scrollToVideo}
                className="text-yellow-500 font-bold duration-300 ml-8 flex items-center mt-3"
              >
                On y va ! <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
          </div>
          <div className="w-1/2 md:hidden block"></div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Process;
