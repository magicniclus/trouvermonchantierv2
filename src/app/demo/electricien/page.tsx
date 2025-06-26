import Nav from "@/components/tailwindui/nav/Nav";
import Footer from "@/components/perso/footer/Footer";
import Banner from "@/components/perso/banner/Banner";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function ElectricienDemo() {
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
              src="/images/demo/electricien-hero.jpg"
              alt="Installation électrique"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Électricien professionnel à <span className="text-yellow-500">Marseille</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-10">
              Installation, rénovation et dépannage électrique par des experts certifiés
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
                Plus de 500 interventions réussies
              </span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos services électriques
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Des solutions complètes pour tous vos besoins en électricité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Installation électrique",
                  description: "Installation complète pour constructions neuves ou rénovations.",
                  icon: "⚡"
                },
                {
                  title: "Mise aux normes",
                  description: "Mise en conformité de votre installation selon les normes NF C 15-100.",
                  icon: "✓"
                },
                {
                  title: "Dépannage d'urgence",
                  description: "Intervention rapide pour tout problème électrique 7j/7.",
                  icon: "🔧"
                },
                {
                  title: "Domotique",
                  description: "Installation de systèmes domotiques pour une maison connectée.",
                  icon: "🏠"
                },
                {
                  title: "Éclairage",
                  description: "Installation et optimisation de solutions d'éclairage intérieur et extérieur.",
                  icon: "💡"
                },
                {
                  title: "Bornes de recharge",
                  description: "Installation de bornes de recharge pour véhicules électriques.",
                  icon: "🔌"
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

        {/* Certifications Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nos certifications
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Garantie de qualité et de sécurité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Qualifélec",
                  description: "Qualification professionnelle des entreprises de l'équipement électrique."
                },
                {
                  title: "RGE",
                  description: "Reconnu Garant de l'Environnement pour les travaux d'économie d'énergie."
                },
                {
                  title: "IRVE",
                  description: "Infrastructure de Recharge pour Véhicules Électriques."
                },
                {
                  title: "Assurance décennale",
                  description: "Garantie de nos travaux pendant 10 ans."
                }
              ].map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{cert.title.substring(0, 1)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{cert.title}</h3>
                  <p className="text-slate-600">{cert.description}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Expertise",
                  description: "Plus de 15 ans d'expérience dans le domaine de l'électricité.",
                  icon: "🏆"
                },
                {
                  title: "Réactivité",
                  description: "Intervention rapide sous 24h et service d'urgence disponible.",
                  icon: "⏱️"
                },
                {
                  title: "Transparence",
                  description: "Devis détaillés et tarifs clairs sans mauvaises surprises.",
                  icon: "📝"
                },
                {
                  title: "Sécurité",
                  description: "Respect strict des normes de sécurité électrique en vigueur.",
                  icon: "🔒"
                },
                {
                  title: "Garantie",
                  description: "Tous nos travaux sont garantis pour votre tranquillité.",
                  icon: "✅"
                },
                {
                  title: "Satisfaction",
                  description: "98% de nos clients sont satisfaits et nous recommandent.",
                  icon: "😊"
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-4">{item.icon}</div>
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
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Service souhaité
                  </label>
                  <div className="mt-1">
                    <select
                      id="service"
                      name="service"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="installation">Installation électrique</option>
                      <option value="renovation">Rénovation électrique</option>
                      <option value="depannage">Dépannage</option>
                      <option value="domotique">Domotique</option>
                      <option value="eclairage">Éclairage</option>
                      <option value="borne">Borne de recharge</option>
                    </select>
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
                  name: "Michel R.",
                  location: "Marseille 8e",
                  rating: 5,
                  text: "Intervention rapide et efficace pour un problème électrique urgent. Technicien compétent et sympathique. Je recommande vivement !"
                },
                {
                  name: "Sophie L.",
                  location: "Aix-en-Provence",
                  rating: 5,
                  text: "Rénovation complète de l'électricité de notre appartement ancien. Travail soigné, respect des délais et prix très correct."
                },
                {
                  name: "Antoine M.",
                  location: "Marseille 12e",
                  rating: 5,
                  text: "Installation d'une borne de recharge pour ma voiture électrique. Conseils pertinents et installation impeccable. Merci !"
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
