"use client";
import { useEffect, useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";

const ModalFixed = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        // Vous pouvez ajuster la valeur selon vos besoins
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Version desktop */}
      <div
        className={`w-full mx-auto max-w-6xl hidden md:flex ${
          isFixed ? "fixed top-12" : "absolute top-1"
        } left-1/2 transform -translate-x-1/2 justify-end px-6 z-50`}
        style={{ pointerEvents: "none" }}
      >
        <a
          href="tel:0972164963"
          className="p-4 rounded-xl shadow-lg hover:shadow-xl flex h-[75px] items-center justify-center w-max bg-white border border-gray-100 transition-all duration-300 hover:scale-105"
          style={{ pointerEvents: "auto" }}
        >
          <div className="bg-yellow-500 rounded-full p-3 mr-3 flex items-center justify-center">
            <PhoneIcon className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-blue-600 font-bold text-base">Appelez-nous !</p>
              <span className="ml-2 bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-medium">Gratuit</span>
            </div>
            <p className="text-slate-700 text-[10px]">
              Du lundi au samedi - 8h à 19h
            </p>
            <p className="text-slate-800 text-lg font-bold">09 72 16 49 63</p>
          </div>
        </a>
      </div>

      {/* Version mobile - bouton d'appel flottant */}
      <div className="md:hidden fixed bottom-[90px] right-[20px] z-50">
        <a
          href="tel:0972164963"
          className="flex items-center justify-center w-[57px] h-[57px] bg-yellow-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Appeler le 0972164963"
        >
          <PhoneIcon className="h-[25px] w-[25px] text-white" />
        </a>
      </div>
    </>
  );
};

export default ModalFixed;
