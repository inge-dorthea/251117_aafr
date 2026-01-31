//* import
// react
import { useState, useEffect } from "react";
import { BsEnvelope } from "react-icons/bs";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";

// own functionality
import { getData } from "../data/functions";
import readText from "../admin/components/RichTextEditor/readText";

// components
import Loading from "../components/Loading";
import FallbackContent from "./FallbackContent";

//* component
const Contact = () => {
  //* loading and data
  const [loading, setLoading] = useState(true);

  const textData = getData("static-pages", null);
  const contactData = getData("contact-info", null);

  useEffect(() => {
    if (
      (textData == null && contactData == null) ||
      (textData == null && contactData && contactData.length > 0) ||
      (textData &&
        textData.length > 0 &&
        contactData &&
        contactData.length > 0) ||
      (textData && textData.length > 0 && contactData == null)
    )
      setLoading(false);
  }, [textData, contactData]);

  //* return
  return (
    <>
      <title>Kontakt</title>
      {loading && <Loading />}
      {/* fallback content v */}
      {textData == null && <FallbackContent />}
      {/* fallback content ^ */}
      {/* text v */}
      <section className="py-10">
        {textData && textData[10] && (
          <article className="w-[80vW] m-auto">
            {textData[10].show_title && (
              <h1 className="mb-2 text-3xl text-center">
                {textData[10].title}
              </h1>
            )}
            <div>
              {textData[10].text &&
                textData[10].text.map((item, index) => readText(item, index))}
            </div>
          </article>
        )}
        {textData && textData[11] && (
          <article className="w-[80vW] m-auto">
            {textData[11].show_title && (
              <h2 className="mt-5 mb-2 text-2xl text-center">
                {textData[11].title}
              </h2>
            )}
            <div>
              {textData[11].text &&
                textData[11].text.map((item, index) => readText(item, index))}
            </div>
          </article>
        )}
      </section>
      {/* text ^ */}
      {/* contact-circles v */}
      {contactData && contactData[0] && (
        <section className="bg-[#ffc784] py-10">
          <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-3 mx-auto gap-5 md:gap-20">
            <figure className="flex flex-col justify-center text-center bg-[#87d699] rounded-xs sm:rounded-full w-full aspect-square">
              <div className="flex justify-center text-9xl sm:text-2xl lg:text-8xl">
                <BsEnvelope />
              </div>
              <div className="flex justify-center">
                <figcaption className="text-sm lg:text-md w-[80%]">
                  <p>{contactData[0].email}</p>
                </figcaption>
              </div>
            </figure>
            <figure className="flex flex-col justify-center text-center bg-[#87d699] rounded-xs sm:rounded-full size-full w-full aspect-square">
              <div className="flex justify-center mb-3 text-9xl sm:text-2xl lg:text-8xl">
                <BsFillGeoAltFill />
              </div>
              <div className="flex justify-center">
                <figcaption className="text-sm lg:text-md w-[80%]">
                  <p>{contactData[0].address}</p>
                </figcaption>
              </div>
            </figure>
            <figure className="flex flex-col justify-center text-center bg-[#87d699] rounded-xs sm:rounded-full size-full w-full aspect-square">
              <div className="flex justify-center mb-3 text-9xl sm:text-2xl lg:text-8xl">
                <BsFillTelephoneFill />
              </div>
              <div className="flex justify-center">
                <figcaption className="text-sm lg:text-md w-[80%]">
                  <p>{contactData[0].phone}</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>
      )}
      {/* contact-circles ^ */}
    </>
  );
};

export default Contact;
