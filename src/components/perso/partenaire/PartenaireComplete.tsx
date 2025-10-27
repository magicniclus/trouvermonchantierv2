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
import { 
  Shield, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle, 
  Star,
  Zap,
  Target,
  Award,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
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

const PartenaireComplete = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      metier: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      toast({
        title: "Envoi en cours",
        description: "Nous traitons votre candidature...",
      });

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
        "Commentaire": "Candidature partenaire depuis page dédiée"
      };
      
      let success = false;
      
      try {
        const prospectId = await addProspect(prospectData);
        console.log('Candidature créée avec succès:', prospectId);
        success = true;
      } catch (error) {
        console.error('Erreur lors de l\'envoi à Firebase:', error);
      }
      
      if (success) {
        toast({
          title: "Candidature envoyée !",
          description: "Nous vous recontacterons sous 48h pour valider votre candidature.",
        });
        
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
      console.error("Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi.",
        variant: "destructive",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  };

  const stats = [
    { number: "12,000+", label: "Artisans partenaires", icon: Users },
    { number: "94%", label: "Taux de satisfaction", icon: Star },
    { number: "30", label: "Demandes/mois en moyenne", icon: TrendingUp },
    { number: "48h", label: "Délai de validation", icon: Clock },
  ];

  const services = [
    {
      icon: Target,
      title: "SEO - Positionnement local",
      description: "Votre entreprise en première position sur Google dans votre zone",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "SEA - Google Ads",
      description: "Campagnes publicitaires optimisées pour générer des demandes de chantier qualifiées",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Site internet professionnel",
      description: "Site web optimisé avec certification Trouver-Mon-Chantier",
      color: "bg-yellow-500",
    },
    {
      icon: Award,
      title: "Réseau de sites partenaires",
      description: "Accès exclusif à notre réseau de sites spécialisés",
      color: "bg-purple-500",
    },
  ];

  const advantages = [
    "Exclusivité territoriale garantie",
    "Demandes de chantier pré-qualifiées et vérifiées",
    "Support technique dédié",
    "Formation incluse",
    "Outil de gestion intégré",
    "Facturation simplifiée",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background image */}
        <img
          src="/images/hero3.png"
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 -z-20"
        />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-700">
                <Award className="w-4 h-4" />
                Réseau d'élite
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Devenez partenaire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                Trouver Mon Chantier
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            >
              Nous ne cherchons pas à multiplier les inscriptions. Notre objectif est de créer un réseau solide, 
              composé uniquement d'entreprises sérieuses et qualifiées.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20"
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advantages Section - Style moderne */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(0,0,0,0.05)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                <CheckCircle className="w-4 h-4" />
                Nos avantages exclusifs
              </span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6"
            >
              Pourquoi rejoindre notre réseau ?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Chaque partenaire bénéficie d'un positionnement exclusif et d'avantages concrets 
              pour développer son activité.
            </motion.p>
          </motion.div>

          {/* Layout principal */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Colonne gauche - Avantages */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Avantage 1 */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Exclusivité territoriale garantie</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Un nombre strictement limité d'entreprises par zone géographique. Votre secteur, votre territoire, 
                    sans concurrence déloyale entre partenaires.
                  </p>
                </div>
              </motion.div>

              {/* Avantage 2 */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Projets pré-qualifiés</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Fini les devis fantaisistes. Recevez uniquement des demandes vérifiées avec budget confirmé 
                    et clients réellement motivés.
                  </p>
                </div>
              </motion.div>

              {/* Avantage 3 */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Écosystème digital complet</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Site professionnel livré en 24h, SEO local optimisé, campagnes Google Ads et certification officielle 
                    pour rassurer vos prospects.
                  </p>
                </div>
              </motion.div>

              {/* Avantage 4 */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Outils de gestion intégrés</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Devis, factures, suivi de projets, visibilité sur les réseaux sociaux... 
                    Tout ce dont vous avez besoin dans une seule interface.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Colonne droite - Visuel */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Image principale */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/hero3.png"
                    alt="Partenaire Trouver Mon Chantier"
                    className="w-full h-[600px] object-cover"
                  />
                  {/* Gradient overlay léger */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>

                {/* Badge flottant */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Partenaire Certifié</div>
                      <div className="text-sm text-slate-600">Réseau d'élite TMC</div>
                    </div>
                  </div>
                </div>

                {/* Stats flottantes */}
                <div className="absolute -top-6 -right-6 bg-yellow-500 rounded-2xl p-4 shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">94%</div>
                    <div className="text-xs text-yellow-100">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-400 relative overflow-hidden">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-10 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={floatingAnimation}
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Prêt à transformer votre activité ?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-yellow-100 mb-8"
            >
              Rejoignez plus de 12,000 artisans qui font confiance à Trouver Mon Chantier
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Candidater maintenant
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartenaireComplete;
