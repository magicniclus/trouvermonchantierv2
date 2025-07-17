"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Composant qui utilise useSearchParams
function OnboardingAltContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams?.get('token') || null;

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError('Token manquant dans l\'URL');
      return;
    }

    const verifyToken = async () => {
      try {
        // Essayer d'abord l'API de débogage
        const debugResponse = await fetch(`/api/debug-token?token=${token}`);
        const debugData = await debugResponse.json();
        console.log('Debug data:', debugData);

        // Vérifier le token
        const response = await fetch(`/api/verify-onboarding-token?token=${token}`);
        const data = await response.json();
        
        console.log('Token verification response:', data);
        
        setTokenValid(data.valid);
        setTokenData(data);
        
        if (!data.valid) {
          setError(data.error || 'Token invalide');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setTokenValid(false);
        setError('Erreur technique lors de la vérification du token');
      }
    };

    verifyToken();
  }, [token]);

  // Afficher un message d'erreur si le token est invalide
  if (tokenValid === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lien invalide ou expiré</h1>
          <p className="text-gray-600 mb-6">
            {error || "Le lien que vous avez utilisé n'est plus valide ou a expiré."}
          </p>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Détails techniques (debug):</p>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40 text-left">
              Token: {token || 'Non fourni'}<br />
              Données: {JSON.stringify(tokenData, null, 2)}
            </pre>
          </div>
          <Button onClick={() => router.push('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  // Afficher un loader pendant la vérification du token
  if (tokenValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Si le token est valide, afficher un message de succès
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Token valide !</h1>
        <p className="text-gray-600 mb-6">
          Votre token est valide. Vous pouvez maintenant accéder à l'onboarding.
        </p>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Détails techniques (debug):</p>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40 text-left">
            {JSON.stringify(tokenData, null, 2)}
          </pre>
        </div>
        <Button onClick={() => router.push(`/onboarding/${token}`)}>
          Accéder à l'onboarding
        </Button>
      </div>
    </div>
  );
}

// Composant de chargement pour Suspense
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );
}

// Composant principal avec Suspense
export default function OnboardingAltPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OnboardingAltContent />
    </Suspense>
  );
}
