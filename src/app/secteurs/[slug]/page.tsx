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

import ArticleLayout from "@/components/blog/ArticleLayout";
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
    <ArticleLayout
      title={article.title}
      date={article.date}
      author={article.author}
      toc={toc}
      breadcrumbPages={[
        { name: 'Secteurs', href: '/secteurs', current: false },
        { name: secteurName, href: `/secteurs/${slug}`, current: true },
      ]}
    >
      <MDXRemote source={article.content} />
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
    </ArticleLayout>
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
