/* eslint-disable @next/next/no-img-element */
const Fonctionnement = () => {
  return (
    <section className="w-full md:pb-20">
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
              Internet, votre meilleur apporteur d’affaires
            </h2>
            <div className="w-full max-w-[200px] bg-yellow-500 rounded-full mt-5 h-3" />
            <p className="text-slate-500 mt-5">
              Avec notre service, vous recevrez des demandes de devis ciblées de
              clients potentiels précisément au moment où ils expriment leur
              besoin de vos services, et ce, 24 heures sur 24, 7 jours sur 7.
            </p>
            <p className="text-slate-500 mt-5">
              Taux de conversion exceptionnel : Nous sommes fiers d&apos;offrir
              l&apos;un des taux de conversion les plus élevés du marché.
            </p>
            <p className="text-slate-500 mt-5">
              Flexibilité totale : Sans engagement, vous offrant la liberté de
              l&apos;interrompre à tout moment.
            </p>
            <p className="text-slate-500 mt-5">
              Résultats concrets : Préparez-vous à voir votre boîte mail se
              remplir de demandes de devis détaillées et à recevoir des appels
              quotidiens de prospects qualifiés désireux de collaborer avec
              vous.
            </p>
            <p className="text-slate-500 mt-5">
              Isolation, PLACO, carrelage, maçonnerie, piscine, électricité,
              cuisine, ossature bois, charpente, couverture etc.. Nos différents
              site vous offre les meilleurs clients.
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
