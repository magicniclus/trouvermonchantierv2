import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarifs - Trouver Mon Chantier",
  description:
    "Découvrez nos tarifs compétitifs pour accéder à une large base de données de chantiers de construction et de rénovation près de chez vous.",
  keywords:
    "tarifs chantier, prix chantiers, coûts chantier, trouver des chantiers, tarifs construction",
  openGraph: {
    title: "Tarifs - Trouver Mon Chantier",
    description:
      "Découvrez nos tarifs compétitifs pour accéder à une large base de données de chantiers de construction et de rénovation près de chez vous.",
    url: "https://trouver-mon-chantier.fr/tarifs",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs - Trouver Mon Chantier",
    description:
      "Découvrez nos tarifs compétitifs pour accéder à une large base de données de chantiers de construction et de rénovation près de chez vous.",
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
