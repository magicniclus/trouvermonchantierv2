import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

interface Article {
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  description?: string;
  keywords?: string;
  image?: string;
  [key: string]: any; // for any extra frontmatter fields
}

async function getArticle(slug: string): Promise<Article> {
  try {
    const filePath = path.join(BLOG_DIR, slug + '.mdx');
    const source = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(source);
    return { ...data, content } as Article;
  } catch (error) {
    notFound();
  }
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  const title = `${article.title} | Blog Trouver Mon Chantier`;
  const description = article.description || `Découvrez ${article.title} - Conseils d'experts pour développer votre activité d'artisan et attirer plus de clients.`;
  const keywords = article.keywords || `${article.category}, artisan, conseils professionnels, développement activité, prospection client`;
  const canonicalUrl = `https://trouvermonchantier.com/blog/${params.slug}`;
  const imageUrl = article.image || 'https://trouvermonchantier.com/images/blog-default.jpg';

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

interface RelatedArticle {
  slug: string;
  title: string;
  [key: string]: any; // add other frontmatter fields as needed
}

async function getRelated(slug: string, category: string): Promise<RelatedArticle[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter(f => f.endsWith('.mdx') && !f.startsWith(slug));
  const related: RelatedArticle[] = [];
  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const { data } = matter(await fs.readFile(filePath, 'utf8'));
    if (data.category === category) {
      related.push({ ...data, slug: filename.replace(/\.mdx$/, '') } as RelatedArticle);
      if (related.length >= 3) break;
    }
  }
  return related;
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

interface ArticlePageProps {
  params: { slug: string }
}

import ArticleLayout from "@/components/blog/ArticleLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article: Article = await getArticle(slug);
  const related = await getRelated(slug, article.category);
  const toc = generateTOC(article.content);

  return (
    <ArticleLayout
      title={article.title}
      date={article.date}
      author={article.author}
      toc={toc}
      breadcrumbPages={[
        { name: 'Blog', href: '/blog', current: false },
        { name: article.title, href: `/blog/${params.slug}`, current: true },
      ]}
    >
      <MDXRemote source={article.content} />
      <hr className="my-8" />
      <div>
        <h3 className="font-semibold mb-2">Articles liés :</h3>
        <ul>
          {related.map(a => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </ArticleLayout>
  );
}
