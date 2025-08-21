/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { sendProspectNotification } from "@/utils/sendgrid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { addProspect } from "@/firebase/database";

const metiersBatiment = [
  "Architecte",
  "Architecte d'intérieur",
  "Ascensoriste",
  "Bricoleur",
  "Carreleur",
  "Chauffagiste",
  "Couvreur - Charpentier",
  "Cuisiniste",
  "Décorateur - Architecte d'intérieur",
  "Déménageur",
  "Diagnostiqueur (immobilier, traitement, bureau d'études)",
  "Ébéniste",
  "Électricien",
  "Entreprise de nettoyage",
  "Entreprise de rénovation",
  "Entreprise de revêtement de sol",
  "Entrepreneur du bâtiment",
  "Étancheur - Entreprise d'isolation",
  "Façadier",
  "Ferronnier - Métallier - Zingueur",
  "Frigoriste",
  "Fumiste",
  "Jardinier - Paysagiste",
  "Maçon",
  "Marbrier - Tailleur de pierre",
  "Menuisier",
  "Peintre",
  "Pisciniste",
  "Plaquiste",
  "Plombier",
  "Professionnel de la sécurité - Services aux entreprises",
  "Professionnel du traitement des nuisibles",
  "Serrurier",
  "Terrassier",
  "Vitrerie - Miroitier",
  "Autre"
];

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Veuillez entrer votre nom.")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Le nom ne doit contenir que des lettres et des espaces."
    ),
  companyName: z
    .string()
    .min(1, "Veuillez entrer le nom de votre entreprise.")
    .regex(
      /^[a-zA-Z0-9\s\-\.\&]+$/,
      "Le nom de l'entreprise ne doit contenir que des caractères valides."
    ),
  email: z
    .string({
      required_error: "Veuillez entrer un email.",
    })
    .email("Veuillez entrer un email valide."),
  phone: z
    .string()
    .min(10, "Veuillez entrer un numéro de téléphone valide.")
    .max(15, "Le numéro de téléphone ne doit pas dépasser 15 caractères.")
    .regex(
      /^[0-9\s\-\+\(\)]+$/,
      "Le numéro de téléphone ne doit contenir que des chiffres et des caractères spéciaux autorisés."
    ),
  postalCode: z
    .string()
    .min(5, "Veuillez entrer un code postal valide.")
    .max(5, "Le code postal doit contenir 5 chiffres.")
    .regex(/^[0-9]+$/, "Le code postal ne doit contenir que des chiffres."),
  metier: z.string().min(1, "Veuillez sélectionner un métier."),
  acceptTerms: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter les conditions générales.",
    }),
  }),
});

const Hero = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      metier: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Afficher un toast de chargement
      toast({
        title: "Envoi en cours",
        description: "Nous traitons votre demande...",
      });

      console.log('Envoi des données du formulaire:', data);

      // Créer l'objet de données pour Firebase
      const nameParts = data.name.split(' ');
      const prospectData = {
        "Nom": nameParts.slice(1).join(' ') || nameParts[0],
        "Prenom": nameParts[0],
        "Email": data.email,
        "Téléphone": data.phone,
        "Entreprise": data.companyName,
        "Metier": data.metier,
        "Code postal": data.postalCode,
        "Etape": "A contacter",
        "Date": new Date(),
        "RGPD": true,
        "Commentaire": "Prospect depuis formulaire Hero V2"
      };
      
      console.log('Données à envoyer à Firebase:', JSON.stringify(prospectData, null, 2));
      
      let success = false;
      
      // Test de connexion Firebase
      console.log('🔥 [HeroV2] Test de connexion Firebase...');
      
      // Envoyer les données à Firebase
      try {
        console.log('🔥 [HeroV2] Tentative d\'envoi à Firebase...');
        console.log('🔥 [HeroV2] Configuration Firebase disponible:', typeof window !== 'undefined' ? 'Client' : 'Server');
        console.log('🔥 [HeroV2] Données à envoyer:', prospectData);
        
        const prospectId = await addProspect(prospectData);
        console.log('🔥 [HeroV2] Prospect créé avec succès dans Firebase avec l\'ID:', prospectId);
        console.log('🔥 [HeroV2] Chemin Firebase:', `prospects/${new Date().toISOString().split('T')[0]}/${prospectId}`);
        success = true;
      } catch (error) {
        console.error('🔥 [HeroV2] Erreur détaillée lors de l\'envoi à Firebase:', error);
        console.error('🔥 [HeroV2] Type d\'erreur:', typeof error);
        console.error('🔥 [HeroV2] Message d\'erreur:', error instanceof Error ? error.message : error);
        console.error('🔥 [HeroV2] Stack trace:', error instanceof Error ? error.stack : 'No stack');
      }
      
      // Afficher le toast approprié en fonction du résultat
      if (success) {
        toast({
          title: "Succès",
          description: "Votre demande a été envoyée avec succès.",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'enregistrement de vos données. Veuillez réessayer.",
          variant: "destructive",
        });
        return; // Ne pas rediriger en cas d'erreur
      }

      // Rediriger vers la page de remerciement après l'envoi réussi
      const queryParams = new URLSearchParams({
        email: data.email,
        metier: data.metier,
        telephone: data.phone,
        name: data.name,
        companyName: data.companyName,
        postalCode: data.postalCode
      });
      
      router.push(`/merci?${queryParams.toString()}`);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      className="w-full relative flex items-center min-h-[680px] h-full"
    >
      <img
        src="/images/hero.png"
        alt="hero"
        className="w-full min-h-[650px] h-full object-cover absolute top-0 left-0 -z-10"
      />
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-6xl items-center justify-between p-6 lg:px-4 md:py-20 py-16 z-10">
        <div className="w-full md:w-8/12 md:px-4 md:max-w-[800px]">
          <h1 className="md:text-6xl text-5xl text-white font-bold mb-7 leading-tight">
          Recevez jusqu’à <span className="text-yellow-500">10 chantiers par mois </span>grâce à Google Ads
          </h1>

          <h2 className="text-white mt-7 text-2xl font-semibold leading-snug">
          Votre site et vos campagnes Google Ads sont prêts en 24h. Les appels démarrent immédiatement.
          </h2>

          <ul className="text-white mt-7 space-y-6 text-lg">
          <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-yellow-500 rounded-full p-2 w-10 h-10">
               <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">Déjà utilisé par 12 000 artisans en France</div>
                <div className="text-white/90 text-base">Testé et approuvé partout en France. Résiliable à tout moment.</div>
              </div>
            </li>
            {/* <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-yellow-500 rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <div className="font-bold">Un site pro livré en 24h</div>
                <div className="text-white/90 text-base">Conçu pour vous, optimisé pour apparaître tout en haut sur Google.</div>
              </div>
            </li> */}
            <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-yellow-500 rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div>
                <div className="font-bold">Vous apparaissez en 1er sur Google</div>
                <div className="text-white/90 text-base">Campagne Google Ads locale incluse. 400€ de budget offert pour démarrer.</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-yellow-500 rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <div className="font-bold">Des clients vous contactent directement</div>
                <div className="text-white/90 text-base">Pas de plateforme. Pas d’intermédiaire. Vous êtes seul à recevoir les demandes.</div>
              </div>
            </li>
          </ul>
          
          
        </div>
        <div className="w-full md:w-1/2 md:px-4 md:mt-0 mt-10" id="pricing">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 md:p-12 md:bg-white/70 bg-white/80 rounded-md flex flex-col items-center shadow-lg w-full"
            >
              <div className="flex items-center flex-col">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Link href="#avis" className="ml-3 text-slate-600 text-xs underline transition-colors">
                  Nos clients nous notent 4,8/5
                </Link>
              </div>
              <h2 className="text-slate-700 font-semibold text-center mt-4">
                Vous êtes professionnel du bâtiment et vous recherchez de
                nouveaux chantiers ?
              </h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full mt-7">
                    <FormControl className="w-full">
                      <Input
                        type="text"
                        placeholder="Nom, prénom"
                        {...field}
                        className="mt-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        type="text"
                        placeholder="Nom de votre entreprise"
                        {...field}
                        className="mt-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="mt-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        type="text"
                        placeholder="Téléphone"
                        {...field}
                        className="mt-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        type="text"
                        placeholder="Code postal"
                        {...field}
                        className="mt-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metier"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log('Métier sélectionné:', value);
                        }}
                        value={field.value || ''}
                      >
                        <SelectTrigger className="mt-2 w-full bg-white border-gray-300 text-gray-900 focus:border-gray-500 focus:ring-gray-500">
                          <SelectValue placeholder="Sélectionnez votre métier" />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-white border-gray-300">
                          {metiersBatiment.map((metier) => (
                            <SelectItem 
                              key={metier} 
                              value={metier}
                              className="text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
                            >
                              {metier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-slate-500 mt-3 w-full flex itels-start">
                <input
                  type="checkbox"
                  {...form.register("acceptTerms")}
                  required
                />
                <label htmlFor="acceptTerms" className="text-xs ml-2">
                  J&apos;accepte les{" "}
                  <a href="/CGV" className="underline">
                    conditions générales de vente
                  </a>
                </label>
              </div>
              <Button
                type="submit"
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl py-6 rounded-xl"
              >
                Oui, je veux recevoir des chantiers
              </Button>

              <p className="text-xs text-slate-500 mt-2">Sans engagement. Début immédiat.</p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
