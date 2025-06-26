import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function ArticlesALaUne() {
  // Articles mis en avant - ajoutez ou supprimez des articles selon vos besoins (jusqu'à 3)
  const featuredArticles = [
    {
      slug: "trouver-des-chantiers",
      title: "Trouver des chantiers : la méthode moderne pour artisans",
      description: "Découvrez comment obtenir plus de chantiers grâce à un site web ultra optimisé et des campagnes Google Ads locales, pour artisans et pros du bâtiment.",
      image: "https://koala.sh/api/image/v2-wj0v3-7fh3c.jpg?width=1216&height=832&dream",
    },
    // Vous pouvez ajouter jusqu'à 2 articles supplémentaires ici quand vous en aurez besoin
    // {
    //   slug: "autre-article",
    //   title: "Titre de l'article",
    //   description: "Description de l'article",
    //   image: "URL de l'image",
    // },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Articles à la une
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Découvrez nos conseils et astuces pour développer votre activité d'artisan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </Link>
              
              <div className="p-6 bg-white flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  {article.description}
                </p>
                <Link 
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors mt-auto"
                >
                  Lire l'article complet
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition-all duration-200 ease-in-out"
          >
            Voir tous nos articles
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
