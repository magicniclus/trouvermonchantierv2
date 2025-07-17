import Footer from "@/components/perso/footer/Footer";
import Banner from "@/components/perso/banner/Banner";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Header from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import Experience from "@/components/common/Experience";

export default function MaconDemo() {
  return (
    <>
      <Header 
        title="monmacon" 
        navLinks={[
          { label: "qui sommes nous ?", href: "#about" },
          { label: "préstations", href: "#services" },
          { label: "réalisation", href: "#portfolio" },
        ]}
        ctaText="Prendre rendez-vous"
        ctaHref="#contact"
      />
      <main className="relative">
        {/* Hero Section */}
        <Hero 
          profession="maçon"
          professionColor="#F59E0B" // text-amber-500
          region="Lyon"
          backgroundImage="/images/demo/macon-hero.jpg"
          services={[
            { label: "Construction neuve" },
            { label: "Rénovation" },
            { label: "Maçonnerie générale" },
            { label: "Aménagement extérieur" }
          ]}
          formTitle="Besoin d'un devis pour vos travaux ?"
        />

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos services de maçonnerie
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Des solutions complètes pour tous vos projets de construction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Construction neuve",
                  description: "Construction de maisons individuelles, extensions et bâtiments annexes.",
                  icon: "🏗️"
                },
                {
                  title: "Rénovation",
                  description: "Rénovation complète ou partielle de bâtiments anciens.",
                  icon: "🔨"
                },
                {
                  title: "Maçonnerie générale",
                  description: "Murs, fondations, dalles, chapes et travaux de gros œuvre.",
                  icon: "🧱"
                },
                {
                  title: "Aménagement extérieur",
                  description: "Terrasses, murets, allées et aménagements paysagers en pierre.",
                  icon: "🏞️"
                },
                {
                  title: "Isolation thermique",
                  description: "Isolation par l'extérieur et amélioration des performances énergétiques.",
                  icon: "🌡️"
                },
                {
                  title: "Ravalement de façade",
                  description: "Nettoyage, réparation et embellissement des façades.",
                  icon: "🏠"
                }
              ].map((service, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <Experience 
          title="l'expérience"
          subtitle="Mon Maçon"
          description="Avec notre service, vous recevrez des demandes de devis ciblées de clients potentiels précisément au moment où ils expriment leur besoin de vos services, et ce, 24 heures sur 24, 7 jours sur 7. Avec notre service, vous recevrez des demandes de devis ciblées de clients potentiels précisément au moment où ils expriment leur besoin de vos services, et ce, 24 heures sur 24, 7 jours sur 7."
          buttonText="Prendre Rendez-vous"
          buttonHref="#contact"
          mediaType="video"
          mediaUrl="/videos/macon-experience.mp4"
          mediaPlaceholder="/images/demo/macon-video.jpg"
          accentColor="#F59E0B" // Ambre pour maçon
        />

        {/* Projects Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos réalisations
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Découvrez quelques-uns de nos projets récents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Extension de maison",
                  location: "Lyon 5e",
                  image: "/images/demo/macon-project1.jpg"
                },
                {
                  title: "Rénovation complète",
                  location: "Villeurbanne",
                  image: "/images/demo/macon-project2.jpg"
                },
                {
                  title: "Construction neuve",
                  location: "Écully",
                  image: "/images/demo/macon-project3.jpg"
                },
                {
                  title: "Terrasse en pierre",
                  location: "Caluire",
                  image: "/images/demo/macon-project4.jpg"
                },
                {
                  title: "Mur de soutènement",
                  location: "Oullins",
                  image: "/images/demo/macon-project5.jpg"
                },
                {
                  title: "Rénovation façade",
                  location: "Lyon 3e",
                  image: "/images/demo/macon-project6.jpg"
                }
              ].map((project, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-slate-300">
                    {/* Image placeholder - in production, replace with actual images */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-600">
                      [Image: {project.title}]
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-sm text-slate-500">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Pourquoi nous choisir ?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Une équipe d'experts à votre service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Savoir-faire",
                  description: "Plus de 20 ans d'expérience dans le domaine de la maçonnerie."
                },
                {
                  title: "Qualité",
                  description: "Matériaux premium et techniques de construction éprouvées."
                },
                {
                  title: "Garantie",
                  description: "Garantie décennale sur tous nos travaux de construction."
                },
                {
                  title: "Accompagnement",
                  description: "Suivi personnalisé de votre projet de A à Z."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Demandez un devis gratuit
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Nous vous répondons sous 24h
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Votre projet
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Envoyer ma demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ce que disent nos clients
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Des témoignages de clients satisfaits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Pierre D.",
                  location: "Lyon 6e",
                  rating: 5,
                  text: "Travail remarquable pour l'extension de notre maison. Équipe sérieuse, respectueuse des délais et du budget. Je recommande vivement !"
                },
                {
                  name: "Lucie M.",
                  location: "Villeurbanne",
                  rating: 5,
                  text: "Rénovation complète de notre appartement ancien avec beaucoup de contraintes techniques. Le résultat est à la hauteur de nos attentes. Merci !"
                },
                {
                  name: "Jean-Paul B.",
                  location: "Écully",
                  rating: 5,
                  text: "Construction d'un mur de soutènement dans notre jardin en pente. Travail soigné, équipe à l'écoute et très professionnelle."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 italic mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner />
      </main>
      <Footer className="bg-slate-900" />
    </>
  );
}
