import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conditions Générales de Vente - Trouver Mon Chantier",
  description:
    "Lisez les conditions générales de vente de Trouver Mon Chantier. Comprenez les termes et conditions de nos services.",
  keywords:
    "conditions générales de vente, CGV, termes et conditions, Trouver Mon Chantier",
  openGraph: {
    title: "Conditions Générales de Vente - Trouver Mon Chantier",
    description:
      "Lisez les conditions générales de vente de Trouver Mon Chantier. Comprenez les termes et conditions de nos services.",
    url: "https://trouver-mon-chantier.fr/cgv",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conditions Générales de Vente - Trouver Mon Chantier",
    description:
      "Lisez les conditions générales de vente de Trouver Mon Chantier. Comprenez les termes et conditions de nos services.",
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
