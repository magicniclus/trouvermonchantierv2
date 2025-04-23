/* eslint-disable @next/next/no-img-element */
const Fonctionnement = () => {
  return (
    <section className="w-full md:pb-20" id="why">
      <div className="w-full max-w-5xl mx-auto lg:px-4">
        <div className="w-full bg-slate-100 rounded-md p-5 md:p-16 flex justify-between flex-col md:flex-row py-10">
          <div className="md:w-6/12 w-full flex md:hidden items-center">
            <img
              src="/images/desktop.png"
              alt="chantier"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-5/12 w-full text-slate-700 mt-10 md:mt-0">
            <h2 className="font-bold text-2xl">
              Votre site travaille pour vous, même quand vous dormez.
            </h2>
            <div className="w-full max-w-[200px] bg-yellow-500 rounded-full mt-5 h-3" />
            <p className="text-slate-500 mt-5">
              Grace à notre stratégie, vous recevez des demandes de devis
              ciblées, 24h/24, dès que des clients cherchent vos services sur
              Google. Votre site convertit les visiteurs en appels concrets,
              sans engagement, ni leads partagés.
            </p>
            <p className="text-slate-500 mt-5">
              Plomberie, toiture, électricité, carrelage… votre activité est
              déjà couverte.
            </p>
          </div>
          <div className="md:w-6/12 w-full hidden md:flex items-center">
            <img
              src="/images/desktop.png"
              alt="chantier"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnement;
