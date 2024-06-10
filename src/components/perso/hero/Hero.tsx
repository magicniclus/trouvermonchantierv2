/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export function SelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
}

const Hero = () => {
  return (
    <section className="w-full relative flex items-center h-[650px]">
      <img
        src="/images/hero.png"
        alt="hero"
        className="w-full h-[650px] object-cover absolute top-0 left-0 -z-10"
      />
      <div className="mx-auto w-full h-full flex max-w-7xl items-center justify-between p-6 lg:px-8 z-10">
        <div className="w-full md:w-1/2 px-4">
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
        <div className="w-full md:w-1/2">
          <form className="p-5 md:p-12 px-20 bg-slate-200/70 rounded-md flex flex-col items-center">
            <h2 className="text-slate-700 font-semibold mt-7 text-center">
              Vous êtes professionnel du bâtiment et vous recherchez de nouveaux
              chantiers ?
            </h2>
            <Input type="text" placeholder="Nom, prénom" className="mt-7" />
            <Input type="email" placeholder="Email" className="mt-3" />
            <Select>
              <SelectTrigger className="mt-3">
                <SelectValue placeholder="Sélectionnez un métier du bâtiment" />
              </SelectTrigger>
              <SelectContent>
                {metiersBatiment.map((metier) => (
                  <SelectItem key={metier} value={metier}>
                    {metier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="mt-6">
              Soumettre
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
