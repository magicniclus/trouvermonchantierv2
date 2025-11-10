"use client";

import React from "react";
import { SecondaryNav } from "@/components/navigation";
import { SecondaryFooter } from "@/components/footer";
import { Clock, ArrowUp, Calendar, User, Share2 } from "lucide-react";
import FAQDropdown from "./FAQDropdown";
import BlogContactForm from "./BlogContactForm";
import { useEffect, useState } from "react";
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
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Erreur lors du partage:', err)
      }
    } else {
      // Fallback: copier l'URL
      navigator.clipboard.writeText(window.location.href)
      setIsSharing(true)
      setTimeout(() => setIsSharing(false), 2000)
    }
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100 // Offset pour la navigation sticky
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  // Générer les IDs pour les titres après l'hydratation
  useEffect(() => {
    const generateIds = () => {
      // Vérifier que nous sommes côté client et que le DOM est prêt
      if (typeof window === 'undefined') return
      
      const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4')
      headings.forEach((heading) => {
        if (!heading.id) {
          const text = heading.textContent || ''
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          heading.id = id
        }
      })
    }
    
    // Attendre que l'hydratation soit complète
    const timer = setTimeout(generateIds, 200)
    return () => clearTimeout(timer)
  }, [children])

  return (
    <>
      <SecondaryNav />
      
      {/* Hero de l'article */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          {Array.isArray(breadcrumbPages) && breadcrumbPages.length > 0 && (
            <div className="mb-8">
              <Breadcrumb pages={breadcrumbPages} />
            </div>
          )}
          
          {/* Header de l'article */}
          <header className="text-left max-w-4xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {title}
            </h2>
            
            {/* Meta informations */}
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {author || 'Équipe TMC'}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                5 min de lecture
              </div>
            </div>

            {/* Bouton de partage */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              {isSharing ? 'Lien copié !' : 'Partager'}
            </button>
          </header>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Article principal */}
            <article className="flex-1 max-w-none">
              <div className="article-content">
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
                  return (
                    <>
                      {before}
                      {faq.length > 0 && (
                        <>
                          <h2 className="text-2xl font-bold mt-12 mb-8">FAQ</h2>
                          {renderFAQDropdowns(faq)}
                        </>
                      )}
                      {after}
                    </>
                  );
                })()}

                {/* CTA intégré */}
                <div className="my-16 not-prose">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Prêt à développer votre activité ?
                    </h3>
                    <p className="text-slate-800 mb-6 max-w-2xl mx-auto">
                      Rejoignez les centaines d'artisans qui génèrent déjà leurs propres clients 
                      grâce à notre solution Google Ads personnalisée.
                    </p>
                    <a 
                      href="/" 
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <span className="text-white">Prendre rendez-vous</span>
                      <ArrowUp className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar avec sommaire */}
            <aside className="lg:w-96 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-slate-50 rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 p-6">
                <h3 className="font-bold mb-6 text-xl text-slate-900">
                  Sommaire
                </h3>
                
                <div className="text-center mb-6 p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Temps de lecture</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">5 minutes</div>
                </div>

                <nav className="space-y-1">
                  {toc.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0 group-hover:bg-yellow-600 transition-colors duration-200" />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-center text-sm text-slate-500">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      par {author || 'Équipe TMC'}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Formulaire de contact */}
      <BlogContactForm />

      {/* Bouton scroll-to-top */}
      <ScrollToTopButton />
      
      <SecondaryFooter />
      
      {/* Styles CSS personnalisés pour le contenu */}
      <style jsx global>{`
        .article-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2rem;
          line-height: 1.2;
          margin-top: 0;
        }
        
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 4rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e2e8f0;
          line-height: 1.3;
          scroll-margin-top: 100px;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0f172a;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.4;
          scroll-margin-top: 100px;
        }
        
        .article-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #334155;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          scroll-margin-top: 100px;
        }
        
        .article-content p {
          font-size: 1.125rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .article-content ul, .article-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .article-content li {
          font-size: 1.125rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 0.5rem;
        }
        
        .article-content ul li {
          list-style-type: disc;
          list-style-color: #eab308;
        }
        
        .article-content ol li {
          list-style-type: decimal;
          list-style-color: #eab308;
        }
        
        .article-content strong {
          font-weight: 700;
          color: #0f172a;
        }
        
        .article-content a {
          color: #ca8a04;
          text-decoration: none;
          font-weight: 500;
        }
        
        .article-content a:hover {
          color: #a16207;
          text-decoration: underline;
        }
        
        .article-content blockquote {
          border-left: 4px solid #eab308;
          background-color: #fefce8;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 0.75rem 0.75rem 0;
        }
        
        .article-content blockquote p {
          color: #713f12;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .article-content code {
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #0f172a;
          font-weight: 500;
        }
        
        .article-content pre {
          background-color: #0f172a;
          color: #f1f5f9;
          padding: 1.5rem;
          border-radius: 0.75rem;
          margin: 2rem 0;
          overflow-x: auto;
        }
        
        .article-content img {
          width: 100%;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }
        
        .article-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }
        
        .article-content th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #0f172a;
          padding: 1rem;
          text-align: left;
        }
        
        .article-content td {
          color: #475569;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
      `}</style>
    </>
  );
}

// Composant bouton scroll-to-top
function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShow(window.scrollY > 300);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (!mounted || !show) return null;
  
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Remonter en haut"
      className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
