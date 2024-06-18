import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentions Légales - Trouver Mon Chantier",
  description:
    "Consultez les mentions légales de Trouver Mon Chantier. Toutes les informations légales sur notre site et nos services.",
  keywords:
    "mentions légales, informations légales, Trouver Mon Chantier, site légal",
  openGraph: {
    title: "Mentions Légales - Trouver Mon Chantier",
    description:
      "Consultez les mentions légales de Trouver Mon Chantier. Toutes les informations légales sur notre site et nos services.",
    url: "https://trouver-mon-chantier.fr/mentions-legales",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions Légales - Trouver Mon Chantier",
    description:
      "Consultez les mentions légales de Trouver Mon Chantier. Toutes les informations légales sur notre site et nos services.",
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
