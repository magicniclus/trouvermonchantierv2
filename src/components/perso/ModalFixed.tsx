const ModalFixed = () => {
  return (
    <div className="w-full mx-auto max-w-7xl hidden md:flex fixed top-24 left-1/2 transform -translate-x-1/2 justify-end px-6 z-10">
      <a
        href="tel:0631420045"
        className="p-3 rounded-lg shadow-md flex h-[70px] items-center justify-center w-max bg-white"
      >
        <div className="text-sm h-full flex flex-col justify-center mt-1">
          <p className="text-green-500">Appelez-nous !</p>
          <p className="text-slate-700 text-[9px]">
            Du lundi au samedi - 8h à 19h
          </p>
        </div>
        <div className="ml-3 h-full flex flex-col justify-center">
          <p className="text-slate-700 text-lg font-semibold">0924525966</p>
          <p className="text-slate-700 text-[9px]">
            Service gratuit + prix d’un appel
          </p>
        </div>
      </a>
    </div>
  );
};

export default ModalFixed;
