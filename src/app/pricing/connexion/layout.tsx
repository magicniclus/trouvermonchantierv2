import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connexion - Trouver Mon Chantier",
  description:
    "Connectez-vous à votre compte Trouver Mon Chantier pour accéder à votre espace personnel et à vos chantiers.",
  keywords:
    "connexion, login, Trouver Mon Chantier, accès compte, espace personnel",
  openGraph: {
    title: "Connexion - Trouver Mon Chantier",
    description:
      "Connectez-vous à votre compte Trouver Mon Chantier pour accéder à votre espace personnel et à vos chantiers.",
    url: "https://trouver-mon-chantier.fr/connexion",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexion - Trouver Mon Chantier",
    description:
      "Connectez-vous à votre compte Trouver Mon Chantier pour accéder à votre espace personnel et à vos chantiers.",
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
