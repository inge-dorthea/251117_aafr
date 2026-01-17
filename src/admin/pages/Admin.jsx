//*import
import { Link } from "react-router";

//* component
const Admin = () => {
  //*return
  return (
    <>
      <title>Admin</title>
      <div className="w-[80vw] flex flex-col m-auto sm:px-8">
        {/* header v */}
        <h1 className="text-4xl text-center mb-5">
          Velkommen til aafr.dk's administration
        </h1>
        {/* header ^ */}
        {/* links to create content v */}
        <section className="mb-8">
          <h2 className="text-2xl mb-8">Hurtig oprettelse af nye elementer</h2>
          <menu className="flex justify-evenly flex-wrap gap-x-5 gap-y-15">
            <li>
              <Link
                to={"/admin/forside/udtalelser/ny-udtalelse"}
                className="py-5 px-5 border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
              >
                Opret ny udtalelse
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/nyheder/ny-artikel"}
                className="py-5 px-5 border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
              >
                Opret ny artikel
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/samarbejde/ny-event"}
                className="py-5 px-5 border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
              >
                Opret ny event
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/raadgiverne/ny-raadgiver"}
                className="py-5 px-5 border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
              >
                Opret ny rådgiver
              </Link>
            </li>
          </menu>
        </section>
        {/* links to create content ^ */}
        {/* important info v */}
        <section>
          <h2 className="text-2xl mb-1">OBS.</h2>
          <article>
            <h3 className="text-lg font-semibold border-l border-gray-300 ps-5">
              Husk at gemme!
            </h3>
            <p>
              Husk at gemme, hvis I har lavet noget, som I vil beholde og
              udgive!
            </p>
            <p className="mt-2">
              Man kan se, om man har gemt ved at kigge på, hvornår elementet
              sidst blev gemt og udgivet.
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
              <b>
                Når et element slettes, slettes det permanent fra databasen.
              </b>{" "}
              Man kan altså ikke få det tilbage, medmindre man genskaber det fra
              bunden.
            </p>
          </article>
        </section>
        {/* important info ^ */}
      </div>
    </>
  );
};

export default Admin;
