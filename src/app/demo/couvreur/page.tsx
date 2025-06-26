import Nav from "@/components/tailwindui/nav/Nav";
import Footer from "@/components/perso/footer/Footer";
import Banner from "@/components/perso/banner/Banner";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function CouvreurDemo() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="relative">
        {/* Hero Section */}
        <section className="relative bg-slate-900 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/demo/couvreur-hero.jpg"
              alt="Toiture en rénovation"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Couvreur professionnel à <span className="text-yellow-500">Paris</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-10">
              Rénovation, réparation et entretien de toiture par des experts qualifiés
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Demander un devis gratuit
              </a>
              <a
                href="#services"
                className="bg-white hover:bg-gray-100 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
              >
                Nos services
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="ml-3 text-white">
                Plus de 150 clients satisfaits
              </span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos services de couverture
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Des solutions complètes pour tous vos besoins en toiture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Rénovation de toiture",
                  description: "Rénovation complète ou partielle de votre toiture avec des matériaux de qualité.",
                  icon: "🏠"
                },
                {
                  title: "Réparation de fuites",
                  description: "Détection et réparation rapide des fuites et infiltrations d'eau.",
                  icon: "💧"
                },
                {
                  title: "Installation de gouttières",
                  description: "Installation et remplacement de systèmes de gouttières adaptés à votre toiture.",
                  icon: "🔧"
                },
                {
                  title: "Isolation de combles",
                  description: "Amélioration de l'isolation thermique de votre maison pour des économies d'énergie.",
                  icon: "❄️"
                },
                {
                  title: "Nettoyage de toiture",
                  description: "Élimination de la mousse, des lichens et des débris pour prolonger la durée de vie de votre toit.",
                  icon: "🧹"
                },
                {
                  title: "Pose de velux",
                  description: "Installation de fenêtres de toit pour apporter plus de lumière naturelle.",
                  icon: "🪟"
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

        {/* Why Choose Us Section */}
        <section className="py-16 bg-slate-50">
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
                  title: "Expertise",
                  description: "Plus de 15 ans d'expérience dans le domaine de la couverture."
                },
                {
                  title: "Qualité",
                  description: "Utilisation exclusive de matériaux de haute qualité et durables."
                },
                {
                  title: "Garantie",
                  description: "Garantie décennale sur tous nos travaux de toiture."
                },
                {
                  title: "Réactivité",
                  description: "Intervention rapide en cas d'urgence, 7j/7."
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
        <section id="contact" className="py-16 bg-white">
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
        <section className="py-16 bg-slate-50">
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
                  name: "Marie D.",
                  location: "Paris 15e",
                  rating: 5,
                  text: "Excellent travail pour la rénovation complète de ma toiture. Équipe professionnelle, respectueuse des délais et très propre. Je recommande vivement !"
                },
                {
                  name: "Thomas L.",
                  location: "Paris 18e",
                  rating: 5,
                  text: "Intervention rapide suite à une fuite. Diagnostic précis et réparation efficace. Très satisfait du service et du rapport qualité-prix."
                },
                {
                  name: "Sophie M.",
                  location: "Paris 12e",
                  rating: 5,
                  text: "Installation de velux parfaitement réalisée. La luminosité de mes combles a été transformée. Merci pour vos conseils et votre professionnalisme."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
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
