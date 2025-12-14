import { Link } from "react-router";

const Admin = () => {
  return (
    <div className="w-[80vw] flex flex-col m-auto">
      <h1 className="text-4xl text-center mb-3">
        Velkommen til aafr.dk's administration
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl mb-1">Hurtig oprettelse af nye elementer</h2>
        <menu className="flex justify-between">
          <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
            <Link
              to={"/admin/forside/udtalelser/ny-udtalelse"}
              className="h-full w-full"
            >
              Opret ny udtalelse
            </Link>
          </button>
          <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
            <Link to={"/admin/nyheder/ny-artikel"} className="h-full w-full">
              Opret ny artikel
            </Link>
          </button>
          <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
            <Link
              to={"/admin/samarbejdspartnere/ny-samarbejdspartner"}
              className="h-full w-full"
            >
              Opret ny samarbejdspartner
            </Link>
          </button>
          <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
            <Link
              to={"/admin/raadgiverne/ny-raadgiver"}
              className="h-full w-full"
            >
              Opret ny rådgiver
            </Link>
          </button>
        </menu>
      </section>
      <section>
        <h2 className="text-2xl mb-1">OBS.</h2>
        <article>
          <h3 className="text-lg font-semibold border-l border-gray-300 ps-5">
            Husk at gemme!
          </h3>
          <p>
            Husk at gemme, hvis I har lavet noget, som I vil beholde og udgive!
          </p>
          <p className="mt-2">
            Man kan se, om man har gemt ved at kigge på, hvornår elementet sidst
            blev gemt og udgivet.
          </p>
          <h3 className="text-lg font-semibold mt-3 border-l border-gray-300 ps-5">
            Gem og udgiv
          </h3>
          <p>
            Når der trykkes på gem og udgiv-knappen, bliver dataen gemt i
            databasen. Selve hjemmesiden tager dataen fra databasen.{" "}
            <b>
              Der kan altså ikke gemmes kladder - indholdet bliver udgivet med
              det samme.
            </b>
          </p>
          <p className="mt-2">
            Hvis man gerne vil gemme noget uden at udgive det, må man kopiere
            indholdet hen i et eksternt dokument.
          </p>
          <h3 className="text-lg font-semibold mt-3 border-l border-gray-300 ps-5">
            Slet
          </h3>
          <p>
            <b>Når et element slettes, slettes det permanent fra databasen.</b>{" "}
            Man kan altså ikke få det tilbage, medmindre man genskaber det fra
            bunden.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Admin;
