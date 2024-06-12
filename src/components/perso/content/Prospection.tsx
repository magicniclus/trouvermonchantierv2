/* eslint-disable @next/next/no-img-element */
const Prospection = () => {
  return (
    <section className="w-full py-5 bg-bgPrimary">
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
            <h2 className="font-bold text-2xl">
              Jusqu’à 100% de prospect en client
            </h2>
            <div className="w-full max-w-[200px] bg-yellow-500 rounded-full mt-5 h-3" />
            <p className="text-white/70 mt-5">
              Augmentez votre visibilité auprès des clients potentiels en quête
              de vos services. Gagnez du trafic de qualité en apparaissant sur
              Google et Facebook, les plateformes les plus influentes du web.
            </p>
            <p className="text-white/70 mt-5">
              Impact de la Recherche en Ligne : En France, 80% des consommateurs
              effectuent des recherches en ligne avant de sélectionner un
              prestataire. Avec Google dominant plus de 90% du marché des
              moteurs de recherche, une absence sur cette plateforme équivaut à
              céder un avantage considérable à vos concurrents.
            </p>
            <p className="text-white/70 mt-5">
              Cette approche vous assure une présence là où les clients
              cherchent activement des prestataires, maximisant ainsi vos
              chances de conversion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prospection;
