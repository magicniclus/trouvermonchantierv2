import Footer from "@/components/perso/footer/Footer";
import Link from "next/link";
import Header from "@/components/common/Header";

export default function DemoPage() {
  const demos = [
    {
      title: "Couvreur",
      description: "Site professionnel pour artisan couvreur",
      image: "/images/demo/couvreur-card.jpg",
      link: "/demo/couvreur",
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Maçon",
      description: "Site professionnel pour artisan maçon",
      image: "/images/demo/macon-card.jpg",
      link: "/demo/macon",
      color: "from-amber-500 to-amber-700"
    },
    {
      title: "Électricien",
      description: "Site professionnel pour artisan électricien",
      image: "/images/demo/electricien-card.jpg",
      link: "/demo/electricien",
      color: "from-yellow-500 to-yellow-700"
    }
  ];

  return (
    <>
      <Header 
        title="trouvermonchantier" 
        navLinks={[
          { label: "qui sommes nous ?", href: "/qui-sommes-nous" },
          { label: "préstations", href: "/prestations" },
          { label: "réalisation", href: "/realisation" },
        ]}
        ctaText="Prendre rendez-vous"
        ctaHref="/contact"
      />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative bg-slate-900 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/hero.png"
              alt="hero"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Exemples de sites professionnels
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-10">
              Découvrez nos modèles de sites web personnalisés pour différents corps de métiers du bâtiment
            </p>
          </div>
        </section>

        {/* Demo Cards Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos démos par métier
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Cliquez sur une carte pour explorer le site de démonstration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demos.map((demo, index) => (
                <Link 
                  href={demo.link} 
                  key={index}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white">
                    <div className="h-48 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${demo.color} opacity-80`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white">{demo.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-600 mb-4">{demo.description}</p>
                      <div className="text-yellow-500 font-semibold group-hover:text-yellow-600 transition-colors flex items-center">
                        Voir la démo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              Vous souhaitez un site personnalisé pour votre métier ?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Nous créons des sites professionnels optimisés pour générer des clients dans votre zone géographique.
              Contactez-nous pour obtenir votre site et commencer à recevoir des chantiers !
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
            >
              Découvrir nos offres
            </Link>
          </div>
        </section>
      </main>
      <Footer className="bg-slate-900" />
    </>
  );
}
