// Page de catégorie compatible Next.js App Router (server component)
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary?: string;
  [key: string]: any;
}

async function getArticlesByCategory(category: string): Promise<Article[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter(f => f.endsWith('.mdx'));
  const articles: Article[] = [];
  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const { data } = matter(await fs.readFile(filePath, 'utf8'));
    if (data.category === category) {
      articles.push({
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title || 'Titre manquant',
        date: data.date || 'Date manquante',
        author: data.author || 'Auteur inconnu',
        category: data.category || 'Non classé',
        summary: data.summary || '',
        ...data
      });
    }
  }
  return articles;
}

interface CategoryPageProps {
  params: { category: string }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const articles = await getArticlesByCategory(category);
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Articles pour la thématique : {category}</h1>
      <div className="space-y-8">
        {articles.length === 0 && (
          <div className="text-gray-500">Aucun article trouvé pour cette thématique.</div>
        )}
        {articles.map(article => (
          <div key={article.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>
            <div className="text-gray-500 text-sm mb-2">{article.date} — par {article.author}</div>
            <p>{article.summary}</p>
            <Link href={`/blog/${article.slug}`} className="text-blue-600 hover:underline text-sm">Lire l'article →</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
