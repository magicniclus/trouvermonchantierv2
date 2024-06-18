import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trouver un chantier - Trouver Mon Chantier",
  description:
    "Trouvez facilement des chantiers près de chez vous avec Trouver Mon Chantier. Accédez à une large base de données de projets de construction et de rénovation.",
  keywords:
    "trouver chantier, chantiers, construction, rénovation, trouver des chantiers",
  openGraph: {
    title: "Trouver un chantier - Trouver Mon Chantier",
    description:
      "Trouvez facilement des chantiers près de chez vous avec Trouver Mon Chantier. Accédez à une large base de données de projets de construction et de rénovation.",
    url: "https://trouver-mon-chantier.fr",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trouver un chantier - Trouver Mon Chantier",
    description:
      "Trouvez facilement des chantiers près de chez vous avec Trouver Mon Chantier. Accédez à une large base de données de projets de construction et de rénovation.",
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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
