// Page principale du blog : liste tous les articles, catégories en haut
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Nav from '@/components/tailwindui/nav/Nav';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

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
  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <>
    <Nav />
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Nos articles</h1>
      {/* <div className="flex gap-4 mb-8 flex-wrap">
        {categories.map(cat => (
          <Link href={`/blog/category/${cat}`} key={cat} className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 transition duration-300 ease-in-out">{cat}</Link>
        ))}
      </div> */}
      <div className="space-y-8">
        {articles.map(article => (
          <div key={article.slug} className="pb-4 hover:bg-slate-50 rounded-xl">
            {article.image && (
              <Link href={`/blog/${article.slug}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-h-56 object-cover rounded-t-xl mb-3"
                  loading="lazy"
                />
              </Link>
            )}
            <div className="p-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>
            <div className="text-gray-500 text-sm mb-2">{article.date} — par Pauline MASSÉ</div>
            <p>{article.summary}</p>
            <Link href={`/blog/${article.slug}`} className=" text-sm">Lire l'article →</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
    </>
  );
}
