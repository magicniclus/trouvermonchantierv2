"use client";

import Nav from "@/components/tailwindui/nav/Nav";
import Footer from "@/components/perso/footer/Footer";
import Banner from "@/components/perso/banner/Banner";
import ArticlesALaUne from "@/components/perso/content/ArticlesALaUne";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    entreprise: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          prenom: "",
          nom: "",
          email: "",
          entreprise: "",
          message: "",
        });
      } else {
        setSubmitError(data.error || "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      setSubmitError("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Nav />
      <main className="relative">
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                  Contactez-nous
                </h1>
                <p className="text-xl text-slate-600">
                  Posez-nous vos questions, un membre de l'équipe Coudac vous répondra sous 48h.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé avec succès !</h3>
                    <p className="text-gray-600 mb-6">Merci de nous avoir contactés. Un membre de l'équipe Coudac vous répondra sous 48h.</p>
                    <Button 
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom
                        </label>
                        <Input 
                          id="prenom" 
                          name="prenom" 
                          type="text" 
                          value={formData.prenom}
                          onChange={handleChange}
                          required 
                          className="w-full" 
                        />
                      </div>
                      <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <Input 
                          id="nom" 
                          name="nom" 
                          type="text" 
                          value={formData.nom}
                          onChange={handleChange}
                          required 
                          className="w-full" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="w-full" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-1">
                        Entreprise
                      </label>
                      <Input 
                        id="entreprise" 
                        name="entreprise" 
                        type="text" 
                        value={formData.entreprise}
                        onChange={handleChange}
                        className="w-full" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    {submitError && (
                      <div className="text-red-500 text-sm">
                        {submitError}
                      </div>
                    )}
                    
                    <div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <ArticlesALaUne />
        <Banner />
      </main>
      <Footer className="bg-slate-900" />
    </>
  );
}
