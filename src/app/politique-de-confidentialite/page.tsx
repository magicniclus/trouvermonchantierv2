"use client";

import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">
          Politique de Confidentialité
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            1. Introduction
          </h2>
          <p className="text-slate-600 mb-4">
            Trouver Mon Chantier s&apos;engage à protéger la vie privée des
            utilisateurs de notre site web. Cette politique de confidentialité
            explique comment nous collectons, utilisons et protégeons vos
            informations personnelles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            2. Collecte des Informations
          </h2>
          <p className="text-slate-600 mb-4">
            Nous collectons les informations suivantes lorsque vous utilisez
            notre service :
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4">
            <li>Nom et prénom</li>
            <li>Nom de l&apos;entreprise</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Métier/Profession</li>
            <li>Informations de navigation sur le site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            3. Utilisation des Informations
          </h2>
          <p className="text-slate-600 mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4">
            <li>Vous mettre en relation avec des clients potentiels</li>
            <li>Améliorer nos services</li>
            <li>Communiquer avec vous concernant nos services</li>
            <li>Personnaliser votre expérience utilisateur</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            4. Protection des Données
          </h2>
          <p className="text-slate-600 mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos informations contre tout accès, modification,
            divulgation ou destruction non autorisé. Vos données sont stockées
            sur des serveurs sécurisés et sont chiffrées lors de leur
            transmission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            5. Cookies
          </h2>
          <p className="text-slate-600 mb-4">
            Notre site utilise des cookies pour améliorer votre expérience de
            navigation. Vous pouvez configurer votre navigateur pour refuser les
            cookies, mais cela pourrait affecter certaines fonctionnalités du
            site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            6. Vos Droits
          </h2>
          <p className="text-slate-600 mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l&apos;effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            7. Contact
          </h2>
          <p className="text-slate-600 mb-4">
            Pour toute question concernant notre politique de confidentialité ou
            pour exercer vos droits, vous pouvez nous contacter à :
          </p>
          <p className="text-slate-600">
            Email : contact@maprimerenov-info.org
            <br />
            Adresse : 31000 Toulouse, France
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            8. Modifications
          </h2>
          <p className="text-slate-600 mb-4">
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Les modifications entrent en vigueur
            dès leur publication sur le site.
          </p>
          <p className="text-slate-600">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </section>
      </div>
      <Footer className="bg-slate-900" />
    </>
  );
}
