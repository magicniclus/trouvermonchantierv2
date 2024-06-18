import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paiement - Trouver Mon Chantier",
  description:
    "Finalisez votre achat et accédez à une large base de données de chantiers de construction et de rénovation. Paiement sécurisé et rapide.",
  keywords:
    "paiement chantier, checkout chantier, finaliser achat chantier, trouver des chantiers, paiement sécurisé construction",
  openGraph: {
    title: "Paiement - Trouver Mon Chantier",
    description:
      "Finalisez votre achat et accédez à une large base de données de chantiers de construction et de rénovation. Paiement sécurisé et rapide.",
    url: "https://trouver-mon-chantier.fr/checkout",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paiement - Trouver Mon Chantier",
    description:
      "Finalisez votre achat et accédez à une large base de données de chantiers de construction et de rénovation. Paiement sécurisé et rapide.",
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
