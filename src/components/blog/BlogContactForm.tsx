'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { addProspect } from '@/firebase/database'
import { sendProspectNotification } from '@/utils/sendgrid'
import { toast } from '@/components/ui/use-toast'

const BlogContactForm = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    metier: '',
    ville: '',
    message: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Afficher un toast de chargement
      toast({
        title: "Envoi en cours",
        description: "Nous traitons votre demande...",
      });

      console.log('🔥 [BlogContactForm] Envoi des données du formulaire:', formData);

      // Créer l'objet de données pour Firebase
      const nameParts = formData.nom.split(' ');
      const prospectData = {
        "Nom": nameParts.slice(1).join(' ') || nameParts[0],
        "Prenom": nameParts[0],
        "Email": formData.email,
        "Téléphone": formData.telephone,
        "Entreprise": "", // Pas de champ entreprise dans le formulaire blog
        "Metier": formData.metier,
        "Code postal": formData.ville, // Utilisation du champ ville comme code postal
        "Etape": "A contacter",
        "Date": new Date(),
        "RGPD": true,
        "Commentaire": `Prospect depuis formulaire Blog - Message: ${formData.message || 'Aucun message'}`
      };
      
      console.log('🔥 [BlogContactForm] Données à envoyer à Firebase:', JSON.stringify(prospectData, null, 2));
      
      let success = false;
      
      // Envoyer les données à Firebase
      try {
        console.log('🔥 [BlogContactForm] Tentative d\'envoi à Firebase...');
        const prospectId = await addProspect(prospectData);
        console.log('🔥 [BlogContactForm] Prospect créé avec succès dans Firebase avec l\'ID:', prospectId);
        success = true;
      } catch (error) {
        console.error('🔥 [BlogContactForm] Erreur lors de l\'envoi à Firebase:', error);
      }
      
      // Envoyer l'email de notification si Firebase a réussi
      if (success) {
        try {
          console.log('🔥 [BlogContactForm] Envoi de l\'email de notification...');
          const emailSent = await sendProspectNotification({
            name: formData.nom,
            companyName: "", // Pas de champ entreprise
            email: formData.email,
            phone: formData.telephone,
            metier: formData.metier,
            postalCode: formData.ville,
          });

          if (emailSent) {
            console.log('🔥 [BlogContactForm] Email de notification envoyé avec succès');
          } else {
            console.warn('🔥 [BlogContactForm] L\'email de notification n\'a pas pu être envoyé');
          }
        } catch (emailError) {
          console.error('🔥 [BlogContactForm] Erreur lors de l\'envoi de l\'email:', emailError);
          // Ne pas faire échouer le processus si l'email échoue
        }
      }
      
      // Afficher le toast approprié en fonction du résultat
      if (success) {
        toast({
          title: "Succès",
          description: "Votre demande a été envoyée avec succès.",
        });
        
        // Redirection vers la page de remerciement
        const queryParams = new URLSearchParams({
          email: formData.email,
          metier: formData.metier,
          telephone: formData.telephone,
          name: formData.nom,
          companyName: "", // Pas de champ entreprise
          postalCode: formData.ville
        });
        
        router.push(`/merci?${queryParams.toString()}`);
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'enregistrement de vos données. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("🔥 [BlogContactForm] Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100/50 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="bg-white rounded-2xl shadow-xl/10 ring-1 ring-slate-200/60 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Colonne gauche - Informations */}
            <div className="bg-slate-900 p-8 lg:p-12 text-white">
              <div className="mb-10">
                <div className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-medium text-yellow-300 mb-6">
                  💬 Contact
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-tight">
                  Prêt à développer votre activité ?
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Discutons de vos besoins et découvrez comment notre solution 
                  peut vous aider à attirer plus de clients qualifiés.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-medium">Appelez-nous</div>
                    <div className="text-slate-400 text-sm">01 23 45 67 89</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-medium">Écrivez-nous</div>
                    <div className="text-slate-400 text-sm">contact@trouvermonchantier.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-medium">Partout en France</div>
                    <div className="text-slate-400 text-sm">Service disponible nationalement</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <div className="text-yellow-300 font-medium text-sm mb-1">
                  ⚡ Réponse sous 24h garantie
                </div>
                <div className="text-slate-400 text-xs">
                  Notre équipe vous recontacte rapidement
                </div>
              </div>
            </div>

            {/* Colonne droite - Formulaire */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  Demandez votre devis gratuit
                </h4>
                <p className="text-slate-600">
                  Remplissez le formulaire et nous vous recontactons sous 24h
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="metier" className="block text-sm font-medium text-slate-700 mb-2">
                      Votre métier *
                    </label>
                    <select
                      id="metier"
                      name="metier"
                      required
                      value={formData.metier}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="electricien">Électricien</option>
                      <option value="plombier">Plombier</option>
                      <option value="menuisier">Menuisier</option>
                      <option value="peintre">Peintre</option>
                      <option value="couvreur">Couvreur</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="ville" className="block text-sm font-medium text-slate-700 mb-2">
                    Ville d'intervention *
                  </label>
                  <input
                    type="text"
                    id="ville"
                    name="ville"
                    required
                    value={formData.ville}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    placeholder="Paris, Lyon, Marseille..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors resize-none"
                    placeholder="Parlez-nous de vos besoins..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span className="text-white">Demander un devis gratuit</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>

                <p className="text-xs text-slate-500 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogContactForm
