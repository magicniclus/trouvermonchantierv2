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
import { motion } from "framer-motion";
import { MapPin, Users, Shield, TrendingUp } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { addProspect } from "@/firebase/database";
import { sendProspectNotification } from "@/utils/sendgrid";

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

const HeroNetwork = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      metier: '',
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Afficher un toast de chargement
      toast({
        title: "Envoi en cours",
        description: "Nous traitons votre demande...",
      });

      console.log('🔥 [HeroNetwork] Envoi des données du formulaire:', data);

      // Créer l'objet de données pour Firebase (collection prospects)
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
        "Commentaire": "Prospect depuis formulaire Hero Network - Devenir Partenaire"
      };
      
      console.log('🔥 [HeroNetwork] Données à envoyer à Firebase:', JSON.stringify(prospectData, null, 2));
      
      let success = false;
      
      // Envoyer les données à Firebase dans la collection prospects
      try {
        console.log('🔥 [HeroNetwork] Tentative d\'envoi à Firebase...');
        const prospectId = await addProspect(prospectData);
        console.log('🔥 [HeroNetwork] Prospect créé avec succès dans Firebase avec l\'ID:', prospectId);
        success = true;
      } catch (error) {
        console.error('🔥 [HeroNetwork] Erreur lors de l\'envoi à Firebase:', error);
      }
      
      // Envoyer l'email de notification si Firebase a réussi
      if (success) {
        try {
          console.log('🔥 [HeroNetwork] Envoi de l\'email de notification...');
          const emailSent = await sendProspectNotification({
            name: data.name,
            companyName: data.companyName,
            email: data.email,
            phone: data.phone,
            metier: data.metier,
            postalCode: data.postalCode,
          });

          if (emailSent) {
            console.log('🔥 [HeroNetwork] Email de notification envoyé avec succès');
          } else {
            console.warn('🔥 [HeroNetwork] L\'email de notification n\'a pas pu être envoyé');
          }
        } catch (emailError) {
          console.error('🔥 [HeroNetwork] Erreur lors de l\'envoi de l\'email:', emailError);
          // Ne pas faire échouer le processus si l'email échoue
        }
      }
      
      // Afficher le toast approprié en fonction du résultat
      if (success) {
        toast({
          title: "Succès",
          description: "Votre candidature a été envoyée avec succès.",
        });
        
        // Redirection vers la page de remerciement
        const queryParams = new URLSearchParams({
          email: data.email,
          metier: data.metier,
          telephone: data.phone,
          name: data.name,
          companyName: data.companyName,
          postalCode: data.postalCode
        });
        
        router.push(`/merci?${queryParams.toString()}`);
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("🔥 [HeroNetwork] Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section className="w-full bg-white relative overflow-hidden">
        {/* Image de fond floutée */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero3.png" 
            alt="" 
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Content Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 border border-blue-200 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Réseau d'artisans exclusif
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Rejoignez le réseau{" "}
                  <span className="text-blue-600">Trouver Mon Chantier</span>
                </h1>
                
                <p className="text-2xl text-slate-700 font-medium">
                  Jusqu'à 30 demandes de chantier par mois
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Bénéficiez de demandes via notre réseau de sites et nos services marketing complets pour développer votre activité.
              </motion.p>

              {/* Features */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      SEO - Positionnement local
                    </h3>
                    <p className="text-slate-600">
                      Positionnement local de votre entreprise par nos experts SEO
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      SEA - Google Ads
                    </h3>
                    <p className="text-slate-600">
                      Boostez la demande de clients grâce à Google Ads optimisé
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mt-1">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Site internet professionnel
                    </h3>
                    <p className="text-slate-600">
                      Site internet pro avec certification Trouver-Mon-Chantier Partenaire
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mt-1">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Réseau de sites partenaires
                    </h3>
                    <p className="text-slate-600">
                      Bénéficiez de demandes via notre réseau de sites spécialisés
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              variants={mapVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white border border-gray-200 p-8 space-y-6"
 id="hero"
                >
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className="h-5 w-5 text-yellow-400 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Link href="#avis" className="text-slate-600 text-sm underline transition-colors">
                      Nos partenaires nous notent 4,8/5
                    </Link>
                    <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-3">
                      Rejoignez notre réseau exclusif
                    </h3>
                    <p className="text-slate-600 text-lg">
                      Candidatez dès maintenant pour votre secteur
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nom, prénom"
                            {...field}
                            className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nom de votre entreprise"
                            {...field}
                            className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            {...field}
                            className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Téléphone"
                            {...field}
                            className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Code postal"
                            {...field}
                            className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value || ''}
                          >
                            <SelectTrigger className="w-full h-12 bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500">
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

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      {...form.register("acceptTerms")}
                      required
                      className="mt-1"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-slate-600">
                      J&apos;accepte les{" "}
                      <a href="/CGV" className="underline text-blue-600 hover:text-blue-700">
                        conditions générales de vente
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 text-lg h-14 transition-colors duration-200"
                  >
                    Candidater pour votre secteur
                  </Button>

                  <p className="text-sm text-slate-500 text-center pt-2">
                    Inscription gratuite • Validation sous 48h
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Bande colorée de séparation */}
      <div className="w-full h-2 bg-blue-600"></div>
    </>
  );
};

export default HeroNetwork;
