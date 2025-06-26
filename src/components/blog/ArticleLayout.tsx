"use client";

import React from "react";
import Nav from "@/components/tailwindui/nav/Nav";
import { Clock10Icon, PointerIcon, ArrowUpIcon } from "lucide-react";
import FAQDropdown from "./FAQDropdown";
import Footer from "../perso/footer/Footer";
import { useEffect, useState } from "react";
import Head from "next/head"; // Pour gérer les balises SEO
import Breadcrumb, { BreadcrumbPage } from "@/components/ui/Breadcrumb";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleLayoutProps {
  title: string;
  date: string;
  author: string;
  children: React.ReactNode;
  toc: TocItem[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    image?: string;
    author?: string;
    date?: string;
    [key: string]: any;
  };
  breadcrumbPages?: BreadcrumbPage[];
}

// Fonction utilitaire pour aplatir tous les enfants React
function flattenReactChildren(children: React.ReactNode): React.ReactNode[] {
  const flat: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    if (Array.isArray(child)) {
      flat.push(...flattenReactChildren(child));
    } else if (child && typeof child === "object" && (child as any).props && (child as any).props.children) {
      flat.push(child);
      flat.push(...flattenReactChildren((child as any).props.children));
    } else {
      flat.push(child);
    }
  });
  return flat;
}

function renderFAQDropdowns(faqChildren: React.ReactNode[]) {
  const result: React.ReactNode[] = [];
  let currentQuestion: string | null = null;
  let currentAnswer: React.ReactNode[] = [];
  for (let i = 0; i < faqChildren.length; i++) {
    const child = faqChildren[i];
    if (
      child &&
      typeof child === 'object' &&
      (child as any).type === 'h3'
    ) {
      if (currentQuestion) {
        result.push(
          <FAQDropdown key={currentQuestion} question={currentQuestion}>
            {currentAnswer}
          </FAQDropdown>
        );
        currentAnswer = [];
      }
      currentQuestion = (child as any).props?.children;
      continue;
    }
    if (currentQuestion) currentAnswer.push(child);
  }
  // Dernière question
  if (currentQuestion) {
    result.push(
      <FAQDropdown key={currentQuestion} question={currentQuestion}>
        {currentAnswer}
      </FAQDropdown>
    );
  }
  return result;
}


export default function ArticleLayout({ title, date, author, children, toc, meta, breadcrumbPages }: ArticleLayoutProps) {
  // Ligne jaune décorative sous chaque h3
  // Utilise <style jsx global> pour appliquer le style à tous les h3 markdown

  return (
    <>
      {/* Balises SEO dynamiques */}
      <Head>
        <title>{meta?.title || title}</title>
        {meta?.description && <meta name="description" content={meta.description} />}
        {meta?.keywords && <meta name="keywords" content={Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords} />}
        {meta?.canonicalUrl && <link rel="canonical" href={meta.canonicalUrl} />}
        {meta?.image && <meta property="og:image" content={meta.image} />}
        {meta?.title && <meta property="og:title" content={meta.title} />}
        {meta?.description && <meta property="og:description" content={meta.description} />}
        {meta?.author && <meta name="author" content={meta.author} />}
        {meta?.date && <meta name="article:published_time" content={meta.date} />}
      </Head>
      <Nav />
      {/* Breadcrumb aligné avec tout le contenu (article + sommaire) */}
      {Array.isArray(breadcrumbPages) && breadcrumbPages.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <Breadcrumb pages={breadcrumbPages} />
        </div>
      )}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-4 pt-12 pb-10 gap-10">

        {/* Article */}
        <article
          className="flex-1 max-w-2xl mx-auto prose prose-lg prose-slate \
            bg-white \
            prose-h1:font-extrabold prose-h1:text-center prose-h1:text-4xl mb-20 lg:prose-h1:text-5xl prose-h1:drop-shadow \
            prose-h2:font-bold prose-h2:border-b-2 prose-h2:pb-2 prose-h2:mb-8 \
            prose-h3: prose-h3:uppercase prose-h3:tracking-wide prose-h3:font-bold prose-h3:mb-4 \
            prose-p:mb-8 prose-p:text-lg \
            prose-li:mb-3 prose-ul:marker:text-yellow-500 prose-ul:pl-6 \
            prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:my-8 \
            prose-blockquote:bg-blue-50 prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:p-4 prose-blockquote:rounded prose-blockquote:text-blue-900 prose-blockquote:my-8 \
            prose-table:my-8"
        >

          {/* Découpage intelligent de la FAQ */}
          {(() => {
            const flat = React.Children.toArray(children);
            const before: React.ReactNode[] = [];
            const faq: React.ReactNode[] = [];
            const after: React.ReactNode[] = [];
            let state: 'before' | 'faq' | 'after' = 'before';
            for (let i = 0; i < flat.length; i++) {
              const child = flat[i];
              // Début FAQ
              if (
                state === 'before' &&
                child &&
                typeof child === 'object' &&
                (child as any).type === 'h2' &&
                ((child as any).props?.children?.toString().toLowerCase().includes('faq') ||
                  (child as any).props?.children?.toString().toLowerCase().includes('foire aux questions'))
              ) {
                state = 'faq';
                faq.push(child);
                continue;
              }
              // Fin FAQ
              if (
                state === 'faq' &&
                child &&
                typeof child === 'object' &&
                (child as any).type === 'h2' &&
                !((child as any).props?.children?.toString().toLowerCase().includes('faq') ||
                  (child as any).props?.children?.toString().toLowerCase().includes('foire aux questions'))
              ) {
                state = 'after';
                after.push(child);
                continue;
              }
              if (state === 'before') before.push(child);
              else if (state === 'faq') faq.push(child);
              else after.push(child);
            }
            // Rendu
            return <>
              {before}
              {faq.length > 0 && <>
  <h2 className="text-2xl font-bold mt-12 mb-8">FAQ</h2>
  {renderFAQDropdowns(faq)}
</>}
              {after}
            </>;
          })()}


          {/* Exemple d'encart CTA */}
          <div className="my-12">
            <div className="bg-[#12A67C] rounded-2xl shadow-lg p-8 text-center">
              <div className="text-2xl font-bold text-white mb-10">Obtenez jusqu'à 12 rendez-vous par semaine à partir de 99€/mois</div>
              <a href="/" className="mt-10 mb-10 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold rounded-xl shadow transition ">M'INSCRIRE</a>
              <div className="text-white mt-4">N'achetez plus vos clients sur des plateformes, ils vous appellent directement.</div>
            </div>
          </div>
        </article>
        {/* Sommaire */}
        <aside className="w-full lg:w-80 mb-10 lg:mb-0 hidden lg:block sticky top-24 self-start">
          <div className="bg-slate-50 rounded-2xl shadow-lg p-6">
            <div className="font-bold mb-6 text-xl tracking-widest uppercase">Sommaire</div>
            <div className=" text-base text-center my-10">
            <Clock10Icon className="inline" /> <span className="font-semibold">Temps de lecture : </span>5 minutes
            </div>
            <ul className="space-y-3 text-base">
              {toc.map(item => (
                <li key={item.id} className="flex items-center">
                    <div className=" w-2 h-2 min-h-2 min-w-2 rounded-full bg-yellow-500" />
                  <a
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded-xl transition-colors duration-150font-semibold"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className=" text-base text-center mt-10">
            23/06/2025 — par Pauline MASSÉ
            </div>
          </div>
        </aside>
      </div>
      <style jsx global>{`
        .prose h3 {
          position: relative;
          padding-bottom: 2.5rem;
        }
        .prose h3::after {
          content: "";
          display: block;
          width: 150px;
          height: 12px;
          border-radius: 9999px;
          background-color: #f59e0b; /* bg-yellow-500 */
          margin-top: 1rem;
        }
      `}</style>
      {/* Bouton scroll-to-top */}
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

// Composant bouton scroll-to-top
function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Remonter en haut"
      className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
}
