import Link from 'next/link'

const SecondaryFooter = () => {
  const navigationLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Solution', href: '/solution' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Secteurs', href: '/secteurs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Devenir partenaire', href: '/devenir-partenaire' },
    { name: 'Contact', href: '/contact' },
  ]

  const metiersLinks = [
    { name: 'Trouver des chantiers en menuiserie', href: '/blog/comment-trouver-clients-menuisier-2024' },
    { name: 'Trouver des chantiers en électricité', href: '/blog/comment-trouver-clients-electricien-2024' },
    { name: 'Trouver des chantiers en isolation', href: '/blog/comment-trouver-clients-isolation-2024' },
    { name: 'Trouver des chantiers en plomberie', href: '/blog/comment-trouver-clients-plombier-2024' },
    { name: 'Trouver des chantiers en peinture', href: '/blog/comment-trouver-clients-peintre-2024' },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-yellow-500 transition-colors duration-200 ease-out text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Métiers couverts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              Métiers couverts
            </h3>
            <ul className="space-y-3">
              {metiersLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-yellow-500 transition-colors duration-200 ease-out text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              À propos
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Trouver Mon Chantier aide les artisans à générer leurs propres clients 
                grâce à Google Ads. Service sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs">
                <Link
                  href="/mentions-legales"
                  className="text-slate-400 hover:text-yellow-500 transition-colors duration-200"
                >
                  Mentions légales
                </Link>
                <span className="hidden sm:inline text-slate-600">|</span>
                <Link
                  href="/politique-confidentialite"
                  className="text-slate-400 hover:text-yellow-500 transition-colors duration-200"
                >
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <div className="lg:mt-8">
              <Link
                href="/tarifs"
                className="inline-block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl text-center transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="text-white">Créer mon site maintenant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex items-center justify-center sm:justify-start">
            <img 
              src="/logo.png" 
              alt="Trouver Mon Chantier" 
              className="h-8 w-auto mr-3 brightness-0 invert"
            />
            <span className="text-slate-400 text-sm">
              © 2024 Trouver Mon Chantier. Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SecondaryFooter
