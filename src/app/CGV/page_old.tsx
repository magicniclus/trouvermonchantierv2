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
              <p className="text-sm text-slate-600 mb-6">Dernière mise à jour : [date]</p>
              
              <p className="mt-3">
                Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre :
              </p>
              <p className="mt-3">
                <strong>Trouver Mon Chantier</strong><br />
                Entreprise individuelle – SIREN 832 414 650<br />
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

              <h3 className="text-lg font-semibold mt-7">Article 10 – Confidentialité et protection des données</h3>
              <p className="mt-3">Les données des prospects générés sont strictement confidentielles.</p>
              <p className="mt-3">Le Prestataire se réserve le droit de les utiliser dans le cadre du suivi qualité.</p>
              <p className="mt-3">Le traitement des données personnelles est conforme au RGPD.</p>

              <h3 className="text-lg font-semibold mt-7">Article 11 – Propriété intellectuelle</h3>
              <p className="mt-3">
                Le logo, le label « Trouver Mon Chantier » et tout contenu fourni par le Prestataire sont protégés par le droit de la propriété intellectuelle.
              </p>
              <p className="mt-3">Toute utilisation non autorisée constitue une contrefaçon passible de poursuites.</p>

              <h3 className="text-lg font-semibold mt-7">Article 12 – Litiges</h3>
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
                l’inscription réalisée et finalisée sur notre Site sera
                reconnue, sous réserve de l’acceptation sans réserve des
                présentes Conditions Générales par le Client.
              </p>
              <p className="mt-3">
                Pour s’inscrire aux Services, le Client doit obligatoirement
                créer un compte personnel. L’accès à ce compte est sécurisé par
                une identification unique, comprenant une adresse email et un
                mot de passe spécifiques au Client.
              </p>
              <p className="mt-3">
                Le processus d’inscription comprend la lecture et l’acceptation
                des Conditions Générales actuelles, suivie d’une confirmation
                explicite de cette acceptation par le Client au moment du
                paiement de la commande. Il est vivement recommandé aux Clients
                de lire attentivement ces Conditions, disponibles en tout temps
                sur le Site pour consultation, reproduction, et conservation.
              </p>
              <p className="mt-3">
                2.2 Suite à l’inscription, l’Entreprise envoie automatiquement
                un email au Client, confirmant la souscription aux Services et
                incluant les identifiants de connexion (code d’accès et mot de
                passe), envoyés à l’adresse email utilisée pour la création du
                compte. Ces identifiants sont personnels, secrets, et
                confidentiels.
              </p>
              <p className="mt-3">
                Il est impératif de ne pas divulguer ces identifiants à des
                tiers. L’Entreprise décline toute responsabilité en cas
                d’utilisation non autorisée du compte Client suite à la
                divulgation volontaire ou à la négligence du Client concernant
                la sécurité de ses identifiants. En cas d’accès non autorisé ou
                d’utilisation suspecte du compte, le Client doit en informer
                immédiatement l’Entreprise.
              </p>
              <p className="mt-3">
                En l’absence de réception de l’email de confirmation, le Client
                est invité à contacter l’Entreprise via l’adresse email
                contact@trouver-mon-chantier.fr et à vérifier le dossier de
                courriers indésirables (« spam »).
              </p>
              <p className="mt-3">
                L’Entreprise se réserve le droit de refuser l’inscription d’un
                Client pour tout motif légitime, en particulier si les
                informations fournies sont jugées non conformes aux présentes
                Conditions Générales.
              </p>
              <p className="mt-3">
                2.3 Pour résilier son inscription aux Services, le Client doit
                envoyer un email à l’adresse contact@trouver-mon-chantier.fr ou
                procéder à la désinscription directement depuis son espace
                client. La résiliation sera effective le mois suivant la
                demande, mettant fin aux services décrits à l’article 4. Un
                email de confirmation de la désinscription sera envoyé au
                Client, à l’adresse email associée à son compte.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                3. Conditions de Paiement et Sécurisation
              </h3>
              <p className="mt-3">
                3.1 L’inscription aux Services est considérée comme
                définitivement actée pour une période indéterminée dès sa
                validation, jusqu’à ce que le Client procède à la résiliation de
                son abonnement.
              </p>
              <p className="mt-3">
                Conformément à l’article L.121-20-2 du Code de la consommation,
                les Services démarrant avant l’expiration du délai de
                rétractation de quatorze jours, le droit de rétractation ne peut
                être exercé.
              </p>
              <p className="mt-3">
                Les frais liés à l’inscription et à l’abonnement mensuel sont
                non remboursables. Le paiement s’effectue par carte bancaire via
                un système de paiement sécurisé.
              </p>
              <p className="mt-3">
                Les tarifs indiqués sont en euros, TTC. L’Entreprise se réserve
                le droit de modifier les prix à tout moment, les tarifs
                applicables étant ceux en vigueur au moment de l’inscription du
                Client.
              </p>
              <p className="mt-3">
                3.2 Les paiements sur le Site sont sécurisés par le protocole
                SSL, garantissant une protection optimale des données bancaires
                du Client.
              </p>
              <p className="mt-3">
                3.3 Conditions de Remboursement des Frais d&apos;Inscription{" "}
                <br />
                En cas de refus de l&apos;administration à la création
                d&apos;entreprise pour le client, les frais d&apos;inscription
                de 69€ au régime d&apos;auto-entrepreneur lui seront
                intégralement remboursés si les conditions suivantes sont
                respectées : <br />
                -Le client n&apos;est pas d&apos;origine étrangère à la France.{" "}
                <br />
                -Le client ne possède pas déjà une entreprise ou
                auto-entreprise. <br />
                -Le client ne possède pas de casier judiciaire. <br />
                -Le client habite sur le territoire Français. <br />
                -Toute autre condition jugée pertinente par l&apos;entreprise.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                4. Accès aux Services
              </h3>
              <p className="mt-3">
                L’inscription donne accès à une variété de services dédiés à la
                mise en relation entre les professionnels du bâtiment et les
                particuliers ou entreprises ayant des projets de construction ou
                de rénovation, incluant la vérification et la transmission du
                dossier d’inscription, l’utilisation d’outils de gestion de
                devis et factures, ainsi qu’un support client dédié pour toute
                question relative à la gestion de ces projets.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                5. Collaboration du Client
              </h3>
              <p className="mt-3">
                Le Client s&apos;engage à fournir des informations exactes,
                actuelles, et complètes concernant ses données personnelles, y
                compris et surtout son adresse email, qui doit être valide et
                active, lors de son inscription sur trouver-mon-chantier.fr. La
                communication principale entre trouver-mon-chantier.fr et le
                Client se faisant par voie électronique, il est crucial que le
                Client maintienne à jour ses informations de contact. Toute
                modification de ces informations devra être communiquée sans
                délai à trouver-mon-chantier.fr par le Client.
              </p>
              <p className="mt-3">
                En cas de demande spécifique de trouver-mon-chantier.fr, le
                Client s&apos;engage à répondre et à fournir les informations ou
                documents requis dans les plus brefs délais.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                6. Limitation de Responsabilité
              </h3>
              <p className="mt-3">
                6.1. Trouver-mon-chantier.fr n&apos;endosse aucune
                responsabilité pour les pertes économiques, financières ou
                commerciales subies par les Clients découlant directement ou
                indirectement de l&apos;utilisation du Site.
              </p>
              <p className="mt-3">
                6.2. Le Client est seul responsable des requêtes qu&apos;il
                effectue, de l&apos;exploitation des réponses obtenues et des
                conséquences directes ou indirectes de cette utilisation. Il
                incombe au Client d&apos;utiliser le Site conformément aux lois
                et réglementations applicables. Trouver-mon-chantier.fr ne
                saurait être tenu pour responsable de dommages de quelque nature
                que ce soit découlant de l&apos;utilisation des informations et
                services fournis.
              </p>
              <p className="mt-3">
                6.3. La responsabilité totale de trouver-mon-chantier.fr
                vis-à-vis des Clients, pour toute cause et tout dommage
                confondu, est limitée au montant total payé par le Client pour
                les services sur une période annuelle.
              </p>
              <p className="mt-3">
                6.4. Trouver-mon-chantier.fr ne peut être tenu pour responsable
                en cas d’utilisation du Site non conforme aux présentes
                Conditions Générales, de la non-conformité de l’activité du
                Client au statut d&apos;auto-entrepreneur, des cas de force
                majeure ou des actions imprévisibles et insurmontables de tiers.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                7. Disponibilité et Maintenance du Site
              </h3>
              <p className="mt-3">
                Trouver-mon-chantier.fr s&apos;efforce d&apos;assurer
                l&apos;accès au Site 24 heures sur 24 et 7 jours sur 7, excepté
                lors des périodes de maintenance nécessaire au bon
                fonctionnement du Site et/ou des serveurs. L&apos;accès au Site
                peut être temporairement suspendu pour des raisons de
                maintenance sans que cela n&apos;ouvre droit à une quelconque
                compensation pour le Client. Les opérations de maintenance
                inattendues peuvent survenir sans notification préalable, ce que
                le Client reconnaît et accepte.
              </p>
              <p className="mt-3">
                Dans l&apos;éventualité d&apos;une cessation définitive de
                l&apos;activité du Site et des services, trouver-mon-chantier.fr
                informera le Client par email, lui permettant de télécharger ses
                données stockées en ligne dans un délai de 30 jours. Passé ce
                délai, sans action de la part du Client pour récupérer ses
                données, il perd tout droit d&apos;accès et ne pourra prétendre
                à aucun dédommagement.
              </p>
              <p className="mt-3">
                Le Client reconnaît être au courant des limites et contraintes
                propres à internet et assume la responsabilité de sécuriser ses
                données, systèmes, et logiciels contre tout risque de virus ou
                tentative de piratage.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                8. Droits de Propriété Intellectuelle
              </h3>
              <p className="mt-3">
                8.1. Trouver-mon-chantier.fr détient tous les droits de
                propriété intellectuelle liés au site et à l&apos;ensemble de
                son contenu, incluant sans limitation les textes, graphiques,
                images, vidéos, logos, icônes, interfaces, et tout autre élément
                de propriété intellectuelle.
              </p>
              <p className="mt-3">
                8.2. L’accès au site trouver-mon-chantier.fr ne confère au
                Client aucun droit sur les éléments de propriété intellectuelle
                qui restent l’exclusivité de l&apos;entreprise XYZ.
              </p>
              <p className="mt-3">
                8.3. Il est strictement interdit au Client de reproduire,
                modifier, distribuer, ou utiliser de quelque manière que ce
                soit, tout ou partie du contenu du site sans l&apos;accord
                préalable écrit de l&apos;entreprise XYZ. Tout manquement à
                cette règle pourrait entraîner des poursuites judiciaires.
              </p>
              <p className="mt-3">
                8.4. Ces Conditions Générales ne doivent en aucun cas être
                interprétées comme octroyant des droits supplémentaires
                d’utilisation ou de propriété au Client ou à des tiers, en
                dehors de ce qui est expressément mentionné.
              </p>
              <p className="mt-3">
                8.5. Le Client assume l&apos;entière responsabilité de toute
                utilisation non autorisée du site et de son contenu.
              </p>
              <p className="mt-3">
                8.6. Trouver-mon-chantier.fr peut contenir des liens vers des
                sites tiers non gérés par l&apos;entreprise XYZ. Ces liens sont
                fournis pour la commodité du Client qui les utilise à ses
                propres risques.
              </p>
              <p className="mt-3">
                8.7. L&apos;entreprise XYZ n&apos;exerce aucun contrôle et ne
                participe pas à l&apos;élaboration des contenus ou des
                conditions d&apos;utilisation des sites tiers.
              </p>
              <p className="mt-3">
                8.8 à 8.10. Le Client reconnaît que l&apos;entreprise XYZ ne
                peut être tenu responsable du contenu ou des pratiques des sites
                tiers, ni endosser ou garantir leurs produits ou services.
              </p>
              <p className="mt-3">
                8.11. Tout lien vers trouver-mon-chantier.fr doit recevoir
                l&apos;approbation écrite de l&apos;entreprise XYZ, respecter
                les conditions définies et ne peut en aucun cas nuire à
                l&apos;image de l&apos;entreprise.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                9. Protection des Données Personnelles
              </h3>
              <p className="mt-3">
                9.1. L&apos;entreprise XYZ traite les données personnelles du
                Client dans le respect de la législation en vigueur, avec
                l&apos;objectif principal de fournir et optimiser les services
                proposés sur trouver-mon-chantier.fr.
              </p>
              <p className="mt-3">
                9.2. Le Client dispose à tout moment d&apos;un droit
                d&apos;accès, de modification, d&apos;opposition, et de
                suppression de ses données personnelles en contactant
                l&apos;entreprise XYZ à l&apos;adresse indiquée, en respectant
                les procédures légales.
              </p>
              <h3 className="text-lg font-semibold mt-7">10. Sous-traitance</h3>
              <p className="mt-3">
                Le Client accepte que l&apos;entreprise XYZ puisse engager des
                sous-traitants pour certaines tâches liées à la fourniture des
                services proposés sur trouver-mon-chantier.fr, et autorise la
                divulgation des informations nécessaires à ces sous-traitants.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                11. Assistance et Réclamations
              </h3>
              <p className="mt-3">
                Pour toute assistance technique ou question relative au
                fonctionnement de trouver-mon-chantier.fr, le Client est invité
                à contacter l&apos;entreprise XYZ via l&apos;email ou
                l&apos;adresse postale fournie, garantissant un support attentif
                et adapté à ses besoins.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                12. Dispositions Générales
              </h3>
              <p className="mt-3">12.1. Communication et Preuve</p>
              <p className="mt-3">
                L&apos;échange de correspondances entre trouver-mon-chantier.fr
                et le Client s&apos;effectue principalement par courrier
                électronique, conformément aux pratiques modernes et à
                l&apos;efficacité communicationnelle.
              </p>
              <p className="mt-3">
                Conformément à la législation en vigueur, les informations
                communiquées par email par trouver-mon-chantier.fr sont
                considérées comme valides et font foi entre les parties, tout
                comme les informations publiées directement sur le site.
              </p>
              <p className="mt-3">
                Les données enregistrées par trouver-mon-chantier.fr, y compris
                dans ses systèmes informatiques, concernant par exemple les
                transactions ou les communications, constituent des preuves
                recevables, valables, et opposables aux parties dans les mêmes
                conditions et avec la même force probante que tout document
                écrit et signé.
              </p>
              <p className="mt-3">12.2. Intégralité des Accords</p>
              <p className="mt-3">
                Ces Conditions Générales représentent la totalité des accords
                entre l&apos;entreprise XYZ et le Client concernant
                l&apos;utilisation du site trouver-mon-chantier.fr. Elles
                remplacent et annulent tout engagement oral ou écrit préalable
                relatif à l&apos;objet de ces conditions.
              </p>
              <p className="mt-3">
                Le non-exercice par l&apos;entreprise XYZ de ses droits, en
                vertu des présentes Conditions Générales, ne constitue pas une
                renonciation à ces droits.
              </p>
              <p className="mt-3">12.3. Validité des Clauses</p>
              <p className="mt-3">
                Si une ou plusieurs dispositions des présentes Conditions
                Générales sont déclarées non valides par une loi, un règlement
                ou une décision judiciaire devenue définitive, les autres
                dispositions resteront en vigueur et conserveront leur portée.
                Si nécessaire, les parties s&apos;efforceront de remplacer la
                clause invalidée par une clause valide correspondant à
                l&apos;esprit et à l&apos;objet des présentes.
              </p>
              <p className="mt-3">12.4. Interprétation des Titres</p>
              <p className="mt-3">
                Les titres des sections dans ces Conditions Générales sont
                fournis pour la commodité de la lecture et ne doivent pas
                affecter l&apos;interprétation des dispositions qu&apos;ils
                précèdent.
              </p>
              <p className="mt-3">
                13. Loi Applicable et Juridiction Compétente
              </p>
              <p className="mt-3">
                Les présentes Conditions Générales d&apos;utilisation sont
                régies par le droit français, tant pour les règles de fond que
                pour les règles de forme.
              </p>
              <p className="mt-3">
                Tout litige relatif à leur interprétation, exécution ou rupture
                sera, à défaut d&apos;accord amiable, soumis aux tribunaux
                compétents du ressort de Paris, lieu du siège social de
                l&apos;entreprise XYZ. Cette attribution de juridiction vaut
                quel que soit le lieu de souscription, d&apos;exécution ou de
                résolution du contrat et nonobstant la pluralité des défendeurs
                ou l&apos;appel en garantie.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
