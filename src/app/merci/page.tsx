"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, HomeIcon } from "@heroicons/react/24/outline";
import Nav from "@/components/tailwindui/nav/Nav";

const MerciPage = () => {
  // Track page view for analytics
  useEffect(() => {
    // You could add analytics tracking here if needed
  }, []);

  return (
    <>
      <Nav withMenu={false} />
      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-7 md:px-0 pt-16 pb-20 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Merci pour votre rendez-vous !
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Votre demande de rendez-vous a bien été prise en compte. Vous allez recevoir un email de confirmation dans quelques instants.
          </p>
          
          {/* Confirmation Details */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6">
              Prochaines étapes
            </h2>
            
            <div className="flex items-start gap-4 text-left mb-6">
              <div className="mt-1">
                <CalendarIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-lg">Vérifiez votre calendrier</h3>
                <p className="text-slate-600">
                  Un événement a été ajouté à votre calendrier avec tous les détails du rendez-vous.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left">
              <div className="mt-1">
                <CheckCircleIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-lg">Préparez vos questions</h3>
                <p className="text-slate-600">
                  Nous sommes impatients de discuter de vos besoins et de vous présenter notre solution pour développer votre activité.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link href="/" className="inline-block">
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
              <HomeIcon className="w-5 h-5" />
              Retour à l&apos;accueil
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default MerciPage;
