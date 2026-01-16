//* functions
import readText from "../../admin/components/RichTextEditor/readText";
import { getData } from "../../data/functions";

//* components
import Loading from "../../components/Loading";
import FallbackContent from "../FallbackContent";

//* react
import { useEffect, useState } from "react";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsFillTelephoneFill,
} from "react-icons/bs";

const Content = () => {
  //* data and loading
  const [loading, setLoading] = useState(true);

  const data = getData("static-pages", null);
  const contactData = getData("contact-info", null);

  useEffect(() => {
    if (
      (data && data.length > 0 && contactData && contactData.length > 0) ||
      (data && data.length > 0 && contactData == null) ||
      (data == null && contactData && contactData.length > 0) ||
      (data == null && contactData == null)
    )
      setLoading(false);
  }, [data, contactData]);

  //   * choosing which text to show
  const [showNumber, setShowNumber] = useState(2);

  const changeNumber = (direction) => {
    if (direction == "up") {
      if (showNumber < 4) setShowNumber(showNumber + 1);
      else if (showNumber == 4) setShowNumber(2);
    } else if (direction == "down") {
      if (showNumber > 2) setShowNumber(showNumber - 1);
      else if (showNumber == 2) setShowNumber(4);
    }
  }; // END changeNumber

  //  * return
  return (
    <>
      {loading && <Loading />}
      {/* fallback content v */}
      {data == null && <FallbackContent />}
      {/* fallback content ^ */}
      {data && (
        <div className="w-[80vw] m-auto py-10">
          {/* what they offer v */}
          <section className="mb-10 bg-[#ffc784] py-4 px-6 rounded-l-xs rounded-r-xs md:rounded-r-full">
            {data[0] && (
              <article className="sm:w-full md:w-[90%] lg:w-[90%]">
                {data[0].show_title && (
                  <h1 className="text-xl font-semibold">{data[0].title}</h1>
                )}
                <div>
                  {data[0].text &&
                    data[0].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>
          {/* what they offer ^ */}

          <div className="grid sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-30">
            {/* three text boxes with info v */}
            <section className="order-2 md:order-1 my-3 flex justify-between min-h-[230px] max-h-[290px]">
              <div className="sm:text-7xl md:text-5xl lg:text-7xl flex flex-col justify-evenly border border-r-5 h-full bg-[#ffc784]">
                <button
                  onClick={() => changeNumber("down")}
                  className="cursor-pointer"
                >
                  <BsCaretUpFill />
                </button>
                <hr />
                <button
                  onClick={() => changeNumber("up")}
                  className="cursor-pointer"
                >
                  <BsCaretDownFill />
                </button>
              </div>
              {data[showNumber] && (
                <article className="h-full overflow-x-scroll border-b-5 w-full py-2 px-4">
                  {data[showNumber].show_title && (
                    <h2>{data[showNumber].title}</h2>
                  )}
                  <div>
                    {data[showNumber].text &&
                      data[showNumber].text.map((item, index) =>
                        readText(item, index)
                      )}
                  </div>
                </article>
              )}
            </section>
            {/* three text boxes with info ^ */}

            {/* text box about calling them v */}
            <section className="order-1 md:order-2 my-3 flex justify-between min-h-[230px] max-h-[290px]">
              {data[1] && (
                <article className="h-full overflow-x-scroll border-t-5 w-full py-2 px-4">
                  {contactData && contactData[0] && (
                    <div className="mb-3">
                      <p className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl text-center tracking-wide font-semibold mb-2">
                        {contactData[0].phone}
                      </p>
                      <p>Vi har telefon tid {contactData[0].phone_time}.</p>
                    </div>
                  )}
                  {data[1].show_title && <h2>{data[1].title}</h2>}
                  <div>
                    {data[1].text &&
                      data[1].text.map((item, index) => readText(item, index))}
                  </div>
                </article>
              )}
              <div className="sm:text-6xl md:text-2xl lg:text-6xl p-2 border border-l-5 h-full bg-[#ffc784] flex flex-col justify-center">
                <BsFillTelephoneFill />
              </div>
            </section>
            {/* text box about calling them ^ */}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
