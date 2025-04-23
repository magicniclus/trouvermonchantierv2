import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="space-y-6">
        <div className="">
          <h3 className="text-lg font-medium mb-4">Formulaire de contact</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
