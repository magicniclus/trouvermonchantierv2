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
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl items-center justify-between p-6 lg:px-4 md:py-6 py-16 z-10">
        <div className="w-full md:w-8/12 md:px-4 md:max-w-[800px]">
          <h1 className="text-5xl text-white font-bold mb-7">
            Passez de <br />
            <span
              // style={{
              //   textDecoration: "underline",
              //   textDecorationColor: "#f59e0b",
              // }}
              className="text-yellow-500"
            >
              2000€
            </span>{" "}
            {""}à{" "}
            <span
              // style={{
              //   textDecoration: "underline",
              //   textDecorationColor: "#f59e0b",
              // }}
              className="text-yellow-500"
            >
              30 000€
            </span>{" "}
            <br />
            par mois.
          </h1>
          <h2 className="text-white mt-10 text-2xl">
            <span className=" font-semibold">
              {" "}
              Recevez jusqu&apos;à 10 demandes par jour toute l&apos;année. Sans
              plateforme, sans leads partagés, grâce à votre propre site livrés
              en 24h.
            </span>
          </h2>

          <ul className="text-white mt-7 space-y-4 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              Déjà utilisé par 12 000 artisans en France
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              Moins de 1€ par jour
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              Jusqu&apos;à 10 demandes par jour
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              Résiliable à tout moment
            </li>
          </ul>
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
                        <SelectTrigger className="mt-2 w-full">
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
                Générer mes clients !
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
