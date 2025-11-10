import { AuthProvider } from "@/context/AuthContext";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ChatWidget from "@/components/common/ChatWidget";
import { Toaster } from "@/components/ui/toaster";
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
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="shortcut icon" href="/favicon.png" />
        
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11128083735" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'AW-11128083735');
          `}
        </Script>

      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <MobileMenuProvider>
            {children}
            {/* <ChatWidget /> */}
            <Toaster />
          </MobileMenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
