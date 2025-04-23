/* eslint-disable @next/next/no-img-element */
const Prospection = () => {
  return (
    <section className="w-full py-5 bg-slate-700" id="avantages">
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
            <h3 className="text-2xl font-semibold mt-5">
              10 prospects qualifiés par jour grâce à Google.
            </h3>
            <div className="w-full max-w-[200px] bg-yellow-500 rounded-full mt-5 h-3" />
            <p className="text-white mt-5">
              Être visible sur Google aujourd’hui, ce n’est plus un bonus :
              c’est indispensable. Avec un site professionnel et une campagne
              optimisée, vous recevez chaque semaine des demandes sérieuses de
              clients dans votre ville — pendant que d&apos;autres attendent des
              appels qui ne viendront jamais.
            </p>

            <p className="text-white mt-3">
              Pas de présence en ligne = pas de devis. Avec votre propre site +
              publicité bien ciblée, vous apparaissez exactement là où vos
              clients cherchent, avant vos concurrents.
            </p>
            <p className="text-white mt-3">
              Et la bonne nouvelle ? <b>On s&apos;occupe de tout pour vous.</b>
            </p>
            {/* <h3 className="text-xl font-semibold mt-5">
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
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prospection;
