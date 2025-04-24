"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/modals/modal";
import { submitContactForm } from "@/services/contact.service";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.subject.trim() !== "" &&
      formData.content.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!auth.currentUser) {
        router.push("/auth");
        return;
      }

      const success = await submitContactForm(formData);
      if (success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          content: "",
        });
      } else {
        setError("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "User must be authenticated to submit a message") {
        router.push("/auth");
      } else {
        setError("Une erreur est survenue lors de l'envoi du message.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Téléphone (optionnel)
          </label>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sujet
          </label>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 border h-32 border-input block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <Modal
        isOpen={success}
        onClose={() => setSuccess(false)}
        title="Message envoyé"
        message="Votre message a été envoyé avec succès !"
        autoClose={true}
        autoCloseDelay={4000}
      />

      <Button
        type="submit"
        className="w-full mt-4"
        variant="default"
        size="lg"
        disabled={!isFormValid()}
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
