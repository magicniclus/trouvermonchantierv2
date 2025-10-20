"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function InternetSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Colonne gauche - Contenu */}
                    <motion.div 
                        className="space-y-8 text-slate-900"
                        initial={{ x: -100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Internet, votre meilleur apporteur d'affaires
                            </h2>
                            <div className="w-32 h-2 bg-yellow-400 rounded-full"></div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-lg leading-relaxed opacity-90">
                                    Avec mes services, vous recevrez des demandes de devis 
                                    ciblées de clients potentiels précisément au moment où ils 
                                    expriment leur besoin de vos services, et ce, 24 heures sur 24, 
                                    7 jours sur 7.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="opacity-90 leading-relaxed">
                                        <span className="font-semibold">Taux de conversion exceptionnel :</span> Je suis fiers d'offrir l'un des 
                                        taux de conversion les plus élevés du marché.
                                    </p>
                                </div>

                                <div>
                                    <p className="opacity-90 leading-relaxed">
                                        <span className="font-semibold">Flexibilité totale :</span> Sans engagement, vous offrant la liberté de 
                                        l'interrompre à tout moment.
                                    </p>
                                </div>

                                <div>
                                    <p className="opacity-90 leading-relaxed">
                                        <span className="font-semibold">Résultats concrets :</span> Préparez-vous à voir votre boîte mail se 
                                        remplir de demandes de devis détaillées et à recevoir des 
                                        appels quotidiens de prospects qualifiés désireux de collaborer 
                                        avec vous.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <p className="opacity-90 leading-relaxed">
                                        Grâce à internet, bénéficiez du meilleur taux de transformation 
                                        du marché sans la moindre concurrence sur vos prospects.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Colonne droite - Image */}
                    <motion.div 
                        className="relative"
                        initial={{ x: 100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <Image 
                            src="/images/desktop.png" 
                            alt="Interface desktop de gestion des prospects" 
                            width={600} 
                            height={400}
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
