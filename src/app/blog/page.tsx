import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Metadata } from 'next';
import { SecondaryNav } from '@/components/navigation';
import { SecondaryFooter } from '@/components/footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export const metadata: Metadata = {
  title: 'Blog Trouver Mon Chantier - Conseils pour Artisans & Professionnels du Bâtiment',
  description: 'Découvrez nos conseils d\'experts pour développer votre activité d\'artisan : prospection client, Google Ads, marketing digital, gestion d\'entreprise et bien plus.',
  keywords: 'blog artisan, conseils professionnels bâtiment, prospection client, Google Ads artisan, marketing digital BTP, développement activité artisan',
  openGraph: {
    title: 'Blog Trouver Mon Chantier - Conseils pour Artisans',
    description: 'Conseils d\'experts pour développer votre activité d\'artisan et trouver plus de clients',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Trouver Mon Chantier - Conseils pour Artisans',
    description: 'Conseils d\'experts pour développer votre activité d\'artisan',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://trouvermonchantier.com/blog',
  },
};

type Article = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  image?: string;
};

function getAllArticles(): Article[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    // Ajoute une valeur par défaut pour la catégorie si absente
    return {
      ...data,
      category: data.category || 'Non classé',
      slug: filename.replace(/\.mdx$/, '')
    } as Article;
  });
}

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <SecondaryNav />
      
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm/10 mb-6">
              📚 Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Conseils d'experts pour <span className="text-yellow-500">développer votre activité</span>
            </h1>
            <p className="text-xl text-slate-500/85 leading-relaxed max-w-3xl mx-auto">
              Découvrez nos guides pratiques, conseils marketing et stratégies éprouvées 
              pour attirer plus de clients et développer votre entreprise artisanale.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Grid des articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden hover:shadow-2xl/10 hover:-translate-y-1 transition-all duration-200 ease-out group"
              >
                {article.image && (
                  <Link href={`/blog/${article.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                )}
                
                <div className="p-6">
                  {/* Catégorie */}
                  <div className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs font-medium mb-3">
                    {article.category}
                  </div>
                  
                  {/* Titre */}
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  
                  {/* Meta informations */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author || 'Équipe TMC'}
                    </div>
                  </div>
                  
                  {/* Résumé */}
                  <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  {/* CTA */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium text-sm group/link"
                  >
                    Lire l'article
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Message si aucun article */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                📝
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Aucun article pour le moment
              </h3>
              <p className="text-slate-600">
                Nos premiers articles arrivent bientôt ! Revenez nous voir.
              </p>
            </div>
          )}
        </div>
      </main>

      <SecondaryFooter />
    </>
  );
}
