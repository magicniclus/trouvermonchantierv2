import Footer from "../../components/perso/footer/Footer";
import Nav from "../../components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-5xl items-center justify-between flex-col p-6 lg:px-8">
        <h1 className="flex flex-col mx-auto py-10 text-center lg:text-5xl text-2xl lg:w-11/12 mt-10 lg:mt-3 text-gray-700">
          trouver-mon-chantier.com <br />
          Mentions légales
        </h1>
        <div className="text-gray-700">
          <p className="mt-2">
            trouver-mon-chantier.com est la propriété de l’entreprise Nicolas
            CASTERA , gérée par Monsieur Nicolas CASTERA.
          </p>

          <h3 className="text-lg mt-3 font-semibold">Éditeur du site</h3>
          <p className="mt-2">
            Nicolas CASTERA
            <br />
            22 rue de libourne
            <br />
            33100 Bordeaux
            <br />
            Tel : 0631420045
          </p>

          <h3 className="text-lg mt-3 font-semibold">
            Développement web du site
          </h3>
          <p className="mt-2">
            Entreprise individuelle CASTERA NICOLAS
            <br />
            22 RUE DE LIBOURNE
            <br />
            33100 BORDEAUX FR
          </p>

          <h3 className="text-lg mt-3 font-semibold">Hébergeur du site</h3>
          <p className="mt-2">
            Netlify: 2325 3RD STREET,SUITE 215, SAN FRANCISCO, CA 94107 (USA)
          </p>

          <h3 className="text-lg mt-3 font-semibold">
            Propriété Intellectuelle
          </h3>
          <p className="mt-2">
            Toute représentation ou reproduction intégrale ou partielle, faite
            sans le consentement des auteurs ou de ses ayants droit ou ayants
            cause, est illicite. Il en est de même pour la traduction,
            l’adaptation ou la transformation, l’arrangement ou la reproduction
            par un art ou un procédé quelconque (art. L. 122-4 du CPI). Cette
            interdiction s’étend, sans que cette liste ne soit limitative, à
            tout élément rédactionnel figurant sur le site : présentation des
            écrans, textes, logos, photographies notamment.
          </p>
          <h2>Cookies</h2>
          <p className="mt-2">
            L’utilisateur est informé que lors de ses visites sur le site, des
            cookies peuvent s’installer automatiquement sur son logiciel de
            navigation. Un cookie est un élément qui ne permet pas d’identifier
            l’utilisateur mais sert à enregistrer des informations relatives à
            la navigation de celui-ci sur le site Internet. Le paramétrage de
            votre logiciel de navigation permet d’informer de la présence de
            cookies et éventuellement de la refuser selon la procédure décrite
            par la CNIL.
          </p>

          <h3 className="text-lg mt-3 font-semibold">Que sont les cookies ?</h3>
          <p className="mt-2">
            Un « cookie » est un fichier de texte envoyé par les sites Internet
            à l’ordinateur ou à un autre périphérique connecté à Internet d’un
            visiteur afin d’identifier le navigateur du visiteur ou afin de
            stocker des informations ou des paramètres dans le navigateur.
          </p>

          <h3 className="text-lg mt-3 font-semibold">
            Est-ce que Nicolas CASTERA utilise des cookies sur son site ?
          </h3>
          <p className="mt-2">
            Nicolas CASTERA peut être amenée à utiliser des cookies sur ses
            sites Internet afin d’améliorer les services et fonctionnalités
            proposés à ses utilisateurs. Vous pouvez restreindre ou désactiver
            l’utilisation des cookies via votre navigateur Internet, mais sans
            cookies, vous pouvez ne pas être en mesure d’utiliser ce site
            internet.
          </p>

          <h4>Cookies strictement nécessaires</h4>
          <p className="mt-2">
            Ces cookies sont indispensables pour mener à bien une demande que
            vous aurez effectuée. Les exemples incluent la mémorisation des
            informations relatives à un formulaire que vous avez rempli lorsque
            vous vous déplacez sur le site ou des produits ou services que vous
            avez choisis sur notre site.
          </p>

          <h4 className="text-lg mt-3 font-semibold">Cookies fonctionnels</h4>
          <p className="mt-2">
            Ces cookies permettent au site Internet de se souvenir des choix que
            vous avez faits en vue de vous fournir des fonctionnalités
            avantageuses. Par exemple, les cookies fonctionnels permettent au
            site Internet de se souvenir de vos paramètres spécifiques, comme la
            sélection de votre région et votre état de connexion permanente en
            cas de sélection, et affiche les précédents biens consultés, et
            d’autres fonctions personnalisées.
          </p>

          <h4 className="text-lg mt-3 font-semibold">Cookies analytiques</h4>
          <p className="mt-2">
            Ces cookies nous permettent de recueillir des données relatives à
            votre utilisation du site Internet, y compris le contenu sur lequel
            vous cliquez en naviguant sur le site Internet, afin d’améliorer la
            performance et la navigation au sein de celui-ci. Ces cookies
            peuvent être fournis par notre fournisseur d’outil analytique de
            tierce partie, mais ne sont utilisés qu’à des fins liées à nos sites
            Internet.
          </p>

          <h4 className="text-lg mt-3 font-semibold">Cookies de ciblage</h4>
          <p className="mt-2">
            Ces cookies mémorisent des informations concernant votre utilisation
            du site Internet afin que nous puissions mettre à votre disposition
            des informations promotionnelles et ciblées sur notre site Internet.
          </p>

          <h2>Données Personnelles</h2>
          <h3 className="text-lg mt-3 font-semibold">
            Quelles catégories de données collectons-nous ?
          </h3>
          <p className="mt-2">
            Dans le cadre de l’utilisation du site nous sommes susceptibles de
            collecter plusieurs types d’informations vous concernant :
          </p>
          <ul>
            <li>
              des informations nominatives (telles que vos nom, prénom, date de
              naissance, coordonnées telles que adresse postale, e-mail, pays de
              résidence, numéro de téléphone) que vous nous communiquez, par
              exemple en remplissant un formulaire ou lorsque vous nous
              soumettez des demandes d’informations et des commentaires.
            </li>
            <li>
              des informations sur l’utilisation que vous faites du site,
              susceptibles d’être enregistrées par l’intermédiaire de fichiers «
              cookies » ou traceurs installés sur votre terminal et notamment
              des informations relatives à vos visites telles que votre adresse
              IP, votre fournisseur de services Internet, le type de navigateur
              que vous utilisez, votre système d’exploitation, les pages du site
              que vous avez visitées, la date et l’heure d’accès, ou encore des
              données comportementales relatives à l’analyse comportementale des
              actions et des choix que vous effectués, telle que notamment des
              données résultants de l’analyse de votre profil, les données
              issues de l’utilisation des services telles le temps de connexion,
              le temps d’utilisation.
            </li>
          </ul>
          <p className="mt-2">
            Nous sommes également susceptibles de vous demander des informations
            si vous nous faites part d’un problème concernant notre site ; si
            vous nous contactez, nous sommes susceptibles de conserver une trace
            de cette correspondance.
          </p>
          <p className="mt-2">
            Les informations obligatoires (notamment vos noms, prénom, adresse
            et e-mail) doivent être saisies dans les champs des formulaires de
            recueil de données. Si vous ne remplissez pas ces champs, nous ne
            pourrons vous fournir les services mentionnés ci-dessus.
          </p>
          <h2>Finalités de la Collecte des Données</h2>
          <ul>
            <li>
              Vous fournir les services ou informations que vous avez demandés.
            </li>
            <li>Répondre à vos demandes ou commentaires.</li>
            <li>
              Nous assurer que le contenu de notre site est présenté de la façon
              la plus efficace pour vous et votre ordinateur, vous faciliter
              l&apos;utilisation de notre site et personnaliser votre expérience
              selon vos intérêts et besoins.
            </li>
            <li>
              Réaliser (de manière anonyme) des statistiques sur l&apos;activité
              du site pour mesurer la satisfaction et la qualité de services et
              permettre l&apos;amélioration et l&apos;optimisation du site.
            </li>
            <li>
              Dans un but de communication promotionnelle ou commerciale, vous
              contacter au sujet de produits et services qui peuvent vous
              intéresser, sous réserve de votre consentement préalable.
            </li>
            <li>La gestion de la sécurité du site.</li>
          </ul>
          <h2 className="text-lg mt-3 font-semibold">
            Transmission des Données
          </h2>
          <p className="mt-2">
            Les données collectées par Nicolas CASTERA sont exploitées
            uniquement à ses fins personnelles et ne font l&apos;objet
            d&apos;aucune transmission extérieure.
          </p>
          <h2 className="text-lg mt-3 font-semibold">Vos Droits</h2>
          <p className="mt-2">
            L&apos;utilisateur dispose d&apos;un droit d&apos;accès, de
            modification, de rectification et de suppression des données qui le
            concernent (article 38 et suivants de la loi &quot;Informatique et
            Libertés&quot;). Pour l&apos;exercer, l&apos;utilisateur peut
            s&apos;adresser aux propriétaires du site via la page contact.
          </p>
          <h2 className="text-lg mt-3 font-semibold">Mesures de Sécurité</h2>
          <p className="mt-2">
            Soucieuse de garantir la sécurité de vos données, Nicolas CASTERA
            prend toutes les précautions utiles pour préserver la sécurité des
            données contre tout accès ou utilisation non autorisés, destruction
            accidentelle ou illégale, perte accidentelle ou altération. Ces
            mesures comprennent des dispositifs techniques comme des pare-feu,
            et des mesures organisationnelles telles qu&apos;un système de
            sécurité efficace alliant identifiant et mot de passe, ainsi que des
            protections physiques.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
