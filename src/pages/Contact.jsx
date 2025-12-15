import React from "react";
import { getData } from "../api/APIfunctions";
import readText from "../admin/components/RichTextEditor/readText";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const textData = getData("static-pages", null);
  const contactData = getData("contact-info", null);

  useEffect(() => {
    if(textData && contactData) setLoading(false);
  }, [textData, contactData])
  

  return (
    <>
      <title>Kontakt</title>
{loading && (
  <Loading />
)}
      <section>
        {textData[10] && (
          <article>
            {textData[10].show_title && <h1>{textData[10].title}</h1>}
            <div>
              {textData[10].text &&
                textData[10].text.map((item, index) => readText(item, index))}
            </div>
          </article>
        )}
        {textData[11] && (
          <article>
            {textData[11].show_title && <h2>{textData[11].title}</h2>}
            <div>
              {textData[11].text &&
                textData[11].text.map((item, index) => readText(item, index))}
            </div>
          </article>
        )}
      </section>

      {contactData[0] && <section>
        <figure>
          <p>indsæt ikon her</p>
          <figcaption>
            <p>{contactData[0].email}</p>
          </figcaption>
        </figure>
        <figure>
          <p>indsæt ikon her</p>
          <figcaption>
            <p>{contactData[0].address}</p>
          </figcaption>
        </figure>
        <figure>
          <p>indsæt ikon her</p>
          <figcaption>
            <p>{contactData[0].phone_time}</p>
            <p>+45 {contactData[0].phone}</p>
          </figcaption>
        </figure>
        </section>}
    </>
  );
};

export default Contact;
