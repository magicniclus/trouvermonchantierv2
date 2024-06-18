/* eslint-disable @next/next/no-img-element */
const Prospection = () => {
  return (
    <section className="w-full py-5 bg-bgPrimary" id="avantages">
      <div className="w-full max-w-5xl mx-auto lg:px-4">
        <div className="w-full rounded-md p-5 md:p-16 flex flex-col md:flex-row justify-between">
          <div className="md:w-4/12 w-full flex items-center md: justify-center">
            <img
              src="/images/phone.png"
              alt="chantier"
              className="w-[200px] md:w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-5/12 w-full text-white mt-10 md:mt-0">
            <h3 className="text-xl font-semibold mt-5">
              Maximisez Votre Visibilité en Ligne
            </h3>
            <p className="text-white mt-3">
              Augmentez considérablement votre visibilité auprès des clients
              potentiels grâce à notre stratégie de présence sur les plateformes
              les plus influentes du web, telles que Google et Facebook. En
              apparaissant sur ces canaux et avec une page web dédiée munie
              d&apos;un nom de domaine personnalisé, vous bénéficiez d&apos;un
              trafic de qualité essentiel pour attirer des prospects qualifiés.
            </p>
            <h3 className="text-xl font-semibold mt-5">
              Impact de la Recherche en Ligne
            </h3>
            <p className="text-white mt-3">
              En France, 80% des consommateurs effectuent des recherches en
              ligne avant de choisir un prestataire. Google domine plus de 90%
              du marché des moteurs de recherche, ce qui signifie qu&apos;une
              absence sur cette plateforme vous fait perdre un avantage crucial
              face à vos concurrents. Une page web dédiée renforce votre
              crédibilité et votre présence en ligne.
            </p>
            <h3 className="text-xl font-semibold mt-5">
              Présence Stratégique et Conversion Optimale
            </h3>
            <p className="text-white mt-3">
              Notre service vous garantit une présence là où les clients
              cherchent activement des prestataires. En vous positionnant sur
              les résultats de recherche Google, les annonces ciblées sur
              Facebook, et avec une page web professionnelle, nous maximisons
              vos chances de conversion. Chaque prospect qui vous trouve via ces
              plateformes et votre site dédié est déjà à la recherche de
              services comme les vôtres, augmentant ainsi les probabilités
              qu&apos;ils deviennent vos clients fidèles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prospection;
