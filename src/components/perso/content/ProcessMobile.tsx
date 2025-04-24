"use client";

import React from "react";
import { FlagIcon } from "@heroicons/react/20/solid";

const ProcessMobile: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 md:hidden">
      {/* Carte 1 */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative border border-gray-100">
        <div className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-yellow-500 flex justify-center items-center text-lg text-white font-semibold">
          1
        </div>
        <h2 className="font-bold text-xl text-slate-700 mt-2">
          {"Vous recevez des demandes de devis"}
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          {"Les demandes sont générées automatiquement depuis votre site, via des campagnes Google Ads optimisées pour vous."}
        </p>
      </div>

      {/* Carte 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative border border-gray-100">
        <div className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-yellow-500 flex justify-center items-center text-lg text-white font-semibold">
          2
        </div>
        <h2 className="font-bold text-xl text-slate-700 mt-2">
          {"Vous effectuez et validez le devis"}
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          {"Les prospects vous contactent directement. Aucune plateforme, aucune mise en concurrence : le client, c'est le vôtre."}
        </p>
      </div>

      {/* Carte 3 */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative border border-gray-100">
        <div className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-yellow-500 flex justify-center items-center text-lg text-white font-semibold">
          3
        </div>
        <h2 className="font-bold text-xl text-slate-700 mt-2">
          {"Vous réalisez le chantier"}
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          {"Sans commission, sans intermédiaire."} <br />
          {"Juste vous, et le résultat d'un système qui travaille pour vous."}
        </p>
      </div>

      {/* Carte Final */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative border border-gray-100">
        <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-white border-2 border-yellow-500 flex justify-center items-center">
          <FlagIcon className="w-6 h-6 text-yellow-500" />
        </div>
        <h2 className="font-bold text-xl text-slate-700 mt-2">
          {"Final"}
        </h2>
        <p className="mt-2 text-slate-600 text-sm">
          {"Vous encaissez."} <br />
          {"Simple, efficace, direct."} <br />
          {"C'est vous qui avez la main."}
        </p>
      </div>
    </div>
  );
};

export default ProcessMobile;
