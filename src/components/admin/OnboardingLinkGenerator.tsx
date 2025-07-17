"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowPathIcon, CheckCircleIcon, ClipboardIcon } from '@heroicons/react/24/solid';

interface OnboardingLinkGeneratorProps {
  userId: string;
  email: string;
}

export default function OnboardingLinkGenerator({ userId, email }: OnboardingLinkGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateOnboardingLink = async () => {
    setIsLoading(true);
    setError(null);
    setCopied(false);
    
    try {
      const response = await fetch('/api/generate-onboarding-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Lien d'onboarding</h3>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Générez un lien d'onboarding pour ce client. Ce lien sera valide pendant 7 jours.
        </p>
        
        <Button
          onClick={generateOnboardingLink}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Génération en cours...
            </div>
          ) : (
            'Générer un lien d&apos;onboarding'
          )}
        </Button>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        
        {onboardingUrl && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="onboarding-link">Lien d'onboarding généré:</Label>
            <div className="flex gap-2">
              <Input
                id="onboarding-link"
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
            <p className="text-xs text-gray-500">
              Ce lien expire dans 7 jours et ne peut être utilisé qu'une seule fois.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
