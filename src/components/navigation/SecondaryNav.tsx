'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'

const SecondaryNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Solution', href: '/solution' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Secteurs', href: '/secteurs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white border-b border-slate-200/70 shadow-sm/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Trouver Mon Chantier" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Menu central - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton Mon Espace à droite - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/mon-espace"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-out shadow-sm hover:shadow-md"
            >
              <User className="w-4 h-4" />
              Mon Espace
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200/70 bg-white">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 hover:text-yellow-500 hover:bg-slate-50 block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200/70 mt-4">
                <Link
                  href="/mon-espace"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-out shadow-sm w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Mon Espace
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default SecondaryNav
