//* import
// react
import { useState, useEffect } from "react";

// own functionality
import { getData, getImage } from "../../../data/functions";
import readText from "../../../admin/components/RichTextEditor/readText";

// components
import Loading from "../../../components/Loading";
import FallbackContent from "../../FallbackContent";
import Lightbox from "./Lightbox";

//* component
const Collaboration = () => {
  //* loading and data
  const [loading, setLoading] = useState(true);

  const textData = getData("static-pages", 7);
  const eventData = getData("events", null);

  useEffect(() => {
    if (
      (textData == null && eventData == null) ||
      (textData && textData.length > 0 && eventData == null) ||
      (textData && textData.length > 0 && eventData && eventData.length > 0) ||
      (textData == null && eventData && eventData.length > 0)
    )
      setLoading(false);
  }, [textData, eventData]);

  //* lightbox useState
  const [showLightBox, setShowLightBox] = useState(false);
  const [item, setItem] = useState(null);

  //* return
  return (
    <>
      <title>Om os - Vores samarbejde</title>
      {loading && <Loading />}
      {/* fallback content v */}
      {textData == null && <FallbackContent />}
      {/* fallback content ^ */}
      {/* lightbox v */}
      {showLightBox && (
        <Lightbox setShowLightBox={setShowLightBox} image={item}  />
      )}
      {/* lightbox ^ */}
      <div>
        {/* text about collaboration v */}
        {textData[0] && (
          <section className="bg-[#ffc784] py-10">
            <article className="w-[80vW] m-auto">
              {textData[0].show_title && (
                <h1 className="text-3xl text-center mb-2">
                  {textData[0].title}
                </h1>
              )}
              <div>
                {textData[0].text &&
                  textData[0].text.map((item, index) => readText(item, index))}
              </div>
            </article>
          </section>
        )}
        {/* text about collaboration ^ */}
        {/* events they've been apart of v */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10 pb-10 w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] m-auto">
          <figure>
            <a
              href="https://trivselsalliancen.dk/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../../../../public/Trivselsalliancen-tekst-og-logo.webp"
                alt="Trivselsalliancens logo"
              />
            </a>
          </figure>
          {eventData &&
            eventData.map((item, index) => (
              <figure key={index}>
                <img
                  onClick={() => {setShowLightBox(true); setItem(item)}}
                  src={getImage("events/" + item.id + "/" + item.img_url)}
                  alt={item.img_alt}
                />
              </figure>
            ))}
        </section>
        {/* events they've been apart of ^ */}
      </div>
    </>
  );
};

export default Collaboration;
