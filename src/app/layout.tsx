import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trouver un chantier - Trouver Mon Chantier",
  description: "Trouver un chantier - Trouver Mon Chantier",
  icons: {
    icon: "/favicon.png",
  },
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
        {/* Google tag (gtag.js) - Ancien tag */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11128083735" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11128083735');
          `}
        </Script>
        {/* Google tag (gtag.js) - Nouveau tag */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17338472202" strategy="afterInteractive" />
        <Script id="google-analytics-new" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17338472202');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
