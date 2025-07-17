"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

// Composants UI
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

// Schéma de validation
const onboardingSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  siret: z.string().min(14, "Numéro SIRET invalide").max(14, "Numéro SIRET invalide"),
  description: z.string().min(10, "Description trop courte"),
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
  certifications: z.array(z.string()).optional(),
  distinction: z.string().min(10, "Description trop courte"),
  otherCertifications: z.string().optional(),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const serviceOptions = [
  "Plomberie",
  "Électricité",
  "Maçonnerie",
  "Peinture",
  "Menuiserie",
  "Carrelage",
  "Isolation",
  "Toiture",
  "Chauffage",
  "Climatisation",
  "Rénovation complète",
  "Autre"
];

const certificationOptions = [
  "RGE",
  "Qualibat",
  "Qualifelec",
  "Qualit'EnR",
  "Handibat",
  "Autre"
];

export default function OnboardingPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState<{[key: string]: boolean}>({});
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      services: [],
      certifications: [],
    }
  });

  const description = watch('description');
  const distinction = watch('distinction');

  // Vérifier la validité du token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/verify-onboarding-token?token=${params.token}`);
        const data = await response.json();
        setTokenValid(data.valid);
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [params.token]);

  // Gérer les services sélectionnés
  const toggleService = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
    
    // Mettre à jour le champ dans le formulaire
    const updatedServices = selectedServices.includes(service) 
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    
    setValue('services', updatedServices);
  };

  // Gérer les certifications sélectionnées
  const toggleCertification = (certification: string) => {
    setSelectedCertifications(prev => {
      if (prev.includes(certification)) {
        return prev.filter(c => c !== certification);
      } else {
        return [...prev, certification];
      }
    });
    
    // Mettre à jour le champ dans le formulaire
    const updatedCertifications = selectedCertifications.includes(certification) 
      ? selectedCertifications.filter(c => c !== certification)
      : [...selectedCertifications, certification];
    
    setValue('certifications', updatedCertifications);
  };

  // Améliorer le texte avec l'IA
  const improveText = async (field: string) => {
    setIsImproving({...isImproving, [field]: true});
    
    try {
      const text = field === 'description' ? description : distinction;
      const type = field;
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, type }),
      });
      
      const data = await response.json();
      
      if (data.improvedText) {
        setValue(field as any, data.improvedText);
      }
    } catch (error) {
      console.error("Erreur lors de l'amélioration du texte:", error);
    } finally {
      setIsImproving({...isImproving, [field]: false});
    }
  };

  // Soumettre le formulaire
  const onSubmit = async (data: OnboardingFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/save-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          token: params.token
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Rediriger vers une page de confirmation
        router.push('/onboarding/success');
      } else {
        throw new Error(result.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // Gérer l'erreur (afficher un message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un message d'erreur si le token est invalide
  if (tokenValid === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lien invalide ou expiré</h1>
          <p className="text-gray-600 mb-6">
            Le lien que vous avez utilisé n'est plus valide ou a expiré. 
            Veuillez contacter notre équipe pour obtenir un nouveau lien.
          </p>
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

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Configurons votre site web</h1>
          <p className="text-slate-600 mt-2">
            Remplissez ce formulaire pour nous aider à créer un site qui correspond parfaitement à votre entreprise
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Informations de base */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Informations de base</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Nom de votre entreprise *</Label>
                <Input 
                  id="companyName" 
                  {...register('companyName')} 
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email de contact *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register('email')} 
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Numéro de téléphone *</Label>
                <Input 
                  id="phone" 
                  {...register('phone')} 
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="siret">Numéro SIRET *</Label>
                <Input 
                  id="siret" 
                  {...register('siret')} 
                  className={errors.siret ? "border-red-500" : ""}
                />
                {errors.siret && (
                  <p className="text-red-500 text-sm mt-1">{errors.siret.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description de l'entreprise */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Description de votre entreprise *</h2>
            
            <div className="relative">
              <Textarea 
                id="description" 
                {...register('description')} 
                className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
                placeholder="Décrivez votre entreprise, son histoire, ses valeurs..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
              
              <div className="mt-2 flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => improveText('description')}
                  disabled={!description || description.length < 10 || isImproving.description}
                  className="flex items-center gap-2"
                >
                  {isImproving.description ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      Amélioration en cours...
                    </>
                  ) : (
                    <>
                      <span className="text-xs">✨</span> Améliorer avec l'IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Services proposés */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Services proposés *</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`service-${service}`} 
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => toggleService(service)}
                  />
                  <Label htmlFor={`service-${service}`} className="cursor-pointer">{service}</Label>
                </div>
              ))}
            </div>
            {errors.services && (
              <p className="text-red-500 text-sm mt-1">{errors.services.message}</p>
            )}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Certifications</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certificationOptions.map((certification) => (
                <div key={certification} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`certification-${certification}`} 
                    checked={selectedCertifications.includes(certification)}
                    onCheckedChange={() => toggleCertification(certification)}
                  />
                  <Label htmlFor={`certification-${certification}`} className="cursor-pointer">{certification}</Label>
                </div>
              ))}
            </div>
            
            {selectedCertifications.includes('Autre') && (
              <div className="mt-4">
                <Label htmlFor="otherCertifications">Précisez vos autres certifications</Label>
                <Input id="otherCertifications" {...register('otherCertifications')} />
              </div>
            )}
          </div>

          {/* Éléments distinctifs */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Ce qui vous distingue *</h2>
            
            <div className="relative">
              <Textarea 
                id="distinction" 
                {...register('distinction')} 
                className={`min-h-[150px] ${errors.distinction ? "border-red-500" : ""}`}
                placeholder="Qu'est-ce qui rend votre entreprise unique ? Quels sont vos points forts ?"
              />
              {errors.distinction && (
                <p className="text-red-500 text-sm mt-1">{errors.distinction.message}</p>
              )}
              
              <div className="mt-2 flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => improveText('distinction')}
                  disabled={!distinction || distinction.length < 10 || isImproving.distinction}
                  className="flex items-center gap-2"
                >
                  {isImproving.distinction ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      Amélioration en cours...
                    </>
                  ) : (
                    <>
                      <span className="text-xs">✨</span> Améliorer avec l'IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-6 border-t">
            <Button 
              type="submit" 
              className="w-full py-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Traitement en cours...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="h-5 w-5" />
                  Finaliser la configuration
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
