"use client";

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface OnboardingData {
  companyName: string;
  email: string;
  phone: string;
  siret: string;
  description: string;
  services: string[];
  certifications: string[];
  distinction: string;
  otherCertifications?: string;
  onboardingDate: Date;
}

export default function OnboardingDetailPage({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const userRef = doc(db, 'users', params.userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          setError('Utilisateur non trouvé');
          setLoading(false);
          return;
        }
        
        const userData = userDoc.data();
        
        if (!userData.onboardingCompleted) {
          setError("Cet utilisateur n'a pas encore complété son onboarding");
          setLoading(false);
          return;
        }
        
        setOnboardingData({
          companyName: userData.companyName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          siret: userData.siret || '',
          description: userData.description || '',
          services: userData.services || [],
          certifications: userData.certifications || [],
          distinction: userData.distinction || '',
          otherCertifications: userData.otherCertifications || '',
          onboardingDate: userData.onboardingDate?.toDate() || new Date(),
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Une erreur est survenue lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOnboardingData();
  }, [params.userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Retour
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Détails de l'onboarding</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>
      ) : onboardingData ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">{onboardingData.companyName}</h2>
                <p className="text-gray-600">{onboardingData.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Onboarding complété le: {onboardingData.onboardingDate.toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  SIRET: {onboardingData.siret}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Coordonnées</h3>
                  <p><strong>Téléphone:</strong> {onboardingData.phone}</p>
                  <p><strong>Email:</strong> {onboardingData.email}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Services proposés</h3>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Certifications</h3>
                  {onboardingData.certifications.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.certifications.map((certification, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {certification}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune certification</p>
                  )}
                  
                  {onboardingData.otherCertifications && (
                    <p className="mt-2 text-sm">
                      <strong>Autres certifications:</strong> {onboardingData.otherCertifications}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description de l'entreprise</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-wrap">{onboardingData.description}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Éléments distinctifs</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-wrap">{onboardingData.distinction}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t">
              <Button 
                onClick={() => {
                  // Rediriger vers la page de création du site
                  router.push(`/admin/sites/create?userId=${params.userId}`);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Créer le site web
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
