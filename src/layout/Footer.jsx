import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getData } from "../data/functions";
import Loading from "../components/Loading";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  const data = getData("contact-info", null);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <footer className="bg-[#87d6998f]">
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 lg:gap-15 sm:w-[75vw] md:w-[95vw] lg:w-[75vw] mx-auto py-5 px-5 sm:px-0">
        <figure className="md:order-2 my-auto col-span-1 w-[40vw] md:w-full mx-auto">
          <img src="/logo-2.png" alt="Åben Forældrerådgivnings logo" />
        </figure>
        {data[0] && (
          <menu className="md:order-1 text-center md:text-end my-auto col-span-2 text-lg">
            <li className="hover:underline underline-offset-4">
              <Link to="/">Gå til forsiden</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to="/raadgiverne">Læs om rådgiverne</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to="/paedagogisk-tilgang">
                Læs om vores pædagogiske tilgang
              </Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to="/samarbejdspartnere">Se hvem vi samarbejder med</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to="/nyheder">Læs vores nyheder</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to="/kontakt">Kontakt os</Link>
            </li>
          </menu>
        )}
        {data[0] && (
          <article className="md:order-3 col-span-2 text-sm my-auto text-center md:text-start mt-5 md:mt-auto">
            <p className="font-bold text-md">Vi tager imod donationer!</p>
            <p>
              Ønsker du at donere, er du meget velkommen til at sende et beløb
              på vores kontonummer:
            </p>
            <p>{data[0].donation}</p>
            <p className="font-bold mt-2 text-md">Kontakt os</p>
            <p>{data[0].address}</p>
            <p>Tlf: {data[0].phone}</p>
            <p>E-mail: {data[0].email}</p>
            <p>CVR-nummer: {data[0].cvr_number}</p>
          </article>
        )}
      </div>
    </footer>
  );
};

export default Footer;
