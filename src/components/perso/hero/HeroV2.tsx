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
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Afficher un toast de chargement
      toast({
        title: "Envoi en cours",
        description: "Nous traitons votre demande...",
      });

      console.log('Envoi des données du formulaire:', data);

      // Ajouter le lead à la base de données Firebase via l'API
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Réponse de l\'API leads:', leadResponse.status);
      const leadResult = await leadResponse.json();
      console.log('Résultat de l\'API leads:', leadResult);

      if (!leadResult.success) {
        throw new Error(leadResult.error || 'Erreur lors de l\'enregistrement du lead');
      }
      const uid = leadResult.leadId;
      console.log('Lead enregistré avec l\'ID:', uid);

      // Envoyer l'email de notification
      const emailSent = await sendProspectNotification({
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        metier: data.metier,
      });

      if (emailSent) {
        console.log("Email de notification envoyé avec succès");
      } else {
        console.warn("L'email de notification n'a pas pu être envoyé");
      }

      // Rediriger vers la page secteur avec les paramètres
      router.push(
        `/merci?uid=${uid}&email=${encodeURIComponent(
          data.email
        )}&metier=${encodeURIComponent(
          data.metier
        )}&telephone=${encodeURIComponent(
          data.phone
        )}&name=${encodeURIComponent(
          data.name
        )}&companyName=${encodeURIComponent(data.companyName)}`
      );
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du prospect.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="pricing"
      className="w-full relative flex items-center min-h-[680px] h-full"
    >
      <img
        src="/images/hero.png"
        alt="hero"
        className="w-full min-h-[650px] h-full object-cover absolute top-0 left-0 -z-10"
      />
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl items-center justify-between p-6 lg:px-4 md:py-20 py-16 z-10">
        <div className="w-full md:w-8/12 md:px-4 md:max-w-[800px]">
          <h1 className="text-5xl text-white font-bold mb-7 leading-tight">
            Recevez jusqu’à 5 nouveaux chantiers par jour – {" "}
            <span className="text-yellow-500">99€/mois</span>
          </h1>

          <h2 className="text-white mt-7 text-2xl font-semibold leading-snug">
            Nous créons votre site pro et lançons vos annonces Google locales
            en&nbsp;24 h. Aucun lead partagé, aucune commission&nbsp;: chaque appel
            client est pour&nbsp;vous, et vous arrêtez quand vous voulez.
          </h2>

          <ul className="text-white mt-7 space-y-6 text-lg">
            <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <div className="font-bold">Site pro personnalisé à votre métier</div>
                <div className="text-white/90 text-base">On vous crée un site performant</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div>
                <div className="font-bold">Publicité locale ciblée</div>
                <div className="text-white/90 text-base">Annonces Google Ads optimisées <b>400€ offert</b></div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white rounded-full p-2 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <div className="font-bold">Vous recevez des clients</div>
                <div className="text-white/90 text-base">Vous recevez des prospects qualifiés</div>
              </div>
            </li>
          </ul>
          
          <div className="mt-8 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className="h-5 w-5 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <Link href="/avis" className="ml-3 text-white underline transition-colors">
              Nos clients nous notent 4,8/5
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:px-4 md:mt-0 mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 md:p-12 md:bg-white/70 bg-white/80 rounded-md flex flex-col items-center shadow-lg w-full"
            >
              <h2 className="text-slate-700 font-semibold text-center">
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
                name="metier"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="mt-2 w-full bg-white">
                          <SelectValue placeholder="Sélectionnez votre métier" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {metiersBatiment.map((metier) => (
                            <SelectItem key={metier} value={metier}>
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
                Recevoir mes chantiers 
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
