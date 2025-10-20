"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function RentabiliteSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="bg-cyan-900 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Colonne gauche - Image */}
                    <motion.div 
                        className="relative"
                        initial={{ x: -100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Image 
                            src="/resultat.png" 
                            alt="Tableau de bord de rentabilité" 
                            width={600} 
                            height={400}
                            className=""
                        />
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
                                Devenez maître de votre rentabilité
                            </h2>
                            <div className="w-32 h-2 bg-yellow-400 rounded-full "></div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-lg leading-relaxed opacity-90">
                                    Optimisez la rentabilité de votre campagne avec une précision 
                                    inégalée. Soyez informé en temps réel de chaque contact 
                                    acquis grâce à la campagne.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Suivi et Développement :
                                    </h3>
                                    <p className="opacity-90 leading-relaxed">
                                        Traitez efficacement les demandes de devis pour accroître votre chiffre d'affaires. 
                                        Évaluez l'efficacité de votre investissement grâce à un reporting détaillé, 
                                        qui trace l'impact direct de la campagne sur vos résultats.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Flexibilité Budgétaire :
                                    </h3>
                                    <p className="opacity-90 leading-relaxed">
                                        Ajustez votre budget en continu pour l'aligner avec vos objectifs commerciaux 
                                        et les variations saisonnières de votre activité.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Transparence Totale :
                                    </h3>
                                    <p className="opacity-90 leading-relaxed">
                                        Grâce aux notifications instantanées des appels et des formulaires générés par la campagne, 
                                        ainsi qu'à un reporting dédié, vous avez une vision claire et précise de la rentabilité 
                                        de votre investissement. Cette transparence vous permet de prendre des décisions éclairées 
                                        pour optimiser vos stratégies marketing.
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
