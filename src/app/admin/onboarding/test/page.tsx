"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowPathIcon, CheckCircleIcon, ClipboardIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function TestOnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(`test_${Date.now()}`);

  const generateTestOnboardingLink = async () => {
    if (!email) {
      setError("L'email est requis");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCopied(false);
    
    try {
      // Utiliser l'API de test au lieu de l'API Firestore
      const response = await fetch('/api/test-onboarding-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setOnboardingUrl(data.onboardingUrl);
    } catch (error) {
      setError('Une erreur est survenue lors de la génération du lien');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (onboardingUrl) {
      navigator.clipboard.writeText(onboardingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const openOnboardingLink = () => {
    if (onboardingUrl) {
      window.open(onboardingUrl, '_blank');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Retour
      </Button>
      
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Générateur de lien d'onboarding de test</h1>
        <p className="text-gray-600 mb-6">
          Créez un lien d'onboarding de test sans avoir à passer par le processus de paiement.
        </p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email de test</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@domaine.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userId">ID utilisateur (généré automatiquement)</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Vous pouvez modifier cet ID si nécessaire, mais il doit être unique.
            </p>
          </div>
          
          <Button
            onClick={generateTestOnboardingLink}
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Génération en cours...
              </div>
            ) : (
              'Générer un lien de test'
            )}
          </Button>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          {onboardingUrl && (
            <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Lien d'onboarding généré:</h3>
              <div className="flex gap-2">
                <Input
                  value={onboardingUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      Copié
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="h-4 w-4" />
                      Copier
                    </>
                  )}
                </Button>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={openOnboardingLink}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Ouvrir le lien
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Ce lien expire dans 7 jours et ne peut être utilisé qu'une seule fois.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
