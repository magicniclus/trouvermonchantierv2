const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOMAIN = 'https://trouvermonchantier.com';
const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const SECTEURS_DIR = path.join(process.cwd(), 'content/secteurs');

// Pages statiques avec leurs priorités et fréquences de mise à jour
const staticPages = [
  { url: '', priority: 1.0, changefreq: 'weekly' }, // Accueil
  { url: '/devenir-partenaire', priority: 0.9, changefreq: 'monthly' },
  { url: '/tarifs', priority: 0.8, changefreq: 'monthly' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/secteurs', priority: 0.8, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/avis', priority: 0.6, changefreq: 'weekly' },
  { url: '/solution', priority: 0.6, changefreq: 'monthly' },
  { url: '/pricing', priority: 0.6, changefreq: 'monthly' },
  { url: '/secteur', priority: 0.6, changefreq: 'monthly' },
  { url: '/pricing/secteur', priority: 0.5, changefreq: 'monthly' },
  { url: '/secteur/rendez-vous', priority: 0.5, changefreq: 'monthly' },
  { url: '/auth', priority: 0.4, changefreq: 'monthly' },
  { url: '/CGV', priority: 0.3, changefreq: 'yearly' },
  { url: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
  { url: '/politique-de-confidentialite', priority: 0.3, changefreq: 'yearly' },
  { url: '/merci', priority: 0.3, changefreq: 'yearly' },
  { url: '/payed', priority: 0.3, changefreq: 'yearly' },
];

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));
}

function getBlogArticles() {
  const files = getFiles(BLOG_DIR);
  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    const slug = filename.replace(/\.mdx$/, '');
    
    return {
      url: `/blog/${slug}`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: data.date || new Date().toISOString().split('T')[0]
    };
  });
}

function getSecteurArticles() {
  const files = getFiles(SECTEURS_DIR);
  return files.map(filename => {
    const filePath = path.join(SECTEURS_DIR, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    const slug = filename.replace(/\.mdx$/, '');
    
    return {
      url: `/secteurs/${slug}`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: data.date || new Date().toISOString().split('T')[0]
    };
  });
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Combiner toutes les pages
  const allPages = [
    ...staticPages.map(page => ({ ...page, lastmod: today })),
    ...getBlogArticles(),
    ...getSecteurArticles()
  ];

  // Générer le XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Écrire le fichier
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap généré avec ${allPages.length} pages`);
  console.log(`📍 Fichier créé : ${sitemapPath}`);
}

// Exécuter si appelé directement
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
