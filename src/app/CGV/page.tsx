import Footer from "../../components/perso/footer/Footer";
import Nav from "../../components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav />
      <main>
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 text-slate-700 flex flex-col items-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl max-w-[70%qd]">
              Conditions générales de vente
            </h1>
            <div className="w-full mt-16 text-sm">
              <h3 className="text-lg font-semibold mt-7">
                1. Présentation du Site
              </h3>
              <p className="mt-3">
                1.1. Bienvenue sur trouver-mon-chantier.fr, le portail dédié à
                l&apos;accompagnement des professionnels du bâtiment dans leur
                recherche de chantiers et la gestion de leurs projets. Ce site,
                désigné ci-après par « le Site », propose une gamme de services
                visant à faciliter la mise en relation entre les professionnels
                du bâtiment et les particuliers ou entreprises ayant des projets
                de construction ou de rénovation (ci-après, les « Services »).
                Ce service s&apos;adresse exclusivement aux professionnels
                agissant dans le cadre de leur activité professionnelle,
                qu&apos;elle soit commerciale, industrielle, artisanale, ou
                libérale, désignés ci-après par « le Client » ou « Vous ».
              </p>
              <p className="mt-3">
                1.2. Toute interaction et contrat établis via le Site le sont
                avec l&apos;entreprise XYZ, entreprise de droit français, située
                au 10 rue des Chantiers, 75000 Paris, France (ci-après désignée
                « l&apos;Entreprise » ou « Nous »).
              </p>
              <p className="mt-3">
                1.3. L&apos;Entreprise est indépendante de toute administration
                publique ou privée gérant les formalités d&apos;entreprises
                telles que le Centre de Formalités des Entreprises (CFE),
                l&apos;URSSAF, Infogreffe, le Registre du Commerce et des
                Sociétés (RCS), ou l&apos;Agence France Entrepreneur (AFE).
              </p>
              <p className="mt-3">
                1.4. Le Site est géré et opéré par l&apos;Entreprise et est
                hébergé par Amazon Web Services, Inc., situé P.O. Box 81226,
                Seattle, WA 98108-1226.
              </p>
              <p className="mt-3">
                1.5. La direction de la publication du Site est assurée par
                Nicolas Catera, propriétaire de l&apos;entreprise XYZ.
              </p>
              <h3 className="text-lg font-semibold mt-7">
                2. Inscription et Accès aux Services
              </h3>
              <p className="mt-3">
                2.1 L’inscription aux Services offerts par
                trouver-mon-chantier.fr s’effectue exclusivement en ligne et en
                langue française. Aucune inscription réalisée par courrier, fax,
                ou téléphone ne sera considérée comme valide. Seule
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
