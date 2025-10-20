"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function QuiSuisJeSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {/* Header */}
                    <motion.div 
                        className="space-y-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                            Qui suis-je ?
                        </h2>
                        <div className="w-32 h-2 bg-yellow-400 rounded-full"></div>
                    </motion.div>

                    {/* Contenu principal */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Colonne gauche - Texte */}
                        <motion.div 
                            className="space-y-6"
                            initial={{ x: -100, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900">Nicolas CASTERA</h3>
                                <div className="flex items-center space-x-2 text-slate-600">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <span>Bordeaux</span>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-700 leading-relaxed">
                                    Expert en direction commerciale et stratégie d'acquisition client, 
                                    basé à Bordeaux. Fort de plus de 10 ans d'expérience auprès des 
                                    plus grands dans l'optimisation de l'acquisition client pour plus de 5000 clients, 
                                    je me consacre aujourd'hui à l'accompagnement sur mesure des professionnels du bâtiment 
                                    et de la rénovation énergétique.
                                </p>
                                
                                <p className="text-slate-700 leading-relaxed">
                                    En collaboration avec mon équipe, développeur média buyer reconnu dans le secteur 
                                    depuis plus de 10 ans, nous avons développé une expertise 
                                    unique dans la génération de leads ultra qualifiés. Notre 
                                    approche combine ma vision stratégique commerciale et son 
                                    savoir-faire technique pour créer des campagnes d'acquisition 
                                    hautement performantes.
                                </p>
                                
                                <p className="text-slate-700 leading-relaxed">
                                    Nous garantissons des résultats concrets avec un excellent taux de conversion, vous 
                                    permettant d'accroître significativement votre portefeuille 
                                    clients et votre chiffre d'affaires, le tout avec une transparence 
                                    totale et sans engagement contraignant.
                                </p>
                            </div>
                        </motion.div>

                        {/* Colonne droite - Photo */}
                        <motion.div 
                            className="flex justify-center lg:justify-end"
                            initial={{ x: 100, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            <div className="relative">
                                <Image 
                                    src="/images/moi2.png" 
                                    alt="Nicolas CASTERA" 
                                    width={320} 
                                    height={320}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Cartes d'expertise */}
                    <motion.div 
                        className="grid md:grid-cols-3 gap-6 mt-16"
                        initial={{ y: 50, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <div className="bg-cyan-900 text-white p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-center">Expertise</h3>
                            <p className="text-sm leading-relaxed text-center opacity-90">
                                Fort de plus de 10 ans d'expérience auprès des plus grands dans l'optimisation de l'acquisition client pour plus de 5000 clients, 
                                je vous propose un accompagnement stratégique sur mesure dans le secteur du bâtiment et de la rénovation énergétique.
                            </p>
                        </div>

                        <div className="bg-cyan-900 text-white p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-center">Performance</h3>
                            <p className="text-sm leading-relaxed text-center opacity-90">
                                Grâce à notre expertise combinée et à notre partenariat avec un développeur média buyer spécialisé depuis plus de 10 ans dans le secteur, nous vous garantissons l'acquisition de leads ultra qualifiés pour maximiser votre taux de conversion.
                            </p>
                        </div>

                        <div className="bg-cyan-900 text-white p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-center">Rentabilité</h3>
                            <p className="text-sm leading-relaxed text-center opacity-90">
                                Optimisez votre investissement marketing avec notre approche éprouvée qui génère des prospects ciblés et à fort potentiel, vous permettant d'augmenter significativement votre chiffre d'affaires sans engagement ni frais cachés.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
