"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { addProspect } from "@/firebase/database"

// Fonction pour déterminer le secteur d'activité basé sur le code postal
const getSecteurFromCodePostal = (codePostal: string): string => {
    const dept = codePostal.substring(0, 2)
    
    // Mapping des départements vers les secteurs
    const secteurMapping: { [key: string]: string } = {
        // Auvergne-Rhône-Alpes
        '01': 'Auvergne-Rhône-Alpes', '03': 'Auvergne-Rhône-Alpes', '07': 'Auvergne-Rhône-Alpes',
        '15': 'Auvergne-Rhône-Alpes', '26': 'Auvergne-Rhône-Alpes', '38': 'Auvergne-Rhône-Alpes',
        '42': 'Auvergne-Rhône-Alpes', '43': 'Auvergne-Rhône-Alpes', '63': 'Auvergne-Rhône-Alpes',
        '69': 'Auvergne-Rhône-Alpes', '73': 'Auvergne-Rhône-Alpes', '74': 'Auvergne-Rhône-Alpes',
        
        // Bourgogne-Franche-Comté
        '21': 'Bourgogne-Franche-Comté', '25': 'Bourgogne-Franche-Comté', '39': 'Bourgogne-Franche-Comté',
        '58': 'Bourgogne-Franche-Comté', '70': 'Bourgogne-Franche-Comté', '71': 'Bourgogne-Franche-Comté',
        '89': 'Bourgogne-Franche-Comté', '90': 'Bourgogne-Franche-Comté',
        
        // Bretagne
        '22': 'Bretagne', '29': 'Bretagne', '35': 'Bretagne', '56': 'Bretagne',
        
        // Centre-Val de Loire
        '18': 'Centre-Val de Loire', '28': 'Centre-Val de Loire', '36': 'Centre-Val de Loire',
        '37': 'Centre-Val de Loire', '41': 'Centre-Val de Loire', '45': 'Centre-Val de Loire',
        
        // Corse
        '2A': 'Corse', '2B': 'Corse', '20': 'Corse',
        
        // Grand Est
        '08': 'Grand Est', '10': 'Grand Est', '51': 'Grand Est', '52': 'Grand Est',
        '54': 'Grand Est', '55': 'Grand Est', '57': 'Grand Est', '67': 'Grand Est',
        '68': 'Grand Est', '88': 'Grand Est',
        
        // Hauts-de-France
        '02': 'Hauts-de-France', '59': 'Hauts-de-France', '60': 'Hauts-de-France',
        '62': 'Hauts-de-France', '80': 'Hauts-de-France',
        
        // Île-de-France
        '75': 'Île-de-France', '77': 'Île-de-France', '78': 'Île-de-France',
        '91': 'Île-de-France', '92': 'Île-de-France', '93': 'Île-de-France',
        '94': 'Île-de-France', '95': 'Île-de-France',
        
        // Normandie
        '14': 'Normandie', '27': 'Normandie', '50': 'Normandie', '61': 'Normandie', '76': 'Normandie',
        
        // Nouvelle-Aquitaine
        '16': 'Nouvelle-Aquitaine', '17': 'Nouvelle-Aquitaine', '19': 'Nouvelle-Aquitaine',
        '23': 'Nouvelle-Aquitaine', '24': 'Nouvelle-Aquitaine', '33': 'Nouvelle-Aquitaine',
        '40': 'Nouvelle-Aquitaine', '47': 'Nouvelle-Aquitaine', '64': 'Nouvelle-Aquitaine',
        '79': 'Nouvelle-Aquitaine', '86': 'Nouvelle-Aquitaine', '87': 'Nouvelle-Aquitaine',
        
        // Occitanie (anciennement Midi-Pyrénées + Languedoc-Roussillon)
        '09': 'Occitanie', '11': 'Occitanie', '12': 'Occitanie', '30': 'Occitanie',
        '31': 'Occitanie', '32': 'Occitanie', '34': 'Occitanie', '46': 'Occitanie',
        '48': 'Occitanie', '65': 'Occitanie', '66': 'Occitanie', '81': 'Occitanie', '82': 'Occitanie',
        
        // Pays de la Loire
        '44': 'Pays de la Loire', '49': 'Pays de la Loire', '53': 'Pays de la Loire',
        '72': 'Pays de la Loire', '85': 'Pays de la Loire',
        
        // Provence-Alpes-Côte d'Azur
        '04': 'Provence-Alpes-Côte d\'Azur', '05': 'Provence-Alpes-Côte d\'Azur', '06': 'Provence-Alpes-Côte d\'Azur',
        '13': 'Provence-Alpes-Côte d\'Azur', '83': 'Provence-Alpes-Côte d\'Azur', '84': 'Provence-Alpes-Côte d\'Azur',
        
        // DOM-TOM
        '971': 'Guadeloupe', '972': 'Martinique', '973': 'Guyane', '974': 'La Réunion', '976': 'Mayotte'
    }
    
    return secteurMapping[dept] || 'Autre'
}

export default function HeroV2() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        telephone: "",
        entreprise: "",
        codePostal: "",
        metier: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validation des champs obligatoires
        if (!formData.nom || !formData.email || !formData.telephone || !formData.entreprise || !formData.codePostal || !formData.metier) {
            alert("Veuillez remplir tous les champs obligatoires.")
            return
        }

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            alert("Veuillez saisir une adresse email valide.")
            return
        }

        setIsSubmitting(true)
        
        try {
            // Séparer nom et prénom si possible
            const nomComplet = formData.nom.trim()
            const partiesNom = nomComplet.split(' ')
            const prenom = partiesNom.length > 1 ? partiesNom[0] : ""
            const nom = partiesNom.length > 1 ? partiesNom.slice(1).join(' ') : nomComplet

            // Préparer les données pour Firebase selon la structure existante
            const prospectData = {
                // Champs du formulaire
                Nom: nom,
                Prenom: prenom,
                Email: formData.email,
                Téléphone: formData.telephone,
                Entreprise: formData.entreprise,
                "Code postal": formData.codePostal,
                Metier: formData.metier,
                
                // Champs par défaut selon la structure existante
                Date: new Date(),
                Etape: "A contacter", // Étape par défaut
                RGPD: true, // Acceptation implicite par soumission du formulaire
                Commentaire: "", // Vide par défaut
                AnneeCreation: "",
                Certification: "",
                Garanties: "",
                Logo: false,
                NomEntreprise: formData.entreprise,
                NombreCollaborateurs: "1",
                Partenaire: "",
                Prestation: formData.metier,
                RaisonSociale: "",
                RayonIntervention: formData.codePostal,
                Secteur: getSecteurFromCodePostal(formData.codePostal),
                SitePret: false,
                SiteWebExistant: false,
                SiteWebURL: "",
                
                // Métadonnées
                source: "formulaire_hero",
                status: "nouveau"
            }

            console.log("Envoi des données vers Firebase:", prospectData)
            
            // Envoyer vers Firebase
            const prospectId = await addProspect(prospectData)
            console.log("Prospect créé avec l'ID:", prospectId)

            // Envoyer l'email de notification
            const emailData = {
                name: formData.nom,
                companyName: formData.entreprise,
                email: formData.email,
                phone: formData.telephone,
                metier: formData.metier
            }

            console.log("Envoi de l'email de notification:", emailData)
            
            const emailResponse = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            })

            if (emailResponse.ok) {
                console.log("Email de notification envoyé avec succès")
            } else {
                console.error("Erreur lors de l'envoi de l'email de notification")
            }
            
            // Rediriger vers la page de remerciement
            router.push("/merci")
            
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error)
            alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center text-slate-700">
                    {/* Colonne gauche - Contenu */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="space-y-6">
                            <motion.h1 
                                className="text-4xl lg:text-6xl font-bold text-slate-700 leading-tight"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            >
                                Trouver{" "}
                                <span className="underline decoration-yellow-400 decoration-4">
                                    des
                                </span>{" "}
                                <br/>
                                <span className="underline decoration-yellow-400 decoration-4">
                                    Chantiers
                                </span>
                            </motion.h1>
                            
                            <motion.div 
                                className="space-y-2"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            >
                                <p className="text-xl text-slate-700">
                                    Augmenter votre de CA mensuel de
                                </p>
                                <div className="text-3xl lg:text-4xl font-bold ">
                                    30 000€{" "}
                                    <span className="text-gray-700 font-normal">à</span>
                                    <br />
                                    400 000€
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    Efficace, fiable et continu
                                </p>
                            </motion.div>
                        </div>

                        <motion.div 
                            className="prose prose-gray max-w-none"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        >
                            <p className="text-gray-600 leading-relaxed">
                                Développez rapidement votre activité avec des prospects ultra qualifiés et prêts à signer. Obtenez des leads exclusifs et ciblés dans le bâtiment et la rénovation énergétique, avec un accompagnement stratégique personnalisé pour maximiser votre taux de conversion, sans engagement ni frais cachés.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Colonne droite - Formulaire */}
                    <motion.div 
                        className="bg-white rounded-lg shadow-lg p-8"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        {/* Étoiles et note */}
                        <div className="mb-6 text-center">
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Nos partenaires nous notent 4,9/5
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Rejoignez notre réseau exclusif
                            </h3>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Vous êtes professionel du bâtiment et vous recherchez de nouveaux chantiers ?
                            </h2>
                            <p className="text-sm text-gray-600">
                                Saisissez vos coordonnées et je vous contacterais afin que nous étudiions votre projet
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Nom, prénom"
                                value={formData.nom}
                                onChange={(e) => handleInputChange("nom", e.target.value)}
                                className="w-full"
                                required
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                                <Input
                                    type="tel"
                                    placeholder="Téléphone"
                                    value={formData.telephone}
                                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                                    required
                                />
                            </div>

                            <Input
                                placeholder="Nom d'entreprise"
                                value={formData.entreprise}
                                onChange={(e) => handleInputChange("entreprise", e.target.value)}
                                className="w-full"
                                required
                            />

                            <Input
                                placeholder="Code postal"
                                value={formData.codePostal}
                                onChange={(e) => handleInputChange("codePostal", e.target.value)}
                                className="w-full"
                                required
                            />

                            <Select onValueChange={(value) => handleInputChange("metier", value)} required>
                                <SelectTrigger className="w-full text-gray-500">
                                    <SelectValue placeholder="Métier principal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Architecte" className="text-gray-700">Architecte</SelectItem>
                                    <SelectItem value="Architecte d'intérieur" className="text-gray-700">Architecte d'intérieur</SelectItem>
                                    <SelectItem value="Ascensoriste" className="text-gray-700">Ascensoriste</SelectItem>
                                    <SelectItem value="Bricoleur" className="text-gray-700">Bricoleur</SelectItem>
                                    <SelectItem value="Carreleur" className="text-gray-700">Carreleur</SelectItem>
                                    <SelectItem value="Chauffagiste" className="text-gray-700">Chauffagiste</SelectItem>
                                    <SelectItem value="Couvreur - Charpentier" className="text-gray-700">Couvreur - Charpentier</SelectItem>
                                    <SelectItem value="Cuisiniste" className="text-gray-700">Cuisiniste</SelectItem>
                                    <SelectItem value="Décorateur - Architecte d'intérieur" className="text-gray-700">Décorateur - Architecte d'intérieur</SelectItem>
                                    <SelectItem value="Déménageur" className="text-gray-700">Déménageur</SelectItem>
                                    <SelectItem value="Diagnostiqueur immobilier" className="text-gray-700">Diagnostiqueur (immobilier, traitement, bureau d'études)</SelectItem>
                                    <SelectItem value="Ébéniste" className="text-gray-700">Ébéniste</SelectItem>
                                    <SelectItem value="Électricien" className="text-gray-700">Électricien</SelectItem>
                                    <SelectItem value="Entreprise de nettoyage" className="text-gray-700">Entreprise de nettoyage</SelectItem>
                                    <SelectItem value="Entreprise de rénovation" className="text-gray-700">Entreprise de rénovation</SelectItem>
                                    <SelectItem value="Entreprise de revêtement de sol" className="text-gray-700">Entreprise de revêtement de sol</SelectItem>
                                    <SelectItem value="Entrepreneur de bâtiment" className="text-gray-700">Entrepreneur de bâtiment</SelectItem>
                                    <SelectItem value="Étancheur" className="text-gray-700">Étancheur - Entreprise d'isolation</SelectItem>
                                    <SelectItem value="Ferronnier - Métallier - Zingueur" className="text-gray-700">Ferronnier - Métallier - Zingueur</SelectItem>
                                    <SelectItem value="Frigoriste" className="text-gray-700">Frigoriste</SelectItem>
                                    <SelectItem value="Funiste" className="text-gray-700">Funiste</SelectItem>
                                    <SelectItem value="Jardinier - Paysagiste" className="text-gray-700">Jardinier - Paysagiste</SelectItem>
                                    <SelectItem value="Maçon" className="text-gray-700">Maçon</SelectItem>
                                    <SelectItem value="Marbrier - Tailleur de pierre" className="text-gray-700">Marbrier - Tailleur de pierre</SelectItem>
                                    <SelectItem value="Menuisier" className="text-gray-700">Menuisier</SelectItem>
                                    <SelectItem value="Peintre" className="text-gray-700">Peintre</SelectItem>
                                    <SelectItem value="Pisciniste" className="text-gray-700">Pisciniste</SelectItem>
                                    <SelectItem value="Plaquiste" className="text-gray-700">Plaquiste</SelectItem>
                                    <SelectItem value="Plombier" className="text-gray-700">Plombier</SelectItem>
                                    <SelectItem value="Professionnel de la sécurité" className="text-gray-700">Professionnel de la sécurité - Services aux entreprises</SelectItem>
                                    <SelectItem value="Professionnel du traitement des nuisibles" className="text-gray-700">Professionnel du traitement des nuisibles</SelectItem>
                                    <SelectItem value="Serrurier" className="text-gray-700">Serrurier</SelectItem>
                                    <SelectItem value="Terrassier" className="text-gray-700">Terrassier</SelectItem>
                                    <SelectItem value="Vitrier - Miroitier" className="text-gray-700">Vitrier - Miroitier</SelectItem>
                                    <SelectItem value="Autre" className="text-gray-700">Autre</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-cyan-900 hover:bg-cyan-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3"
                            >
                                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                            </Button>

                            <div className="text-xs text-gray-500 text-center space-x-2">
                                <a href="/conditions-generales" className="underline hover:text-gray-700">
                                    Conditions générales
                                </a>
                                <span>et</span>
                                <a href="/politique-confidentialite" className="underline hover:text-gray-700">
                                    politique de confidentialité
                                </a>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
