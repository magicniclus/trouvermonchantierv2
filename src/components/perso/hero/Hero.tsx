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
import { addProspect } from "@/firebase/database"; // Assurez-vous que le chemin est correct
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const metiersBatiment = [
  "Maçonnerie",
  "Charpenterie",
  "Plomberie",
  "Électricité",
  "Peinture",
  "Menuiserie",
  "Couvreur",
  "Plâtrerie",
  "Carrelage",
  "Isolation",
  "Serrurerie",
  "Chauffagiste",
  "Façadier",
  "Paysagiste",
  "Plaquiste",
  "Vitrerie",
  "Pose de revêtements de sols",
  "Rénovation intérieure",
  "Aménagement extérieur",
  "Architecte",
  "Conducteur de travaux",
  "Ingénieur en bâtiment",
  "Terrassier",
  "Géomètre",
  "Métallier",
  "Monteur en structures métalliques",
  "Chef de chantier",
  "Poseur de cloisons",
  "Poseur de faux plafonds",
  "Plombier chauffagiste",
  "Installateur de systèmes de sécurité",
  "Technicien en énergies renouvelables",
  "Couvreur-zingueur",
  "Constructeur de maisons en bois",
  "Poseur de fenêtres et portes",
  "Urbaniste",
  "Dessinateur-projeteur",
  "Technicien en isolation thermique et acoustique",
  "Poseur de panneaux solaires",
  "Conducteur d'engins de chantier",
  "Spécialiste en fondations spéciales",
  "Installateur de systèmes de ventilation",
  "Autre",
];

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Veuillez entrer votre nom.")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Le nom ne doit contenir que des lettres et des espaces."
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
      const uid = await addProspect(data).then((uid) => {
        console.log(uid);
        router.push(
          `/pricing?uid=${uid}&email=${encodeURIComponent(
            data.email
          )}&metier=${encodeURIComponent(
            data.metier
          )}&telephone=${encodeURIComponent(
            data.phone
          )}&name=${encodeURIComponent(data.name)}`
        );
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du prospect.",
      });
    }
  };

  return (
    <section
      id="hero"
      className="w-full relative flex items-center min-h-[680px] h-full"
    >
      <img
        src="/images/hero.png"
        alt="hero"
        className="w-full min-h-[650px] h-full object-cover absolute top-0 left-0 -z-10"
      />
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl items-center justify-between p-6 lg:px-4 md:py-6 py-16 z-10">
        <div className="w-full md:w-1/2 md:px-4 md:max-w-[400px]">
          <h1 className="text-5xl text-white font-bold">
            Trouvez{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#f59e0b",
              }}
            >
              vos
            </span>
            <br />{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#f59e0b",
              }}
            >
              chantiers
            </span>
          </h1>
          <h2 className="text-white mt-7">
            Augmentez votre CA mensuel de <br />{" "}
            <span className="text-4xl font-semibold">30 000€</span> à{" "}
            <span className="text-4xl font-semibold">400 000€</span>
          </h2>
          <p className="text-white mt-7">
            Trouvez vos chantiers grâce à des prospects qualifiés et des projets
            sur-mesure, clés en main, sans engagement ni frais de service.
            Trouver-mon-chantier.fr est votre partenaire de confiance pour
            développer votre activité dans le bâtiment.
          </p>
        </div>
        <div className="w-full md:w-1/2 md:px-4 md:mt-0 mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 md:p-12 md:bg-white/70 bg-white rounded-md flex flex-col items-center shadow-lg w-full"
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
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400"
              >
                Envoyer
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
