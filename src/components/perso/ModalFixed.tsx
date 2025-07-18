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
          className="p-3 rounded-lg shadow-md flex h-[70px] items-center justify-center w-max bg-white"
          style={{ pointerEvents: "auto" }}
        >
          <div className="text-sm h-full flex flex-col justify-center mt-1">
            <p className="text-green-500">Appelez-nous !</p>
            <p className="text-slate-700 text-[9px]">
              Du lundi au samedi - 8h à 19h
            </p>
          </div>
          <div className="ml-3 h-full flex flex-col justify-center">
            <p className="text-slate-700 text-lg font-semibold">0972164963</p>
            <p className="text-slate-700 text-[9px]">
              Service gratuit + prix d'un appel
            </p>
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
