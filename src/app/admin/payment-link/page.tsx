"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateSecurePassword } from "@/utils/passwordGenerator";

export default function AdminPaymentLink() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [metier, setMetier] = useState("");
  const [address, setAddress] = useState("");
  const [tier, setTier] = useState("tier-standard");
  const [frequency, setFrequency] = useState("mois");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Liste des métiers disponibles
  const metiers = [
    "Couvreur",
    "Électricien",
    "Plombier",
    "Maçon",
    "Peintre",
    "Menuisier",
    "Carreleur",
    "Plaquiste",
    "Chauffagiste",
    "Paysagiste",
    "Autre"
  ];

  // Prix de l'offre
  const pricing = {
    tiers: {
      "tier-standard": { mois: "99€", an: "899€" },
    },
    labels: {
      "tier-standard": "Standard",
    }
  };

  // Générer le lien de paiement
  const generateLink = () => {
    if (!email || !name || !companyName || !telephone || !metier || !address) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);

    // Construire l'URL avec tous les paramètres
    // Utiliser l'URL de base définie dans les variables d'environnement ou l'URL actuelle
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const paymentUrl = new URL(`${baseUrl}/admin/client-payment`);
    
    // Ajouter tous les paramètres
    paymentUrl.searchParams.append("email", email);
    paymentUrl.searchParams.append("name", name);
    paymentUrl.searchParams.append("companyName", companyName);
    paymentUrl.searchParams.append("telephone", telephone);
    paymentUrl.searchParams.append("metier", metier);
    paymentUrl.searchParams.append("address", address);
    paymentUrl.searchParams.append("tier", tier);
    paymentUrl.searchParams.append("frequency", frequency);
    
    // Ajouter un token unique pour sécuriser le lien
    const token = generateSecurePassword().substring(0, 8);
    paymentUrl.searchParams.append("token", token);
    
    setGeneratedLink(paymentUrl.toString());
    setLoading(false);
  };

  // Copier le lien dans le presse-papier
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Créer un lien de paiement client</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email du client*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom du client*
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise*
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Téléphone*
              </label>
              <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="metier" className="block text-sm font-medium text-gray-700">
                Métier*
              </label>
              <select
                id="metier"
                value={metier}
                onChange={(e) => setMetier(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="">Sélectionner un métier</option>
                {metiers.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Zone d'intervention*
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Ex: Paris et sa région"
                required
              />
            </div>
            
            <div>
              <label htmlFor="tier" className="block text-sm font-medium text-gray-700">
                Offre
              </label>
              <input
                type="text"
                id="tier"
                value={`${pricing.labels[tier as keyof typeof pricing.labels]} (${pricing.tiers[tier as keyof typeof pricing.tiers].mois}/mois ou ${pricing.tiers[tier as keyof typeof pricing.tiers].an}/an)`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-700 focus:outline-none"
                readOnly
              />
              <input type="hidden" name="tier" value={tier} />
            </div>
            
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                Fréquence
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="mois">Mensuel</option>
                <option value="an">Annuel</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={generateLink}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              {loading ? "Génération en cours..." : "Générer le lien de paiement"}
            </button>
          </div>
          
          {generatedLink && (
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Lien de paiement généré</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 bg-white text-gray-500"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Envoyez ce lien au client pour qu'il puisse effectuer son paiement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
