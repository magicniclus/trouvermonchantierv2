import Footer from "../../components/perso/footer/Footer";
import Nav from "../../components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav />
      <main>
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-slate-700 flex flex-col items-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl max-w-[70%]">
              Conditions générales de vente
            </h1>
            <div className="w-full mt-16 text-sm">
              <p className="text-sm text-slate-600 mb-6">Dernière mise à jour : 1er octobre 2025</p>
              
              <p className="mt-3">
                Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre :
              </p>
              <p className="mt-3">
                <strong>Trouver Mon Chantier</strong><br />
                SIREN 832 414 650<br />
                Siège social : 22 Rue de Libourne, 33100 Bordeaux<br />
                (ci-après dénommée « le Prestataire »)
              </p>
              <p className="mt-3">
                et toute entreprise cliente souscrivant aux services proposés (ci-après « le Client »).
              </p>
              <p className="mt-3">
                Toute souscription implique l&apos;acceptation pleine et entière des présentes CGV.
              </p>

              <h3 className="text-lg font-semibold mt-7">Article 1 – Objet</h3>
              <p className="mt-3">
                Les présentes CGV définissent les conditions dans lesquelles le Prestataire fournit au Client :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>un site internet personnalisé et optimisé pour la génération de prospects,</li>
                <li>une ou plusieurs campagnes Google Ads géolocalisées,</li>
                <li>une assistance digitale (configuration Google My Business, suivi),</li>
                <li>un accompagnement en prospection digitale avec système de suivi et contrôle qualité.</li>
              </ul>
              <p className="mt-3">
                En contrepartie, le Client règle un abonnement mensuel ainsi que des commissions sur les contrats obtenus via le dispositif mis en place.
              </p>

              <h3 className="text-lg font-semibold mt-7">Article 2 – Abonnement mensuel</h3>
              <p className="mt-3">
                Le Client règle un abonnement mensuel de 29 € HT, payable d&apos;avance par prélèvement automatique via Stripe ou tout autre moyen prévu.
              </p>
              <p className="mt-3">Cet abonnement comprend :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>la création d&apos;un site internet à l&apos;image du Client, incluant jusqu&apos;à 3 allers-retours de modification à la livraison et 2 allers-retours de modification par an,</li>
                <li>la configuration d&apos;une campagne Google Ads sur le secteur géographique et le métier du Client,</li>
                <li>la possibilité de création d&apos;une fiche Google My Business,</li>
                <li>l&apos;utilisation du label « Certifié Trouver Mon Chantier » (réservé aux adhérents).</li>
              </ul>

              <h3 className="text-lg font-semibold mt-7">Article 3 – Commissions</h3>
              <p className="mt-3">
                En complément de l&apos;abonnement, le Client s&apos;engage à reverser au Prestataire une commission sur chaque contrat signé grâce aux prospects générés :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>5 % HT du montant TTC de tout devis signé avec un client provenant des landing pages et sites gérés directement par le Prestataire,</li>
                <li>3 % HT du montant TTC de tout devis signé avec un client provenant du site internet personnalisé fourni au Client.</li>
              </ul>
              <p className="mt-3"><strong>Modalités de règlement :</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Les commissions sont dues dans un délai de 15 jours suivant la validation du devis par le client final.</li>
                <li>Les paiements s&apos;effectuent par virement bancaire sur le compte indiqué par le Prestataire.</li>
                <li>Tout retard de paiement entraîne une pénalité de 10 % du montant dû par mois de retard.</li>
                <li>En cas de non-paiement répété, le Prestataire pourra suspendre immédiatement l&apos;accès au site et aux campagnes.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-7">Article 4 – Obligations du Client</h3>
              <p className="mt-3">Le Client s&apos;engage à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Fournir tous les documents administratifs et légaux nécessaires (Kbis, attestations, assurances).</li>
                <li>Tenir à jour les informations relatives à son entreprise.</li>
                <li>Traiter avec sérieux et professionnalisme l&apos;ensemble des prospects transmis.</li>
                <li>Informer le Prestataire de l&apos;issue de chaque contact client (appel, devis, rendez-vous) dans un délai de 48 heures maximum.</li>
                <li>Reverser les commissions dues conformément à l&apos;Article 3.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-7">Article 5 – Engagements du Prestataire</h3>
              <p className="mt-3">Le Prestataire s&apos;engage à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Créer et mettre en ligne le site internet du Client dans un délai raisonnable.</li>
                <li>Configurer et gérer les campagnes Google Ads selon le secteur d&apos;activité et la zone définis avec le Client.</li>
                <li>Garantir au Client un minimum de 5 prospects par mois en moyenne annuelle, sous réserve que le Client maintienne un budget publicitaire Google Ads de 10 €/jour minimum.</li>
                <li>Rembourser le Client en cas de non-respect de cette garantie, sauf cas de force majeure ou suspension volontaire des campagnes par le Client.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-7">Article 6 – Suivi et contrôle qualité</h3>
              <p className="mt-3">Le Prestataire se réserve le droit de :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>contacter directement les prospects générés afin de vérifier la qualité de leur traitement,</li>
                <li>demander au Client tout justificatif relatif à un devis ou contrat signé,</li>
                <li>auditer ponctuellement le respect des engagements contractuels.</li>
              </ul>
              <p className="mt-3">
                En cas de fraude avérée (non-déclaration d&apos;un contrat signé, fausse déclaration), le Prestataire pourra facturer au Client les commissions dues majorées de 20 %.
              </p>

              <h3 className="text-lg font-semibold mt-7">Article 7 – Propriété</h3>
              <p className="mt-3">
                Le site internet, les landing pages et les campagnes Google Ads créés par le Prestataire demeurent sa propriété.
              </p>
              <p className="mt-3">
                Le Client bénéficie d&apos;un droit d&apos;usage tant que l&apos;abonnement est actif.
              </p>
              <p className="mt-3">
                En cas de résiliation, le Client perd l&apos;accès à son site, ses campagnes et aux prospects générés.
              </p>

              <h3 className="text-lg font-semibold mt-7">Article 8 – Résiliation</h3>
              <p className="mt-3">Le contrat est sans engagement de durée.</p>
              <p className="mt-3">Le Client peut résilier à tout moment par simple notification écrite.</p>
              <p className="mt-3">En cas de résiliation, l&apos;accès au site et aux services est immédiatement interrompu.</p>
              <p className="mt-3">Le Prestataire peut résilier le contrat en cas de manquement grave du Client (non-paiement, fraude, atteinte à l&apos;image).</p>

              <h3 className="text-lg font-semibold mt-7">Article 9 – Responsabilités</h3>
              <p className="mt-3">
                Le Prestataire n&apos;est pas responsable des résultats commerciaux du Client, ceux-ci dépendant de nombreux facteurs indépendants (qualité du service du Client, concurrence locale, budget publicitaire).
              </p>
              <p className="mt-3">
                Le Prestataire ne pourra être tenu responsable d&apos;un préjudice indirect (perte de chiffre d&apos;affaires, perte de réputation).
              </p>
              <p className="mt-3">
                <strong>Limitation de responsabilité spécifique :</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Le Prestataire n&apos;est pas tenu de résultats concernant le volume de prospects fournis aux partenaires via les sites internet.</li>
                <li>Le Prestataire décline toute responsabilité concernant le manque de rigueur du Client en matière d&apos;assurances, de déclarations administratives, fiscales ou sociales, de conformité réglementaire ou de toute autre obligation légale incombant au Client dans le cadre de son activité professionnelle.</li>
                <li>Il appartient exclusivement au Client de s&apos;assurer de la validité et de la mise à jour de ses assurances, déclarations et obligations légales.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-7">Article 10 – Confidentialité et protection des données</h3>
              <p className="mt-3">Les données des prospects générés sont strictement confidentielles.</p>
              <p className="mt-3">Le Prestataire se réserve le droit de les utiliser dans le cadre du suivi qualité.</p>
              <p className="mt-3">Le traitement des données personnelles est conforme au RGPD.</p>

              <h3 className="text-lg font-semibold mt-7">Article 11 – Propriété intellectuelle</h3>
              <p className="mt-3">
                Le logo, le label « Trouver Mon Chantier » et tout contenu fourni par le Prestataire sont protégés par le droit de la propriété intellectuelle.
              </p>
              <p className="mt-3">Toute utilisation non autorisée constitue une contrefaçon passible de poursuites.</p>
              
              <h3 className="text-lg font-semibold mt-7">Article 12 – Droit de publicité</h3>
              <p className="mt-3">
                Le Client autorise expressément le Prestataire à utiliser, reproduire et diffuser :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Le nom commercial et la dénomination sociale du Client,</li>
                <li>Le logo et l&apos;identité visuelle du Client,</li>
                <li>Les images du site internet créé pour le Client,</li>
                <li>Toute autre image ou contenu visuel relatif à l&apos;activité du Client</li>
              </ul>
              <p className="mt-3">
                Cette autorisation s&apos;étend à tous les canaux de communication du Prestataire, notamment :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Les réseaux sociaux (Facebook, LinkedIn, Instagram, etc.),</li>
                <li>Les supports publicitaires (Google Ads, Facebook Ads, etc.),</li>
                <li>Le site internet du Prestataire,</li>
                <li>Les supports de communication commerciale (brochures, présentations, etc.)</li>
              </ul>
              <p className="mt-3">
                <strong>Limitation :</strong> Cette autorisation ne s&apos;étend pas aux résultats commerciaux ou financiers du Client, qui restent confidentiels sauf accord écrit préalable du Client.
              </p>
              <p className="mt-3">
                Cette autorisation est accordée pour la durée du contrat et peut être révoquée par le Client moyennant un préavis écrit de 30 jours.
              </p>

              <h3 className="text-lg font-semibold mt-7">Article 13 – Litiges</h3>
              <p className="mt-3">Les présentes CGV sont soumises au droit français.</p>
              <p className="mt-3">En cas de litige, compétence exclusive est attribuée aux tribunaux de Bordeaux.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
