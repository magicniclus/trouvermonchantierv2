"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

// Fonction pour le scroll smooth vers une section
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        })
    }
}

export default function Navigation() {
    return (
        <motion.nav 
            className="bg-white border-b border-gray-200"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/logo.png" alt="Logo" width={120} height={120} />
                        </Link>
                    </motion.div>

                    {/* Menu */}
                    <motion.div 
                        className="flex items-center space-x-6"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        {/* Boutons d'ancrage pour les sections */}
                        <button 
                            onClick={() => scrollToSection('comment-ca-marche')}
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                        >
                            Comment ça marche
                        </button>
                        <button 
                            onClick={() => scrollToSection('qui-suis-je')}
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                        >
                            Qui suis-je 
                        </button>
                        <button 
                            onClick={() => scrollToSection('temoignages')}
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                        >
                            Témoignages
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    )
}
