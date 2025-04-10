import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merci pour votre rendez-vous - Trouver Mon Chantier",
  description:
    "Merci d'avoir pris rendez-vous avec Trouver Mon Chantier. Nous sommes impatients de discuter de votre projet et de vous aider à développer votre activité.",
  keywords:
    "merci, rendez-vous, confirmation, Trouver Mon Chantier, partenariat",
  openGraph: {
    title: "Merci pour votre rendez-vous - Trouver Mon Chantier",
    description:
      "Merci d'avoir pris rendez-vous avec Trouver Mon Chantier. Nous sommes impatients de discuter de votre projet et de vous aider à développer votre activité.",
    url: "https://trouver-mon-chantier.fr/merci",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merci pour votre rendez-vous - Trouver Mon Chantier",
    description:
      "Merci d'avoir pris rendez-vous avec Trouver Mon Chantier. Nous sommes impatients de discuter de votre projet et de vous aider à développer votre activité.",
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
