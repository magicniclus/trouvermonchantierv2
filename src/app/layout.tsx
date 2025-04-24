import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trouver un chantier - Trouver Mon Chantier",
  description: "Trouver un chantier - Trouver Mon Chantier",
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
        <meta charSet="utf-8" />
        <link rel="icon" href="logo/favicon.png" sizes="any" />
        <link rel="shortcut icon" href="logo/favicon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
