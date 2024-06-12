import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Banner = () => {
  return (
    <section className="w-full relative flex items-center h-full py-5 bg-[#12A67C]">
      <div className="mx-auto w-full h-full flex flex-col md:flex-row max-w-5xl md:items-center justify-between p-6 lg:px-4 md:py-6 py-16 z-10 h-[170px]">
        <div className="w-full max-w-[450px]">
          <h2 className="text-xl text-bgPrimary font-bold">
            Vous êtes un professionnel du bâtiment ?
          </h2>
          <h3 className="text-bgPrimary font-semibold mt-1">
            Devenez partenaire{" "}
            <span className="text-yellow-500">trouver-mon-chantier.fr</span>
          </h3>
        </div>
        <a className="bg-bgPrimary text-white p-3 font-xl flex rounded-full w-max mt-5 md:mt-0">
          DEVENIR PARTENAIRE{" "}
          <ArrowRightIcon className="h-6 w-6 text-white ml-3" />
        </a>
      </div>
    </section>
  );
};

export default Banner;
