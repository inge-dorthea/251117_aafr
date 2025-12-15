import React from "react";
import { getData, getImage } from "../../api/APIfunctions";
import readText from "../../admin/components/RichTextEditor/readText";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const Advisors = () => {
    const [loading, setLoading] = useState(true);
  
  const textData = getData("static-pages", 6);
  const advisorData = getData("advisors", null);

  useEffect(() => {
    if(textData && advisorData) setLoading(false);
  }, [textData, advisorData])
  

  return (
    <>
      <title>Om os - Rådgiverne</title>
      {loading &&
      <Loading />
      }
      <div>
        {textData && (
          <section className="bg-[#ffc784] py-10">
            {textData[0] && (
              <article className="w-[80vW] m-auto">
                {textData[0].show_title && <h1 className='text-3xl text-center mb-2'>{textData[0].title}</h1>}
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

        <section className="my-10 flex flex-col gap-8">
          {advisorData &&
            advisorData.map((item, index) => (
              <div key={index} className="bg-[#ffc784] pb-10 sm:p-10 md:p-0 pt-0 rounded-l-xs rounded-r-xs md:rounded-r-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-[80vw] m-auto">
                <article className="col-span-1 md:col-span-2 lg:col-span-3 p-10 my-auto">
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <div>
                    {item.description &&
                      item.description.map((subitem, subindex) =>
                        readText(subitem, subindex)
                      )}
                  </div>
                </article>
                <figure className="col-span-1 m-auto md:rounded-full md:overflow-clip md:m-8 lg:m-10 max-h-[90%] flex flex-col justify-center">
                  <img
                    src={item.img_url ? getImage("advisors/" + item.id + "/" + item.img_url) : "/logo-1d.png"}
                    alt={"Billede af " + item.name}
                    className="object-contain"
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
