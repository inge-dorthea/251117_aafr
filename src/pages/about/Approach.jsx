import React from "react";
import { getData } from "../../api/APIfunctions";
import readText from "../../admin/components/RichTextEditor/readText";

const Approach = () => {
  const data = getData("static-pages", null);

  return (
    <>
      <title>Om os - Pædegogisk tilgang</title>

      {data && (
        <div>
          <section>
            {data[7] && (
              <article>
                {data[7].show_title && <h1>{data[7].title}</h1>}
                <div>
                  {data[7].text &&
                    data[7].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
          <section>
            {data[8] && (
              <article>
                {data[8].show_title && <h2>{data[8].title}</h2>}
                <div>
                  {data[8].text &&
                    data[8].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
          <section>
            {data[9] && (
              <article>
                {data[9].show_title && <h2>{data[9].title}</h2>}
                <div>
                  {data[9].text &&
                    data[9].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Approach;
