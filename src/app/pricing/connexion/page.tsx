import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";

const page = () => {
  return (
    <>
      <Nav withMenu={false} />
      <main className="mx-auto max-w-5xl p-6 lg:px-8 min-h-[calc(100vh-80px)]">
        <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-slate-700 mt-7">
          Merci d&apos;avoir choisi <br />
          <span className="text-yellow-500">
            Trouver-Mon-Chaniter
          </span> <br /> par Portail-habitat
        </h1>
        <h2 className="text-center my-7">
          Nous vous avons envoyé un mail avec votre votre identifiant de
          connexion et mot de passe provisioire. <br />
          Connectez-vous ci-dessous à votre espace Portail-habitat avec vos
          identifiants.
        </h2>
        <div className="w-full flex justify-center items-center flex-col">
          <a
            className="px-3 py-2 text-lg rounded-md bg-yellow-500 text-white font-semibold w-max"
            href="https://partailhabitat.fr/connexion"
          >
            Se Connecter
          </a>
          <p className="text-xs mt-7">
            Si vous rencontrez des difficultés pour vous connecter, contactez
            notre service après-vente:{" "}
            <a
              className="underline"
              href="mailto:support@trouver-mon-chantier.fr"
            >
              support@trouver-mon-chantier.fr
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
