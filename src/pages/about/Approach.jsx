import React from "react";
import { getData } from "../../api/APIfunctions";
import readText from "../../admin/components/RichTextEditor/readText";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const Approach = () => {
  const [loading, setLoading] = useState(true);

  const data = getData("static-pages", null);

  useEffect(() => {
    if(data) setLoading(false);
  }, [data])
  

  return (
    <>
      <title>Om os - Pædegogisk tilgang</title>
{loading && (
  <Loading />
)}
      {data && (
        <div>
          <section className="bg-[#ffc784] py-10">
            {data[7] && (
              <article className="w-[80vW] m-auto">
                {data[7].show_title && <h1 className='text-3xl text-center mb-2'>{data[7].title}</h1>}
                <div>
                  {data[7].text &&
                    data[7].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
          <section className="py-10">
            {data[8] && (
              <article className="w-[80vW] m-auto">
                {data[8].show_title && <h2 className='text-2xl text-center mb-2'>{data[8].title}</h2>}
                <div>
                  {data[8].text &&
                    data[8].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
          <section className="bg-[#ffc784] py-10">
            {data[9] && (
              <article className="w-[80vW] m-auto">
                {data[9].show_title && <h2 className='text-2xl text-center mb-2'>{data[9].title}</h2>}
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
