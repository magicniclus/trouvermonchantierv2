import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-gray-600 mb-8">
            Vous avez une question ou besoin d&apos;aide ? N&apos;hésitez pas à nous contacter via le formulaire ci-dessous.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
