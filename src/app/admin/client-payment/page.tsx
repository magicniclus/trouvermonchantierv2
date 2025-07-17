"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import ClientPaymentForm from "@/components/admin/ClientPaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const pricing = {
  tiers: {
    "tier-standard": { mois: "99€", an: "899€" },
  },
  features: {
    "tier-standard": [
      "5 demandes de devis par mois",
      "Page Web dédiée avec nom de domaine personnalisé",
      "Sans engagement",
      "Service support Premium 6j/7",
    ],
  },
  labels: {
    "tier-standard": "Standard",
  },
};

// Composant qui utilise useSearchParams
function ClientPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [clientData, setClientData] = useState({
    email: "",
    name: "",
    companyName: "",
    telephone: "",
    metier: "",
    address: "",
    tier: "tier-starter",
    frequency: "mois",
    token: "",
  });
  
  const [price, setPrice] = useState<number | null>(null);
  const [mainFeatures, setMainFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupérer tous les paramètres de l'URL
    const email = searchParams?.get("email") || "";
    const name = searchParams?.get("name") || "";
    const companyName = searchParams?.get("companyName") || "";
    const telephone = searchParams?.get("telephone") || "";
    const metier = searchParams?.get("metier") || "";
    const address = searchParams?.get("address") || "";
    const tier = searchParams?.get("tier") as keyof typeof pricing.tiers || "tier-standard";
    const frequency = searchParams?.get("frequency") as "mois" | "an" || "mois";
    const token = searchParams?.get("token") || "";

    // Vérifier que tous les paramètres nécessaires sont présents
    if (!email || !name || !companyName || !telephone || !metier || !address || !token) {
      setError("Lien de paiement invalide ou incomplet");
      setLoading(false);
      return;
    }

    // Mettre à jour les données client
    setClientData({
      email,
      name,
      companyName,
      telephone,
      metier,
      address,
      tier,
      frequency,
      token,
    });

    // Calculer le prix et les fonctionnalités
    if (tier && frequency) {
      setMainFeatures(pricing.features[tier]);
      const selectedPriceString = pricing.tiers[tier][frequency];
      const selectedPrice = parseFloat(selectedPriceString.replace("€", ""));
      setPrice(selectedPrice);
    }

    setLoading(false);
  }, [searchParams]);

  // Calculer les montants
  const VAT_RATE = 0.2;
  const subtotal = price ? price / (1 + VAT_RATE) : 0;
  const VAT = price ? price - subtotal : 0;
  const total = price || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-red-500 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo.png" 
            alt="Trouver Mon Chantier" 
            width={200} 
            height={50} 
            className="h-10 w-auto"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Récapitulatif de la commande */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Récapitulatif de la commande
              </h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Informations client</h3>
                <p className="text-sm text-gray-600">{clientData.name}</p>
                <p className="text-sm text-gray-600">{clientData.companyName}</p>
                <p className="text-sm text-gray-600">{clientData.email}</p>
                <p className="text-sm text-gray-600">{clientData.telephone}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Votre offre</h3>
                <p className="text-sm font-medium text-gray-900">
                  {pricing.labels[clientData.tier as keyof typeof pricing.labels]} - {clientData.frequency === "mois" ? "Mensuel" : "Annuel"}
                </p>
                <p className="text-sm text-gray-600 mt-1">Métier : {clientData.metier}</p>
                <p className="text-sm text-gray-600">Zone : {clientData.address}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Services inclus</h3>
                <ul className="space-y-2">
                  {mainFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-yellow-500 mr-2"
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
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-600">Sous-total</span>
                  <span className="text-sm font-medium text-gray-900">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-600">TVA (20%)</span>
                  <span className="text-sm font-medium text-gray-900">{VAT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span className="text-base text-gray-900">Total</span>
                  <span className="text-base text-gray-900">{total.toFixed(2)}€</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {clientData.frequency === "mois" 
                    ? "Facturation mensuelle. Vous pouvez annuler à tout moment."
                    : "Facturation annuelle. Vous pouvez annuler à tout moment."}
                </p>
              </div>
            </div>
            
            {/* Formulaire de paiement */}
            <div className="w-full lg:w-2/3 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Informations de paiement
              </h2>
              
              {price && (
                <Elements stripe={stripePromise}>
                  <ClientPaymentForm 
                    clientData={clientData}
                    price={total}
                  />
                </Elements>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Vos informations de paiement sont sécurisées. Nous ne stockons pas vos données de carte bancaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant de chargement pour Suspense
function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Chargement du formulaire de paiement...</p>
        </div>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function ClientPayment() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientPaymentContent />
    </Suspense>
  );
}
