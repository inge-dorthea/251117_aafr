import React from "react";
import { getData, getImage } from "../../api/APIfunctions";
import readText from "../../admin/components/RichTextEditor/readText";

const Advisors = () => {
  const textData = getData("static-pages", 6);
  const advisorData = getData("advisors", null);

  return (
    <>
      <title>Om os - Rådgiverne</title>
      <div>
        {textData && (
          <section>
            {textData[0] && (
              <article>
                {textData[0].show_title && <h1>{textData[0].title}</h1>}
                <div>
                  {textData[0].text &&
                    textData[0].text.map((item, index) =>
                      readText(item, index)
                    )}
                </div>
              </article>
            )}
          </section>
        )}

        <section className="my-3">
          <h2>Rådgiverne</h2>
          {advisorData &&
            advisorData.map((item, index) => (
              <div key={index} className="my-2">
                <article>
                  <h3>{item.name}</h3>
                  <div>
                    {item.description &&
                      item.description.map((subitem, subindex) =>
                        readText(subitem, subindex)
                      )}
                  </div>
                </article>
                <figure>
                  <img
                    src={getImage("advisors/" + item.id + "/" + item.img_url)}
                    alt={"Billede af " + item.name}
                  />
                </figure>
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Advisors;
