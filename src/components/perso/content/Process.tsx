import { FlagIcon } from "@heroicons/react/20/solid";

/* eslint-disable @next/next/no-img-element */
const Process = () => {
  return (
    <section className="w-full py-16 pb-20 relative md:min-h-[900px]">
      <div className="w-full max-w-5xl mx-auto lg:px-4 hidden md:flex items-center flex-col relative">
        {/* Le trait en pointillé */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-0.5 h-[130%] border-dotted border-yellow-500 border-2"></div>
        </div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full absolute top-0 flex justify-center" />
        <div className="w-4 h-4 bg-yellow-500 rounded-full absolute top-[30%] flex justify-center" />
        <div className="w-4 h-4 bg-yellow-500 rounded-full absolute top-[65%] flex justify-center" />
        <div className="w-4 h-4 bg-yellow-500 rounded-full absolute top-[94%] flex justify-center" />
        <h3 className="text-xl absolute top-[140%] text-slate-700 flex justify-center">
          Remise de la facture au client
        </h3>
        <div className="w-20 h-20 flex justify-center items-center border border-yellow-500 rounded-full absolute top-[150%]">
          <FlagIcon className="w-10 h-10 text-yellow-500" />
        </div>
        <img
          src="/images/polygon.png"
          className="w-4 h-4 absolute top-[130%] flex justify-center"
          alt="polygone"
        />
        <div className="w-full">
          <div className="w-1/2 text-slate-700 flex justify-end transform -translate-x-10">
            <p className="w-1/2 mr-5">
              Le client effectue une demande de devis sur votre site
              personnalisé et optimisé
            </p>
            <p className="text-3xl font-bold">1</p>
          </div>
        </div>
        <div className="w-full flex justify-end mt-20">
          <div className="w-1/2 text-slate-700 flex transform translate-x-10">
            <p className="text-3xl font-bold">2</p>
            <p className="w-1/2 ml-5">
              Vous recevez sa demande dans la minute sur votre email et vous
              prenez rendez-vous avec
            </p>
          </div>
        </div>
        <div className="w-full mt-20">
          <div className="w-1/2 text-slate-700 flex justify-end transform -translate-x-10">
            <p className="w-1/2 mr-5">Vous effectuez le devis et le validé</p>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
        <div className="w-full flex justify-end mt-20">
          <div className="w-1/2 text-slate-700 flex transform translate-x-10">
            <p className="text-3xl font-bold">4</p>
            <p className="w-1/2 ml-5">Vous réalisez les travaux</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto lg:px-4 flex md:hidden items-center flex-col relative px-4">
        <div className="">
          <div className=" text-slate-700 flex flex-col items-center">
            <p className="text-3xl font-bold">1</p>
            <p className=" ml-5 text-center">
              Le client effectue une demande de devis sur un de nos sites
            </p>
          </div>
        </div>
        <div className=" flex mt-20">
          <div className=" text-slate-700 flex  flex-col items-center">
            <p className="text-3xl font-bold">2</p>
            <p className=" ml-5 text-center">
              Vous recevez sa demande dans la minute sur votre email et vous
              prenez rendez-vous avec
            </p>
          </div>
        </div>
        <div className=" mt-20">
          <div className=" text-slate-700 flex  flex-col items-center">
            <p className="text-3xl font-bold">3</p>
            <p className=" ml-5 text-center">
              Vous effectuez le devis et le validé
            </p>
          </div>
        </div>
        <div className=" flex mt-20">
          <div className=" text-slate-700 flex  flex-col items-center">
            <p className="text-3xl font-bold">4</p>
            <p className=" ml-5 text-center">Vous réalisez les travaux</p>
          </div>
        </div>
        <h3 className="text-xl absolute top-[140%] text-slate-700 hidden md:flex justify-center">
          Remise de la facture au client
        </h3>
        <div className="w-20 h-20 hidden md:flex justify-center items-center border border-yellow-500 rounded-full absolute top-[150%]">
          <FlagIcon className="w-10 h-10 text-yellow-500" />
        </div>
      </div>
    </section>
  );
};

export default Process;
