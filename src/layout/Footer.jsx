import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { getData } from '../api/APIfunctions';
import Loading from '../components/Loading';

const Footer = () => {
  const [loading, setLoading] = useState(true);

  const data = getData("contact-info", null);

  useEffect(() => {
    if(data) setLoading(false);
  }, [data])
  
  return (
    <footer>
      {loading && (
        <Loading />
      )}
      <figure>
        <img src="/logo-2.png" alt="Åben Forældrerådgivnings logo" />
      </figure>
      {data[0] && (
        <div>
          <menu>
            <li>
              <Link to="/">Gå til forsiden</Link>
            </li>
            <li>
              <Link to="/raadgiverne">Læs om rådgiverne</Link>
            </li>
            <li>
              <Link to="/paedagogisk-tilgang">Læs om vores pædagogiske tilgang</Link>
            </li>
            <li>
              <Link to="/samarbejdspartnere">Se hvem vi samarbejder med</Link>
            </li>
            <li>
              <Link to="/nyheder">Læs vores nyheder</Link>
            </li>
            <li>
              <Link to="/kontakt">Kontakt os</Link>
            </li>
          </menu>
          <article>
            <p className='font-bold'>Vi tager imod donationer!</p>
            <p>Ønsker du at donere, er du meget velkommen til at sende et beløb på følgende kontonummer:</p>
            <p>{data[0].donation}</p>
            <p className='font-bold'>Kontakt os</p>
            <p>{data[0].address}</p>
            <p>Tlf: +45 {data[0].phone}</p>
            <p>E-mail: {data[0].email}</p>
          </article>
        </div>
      )}
    </footer>
  )
}

export default Footer