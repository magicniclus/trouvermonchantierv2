"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ProspectsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="bg-cyan-900 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Colonne gauche - Image */}
                    <motion.div 
                        className="relative flex justify-center lg:justify-start"
                        initial={{ x: -100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative">
                            <Image 
                                src="/images/phone.png" 
                                alt="Interface mobile de gestion des prospects" 
                                width={400} 
                                height={600}
                                className="w-full max-w-sm h-auto"
                            />
                        </div>
                    </motion.div>

                    {/* Colonne droite - Contenu */}
                    <motion.div 
                        className="space-y-8 text-white"
                        initial={{ x: 100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Jusqu'à 40% de vos visiteurs en prospect
                            </h2>
                            <div className="w-32 h-2 bg-yellow-400 rounded-full"></div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-lg leading-relaxed opacity-90">
                                    Augmentez votre visibilité auprès des clients potentiels en 
                                    quête de vos services. Gagnez du trafic de qualité en 
                                    apparaissant sur Google et Facebook, les plateformes les plus 
                                    influentes du web.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Impact de la Recherche en Ligne :
                                    </h3>
                                    <p className="opacity-90 leading-relaxed">
                                        En France, 80% des consommateurs effectuent des recherches en ligne avant de 
                                        sélectionner un prestataire. Avec Google dominant plus de 
                                        90% du marché des moteurs de recherche, une absence sur 
                                        cette plateforme équivaut à céder un avantage considérable à 
                                        vos concurrents.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
