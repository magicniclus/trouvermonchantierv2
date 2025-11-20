import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SECTEURS_DIR = path.join(process.cwd(), 'content/secteurs');

interface SecteurArticle {
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonicalUrl?: string;
  [key: string]: any;
}

async function getSecteurArticle(slug: string): Promise<SecteurArticle> {
  try {
    const filePath = path.join(SECTEURS_DIR, slug + '.mdx');
    const source = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(source);
    return { ...data, content } as SecteurArticle;
  } catch (error) {
    notFound();
  }
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getSecteurArticle(params.slug);
  
  const title = `${article.title} | Trouver Mon Chantier`;
  const description = article.description || `Guide complet pour développer votre activité de ${article.title.toLowerCase()} - Stratégies marketing, Google Ads, tarifs et conseils d'experts.`;
  const keywords = article.keywords || `${params.slug}, entreprise ${params.slug}, marketing ${params.slug}, Google Ads ${params.slug}, développement activité`;
  const canonicalUrl = article.canonicalUrl || `https://trouvermonchantier.com/secteurs/${params.slug}`;
  const imageUrl = article.image || 'https://trouvermonchantier.com/images/secteur-default.jpg';

  return {
    title,
    description,
    keywords,
    authors: [{ name: article.author || 'Équipe Trouver Mon Chantier' }],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'fr_FR',
      url: canonicalUrl,
      siteName: 'Trouver Mon Chantier',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.date,
      authors: [article.author || 'Équipe Trouver Mon Chantier'],
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@TrouverMonChantier',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'article:published_time': article.date,
      'article:author': article.author || 'Équipe Trouver Mon Chantier',
      'article:section': article.category,
      'article:tag': keywords,
    },
  };
}

interface RelatedSecteur {
  slug: string;
  title: string;
  [key: string]: any;
}

async function getRelatedSecteurs(currentSlug: string): Promise<RelatedSecteur[]> {
  try {
    const files = (await fs.readdir(SECTEURS_DIR)).filter(f => f.endsWith('.mdx') && !f.startsWith(currentSlug));
    const related: RelatedSecteur[] = [];
    
    for (const filename of files.slice(0, 3)) {
      const filePath = path.join(SECTEURS_DIR, filename);
      const { data } = matter(await fs.readFile(filePath, 'utf8'));
      related.push({ ...data, slug: filename.replace(/\.mdx$/, '') } as RelatedSecteur);
    }
    return related;
  } catch (error) {
    return [];
  }
}

function generateTOC(content: string) {
  // Génère un sommaire à partir des titres de niveau 2 uniquement (##)
  const headingRegex = /^(#{2})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content))) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

interface SecteurPageProps {
  params: { slug: string }
}

import { SecondaryNav } from "@/components/navigation";
import { SecondaryFooter } from "@/components/footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function SecteurPage({ params }: SecteurPageProps) {
  const { slug } = params;
  const article: SecteurArticle = await getSecteurArticle(slug);
  const related = await getRelatedSecteurs(slug);
  const toc = generateTOC(article.content);

  // Mapping des slugs vers les noms d'affichage
  const secteurNames: { [key: string]: string } = {
    'electricien': 'Électricien',
    'plombier': 'Plombier',
    'menuisier': 'Menuisier',
    'peintre': 'Peintre',
    'isolation': 'Isolation',
    'macon': 'Maçon',
    'toiture': 'Couvreur',
    'climatisation': 'Climatisation',
    'chauffagiste': 'Chauffagiste'
  };

  const secteurName = secteurNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <>
      <SecondaryNav />
      
      {/* Hero de l'article */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb pages={[
              { name: 'Secteurs', href: '/secteurs', current: false },
              { name: secteurName, href: `/secteurs/${slug}`, current: true },
            ]} />
          </div>
          
          {/* Header de l'article */}
          <header className="text-left max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Meta informations */}
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <span>📅</span>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <span>👤</span>
                {article.author || 'Équipe TMC'}
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                10 min de lecture
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Article principal */}
            <article className="flex-1 max-w-none">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-slate-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:text-yellow-700 prose-img:rounded-xl prose-img:shadow-lg">
                <MDXRemote source={article.content} />
              </div>
              
              <hr className="my-8" />
              <div>
                <h3 className="font-semibold mb-4 text-xl">Autres secteurs d'activité :</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {related.map(secteur => (
                    <Link 
                      key={secteur.slug} 
                      href={`/secteurs/${secteur.slug}`}
                      className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                    >
                      <h4 className="font-medium text-slate-900 mb-2">{secteurNames[secteur.slug] || secteur.title}</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{secteur.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar avec sommaire */}
            <aside className="lg:w-96 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-slate-50 rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 p-6">
                <h3 className="font-bold mb-6 text-xl text-slate-900">
                  Sommaire
                </h3>
                
                <nav className="space-y-1">
                  {toc.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0 group-hover:bg-yellow-600 transition-colors duration-200" />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <SecondaryFooter />
    </>
  );
}

// Génération statique des pages
export async function generateStaticParams() {
  try {
    const files = await fs.readdir(SECTEURS_DIR);
    return files
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => ({
        slug: filename.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    return [];
  }
}
