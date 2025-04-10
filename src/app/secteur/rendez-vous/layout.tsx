import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rendez-vous - Trouver Mon Chantier",
  description:
    "Sélectionnez votre secteur d'activité pour trouver des chantiers de construction et de rénovation adaptés à vos compétences et à votre localisation.",
  keywords:
    "choix du secteur, sélection secteur chantier, trouver des chantiers, secteur construction, secteur rénovation",
  openGraph: {
    title: "Choix du secteur - Trouver Mon Chantier",
    description:
      "Sélectionnez votre secteur d'activité pour trouver des chantiers de construction et de rénovation adaptés à vos compétences et à votre localisation.",
    url: "https://trouver-mon-chantier.fr/choix-secteur",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choix du secteur - Trouver Mon Chantier",
    description:
      "Sélectionnez votre secteur d'activité pour trouver des chantiers de construction et de rénovation adaptés à vos compétences et à votre localisation.",
    site: "@trouvermonchantier",
    creator: "@trouvermonchantier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta name="robots" content="noindex" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
