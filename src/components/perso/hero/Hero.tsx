/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  "Ébéniste",
  "Métallier",
  "Monteur en structures métalliques",
  "Ingénieur en génie civil",
  "Chef de chantier",
  "Poseur de cloisons",
  "Poseur de faux plafonds",
  "Électricien industriel",
  "Technicien de maintenance",
  "Plombier chauffagiste",
  "Installateur de systèmes de sécurité",
  "Monteur en ascenseurs",
  "Technicien en énergies renouvelables",
  "Couvreur-zingueur",
  "Constructeur de maisons en bois",
  "Constructeur de piscines",
  "Poseur de fenêtres et portes",
  "Réparateur en bâtiment",
  "Scaphandrier travaux publics",
  "Urbaniste",
  "Économiste de la construction",
  "Dessinateur-projeteur",
  "Technicien en isolation thermique et acoustique",
  "Monteur en installations thermiques",
  "Poseur de panneaux solaires",
  "Conducteur d'engins de chantier",
  "Spécialiste en fondations spéciales",
  "Installateur de systèmes de ventilation",
  "Autre",
];

const FormSchema = z.object({
  name: z.string().min(1, "Veuillez entrer votre nom."),
  email: z
    .string({
      required_error: "Veuillez entrer un email.",
    })
    .email("Veuillez entrer un email valide."),
  metier: z.string().min(1, "Veuillez sélectionner un métier."),
});

const Hero = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Vous avez soumis les valeurs suivantes :",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="w-full relative flex items-center min-h-[650px] h-full">
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
          <h3 className="text-white">Efficace, fiable et continu</h3>
          <p className="text-white text-xs mt-7">
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
              <Button
                type="submit"
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400"
              >
                Envoyer
              </Button>
              <p className="text-xs text-center mt-4">
                <a href="#" className="underline">
                  Conditions générales
                </a>{" "}
                et{" "}
                <a href="#" className="underline">
                  politique de confidentialité
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
