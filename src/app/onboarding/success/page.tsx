"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';

export default function OnboardingSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Configuration terminée !</h1>
        
        <p className="text-gray-600 mb-6">
          Merci d'avoir complété le formulaire de configuration. Notre équipe va maintenant
          créer votre site web en utilisant les informations que vous avez fournies.
        </p>
        
        <p className="text-gray-600 mb-6">
          Vous recevrez un email dès que votre site sera prêt à être consulté.
        </p>
        
        <Button 
          onClick={() => router.push('/')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
