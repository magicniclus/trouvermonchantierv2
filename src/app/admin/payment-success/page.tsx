"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Trouver Mon Chantier" 
            width={200} 
            height={50} 
            className="h-12 w-auto"
          />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg 
                className="h-6 w-6 text-green-600" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h2 className="mt-3 text-lg font-medium text-gray-900">
              Paiement réussi
            </h2>
            
            <p className="mt-2 text-sm text-gray-600">
              Merci pour votre paiement. Votre espace client a été créé avec succès.
            </p>
            
            {email && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  Un email contenant vos identifiants de connexion a été envoyé à :
                </p>
                <p className="mt-1 font-medium text-gray-900">{email}</p>
              </div>
            )}
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Vous serez redirigé vers la page de connexion dans {countdown} secondes.
              </p>
              
              <div className="mt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Accéder à mon espace client
                </Link>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-xs text-gray-500">
                Si vous avez des questions ou besoin d'aide, n'hésitez pas à contacter notre équipe support à{" "}
                <a href="mailto:support@trouver-mon-chantier.fr" className="text-yellow-600 hover:text-yellow-500">
                  support@trouver-mon-chantier.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
