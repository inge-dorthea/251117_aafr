import { useState, useEffect } from "react";
import readText from "../admin/components/RichTextEditor/readText";
import { getData } from "../data/functions";
import { Link } from "react-router";
import Loading from "../components/Loading";
import { BsArrowLeft, BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const data = getData("static-pages", null, setLoading);
  const newsData = getData("news", null, setLoading);
  const reviewData = getData("reviews", null, setLoading);
  const contactData = getData("contact-info", null, setLoading);

  useEffect(() => {
    if (data && newsData && reviewData && contactData) setLoading(false);
  }, [data, newsData, reviewData, contactData]);

  const [showNumber, setShowNumber] = useState(2);

  const changeNumber = (direction) => {
    if (direction == "up") {
      if (showNumber < 4) {
        setShowNumber(showNumber + 1);
      } else if (showNumber == 4) {
        setShowNumber(2);
      }
    }

    if (direction == "down") {
      if (showNumber > 2) {
        setShowNumber(showNumber - 1);
      } else if (showNumber == 2) {
        setShowNumber(4);
      }
    }
  };

  const [showReviewNumber, setShowReviewNumber] = useState(0);

  const review = reviewData[showReviewNumber];

  const changeReview = (direction) => {
    if (direction == "forward") {
      if (showReviewNumber < reviewData.length - 1)
        setShowReviewNumber(showReviewNumber + 1);
      else if (showReviewNumber == reviewData.length - 1)
        setShowReviewNumber(0);
    }
    if ((direction = "back")) {
      if (showReviewNumber > 0) setShowReviewNumber(showReviewNumber - 1);
      else if (showReviewNumber == 0)
        setShowReviewNumber(reviewData.length - 1);
    }
  };

  return (
    <>
      <title>Åben Forældrerådgivning</title>
      {loading && <Loading />}
      {data && (
        <div className="w-[80vw] m-auto py-10">
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

          <div className="grid sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-30">
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
            <section className="order-1 md:order-2 my-3 flex justify-between min-h-[230px] max-h-[290px]">
              {data[1] && (
                <article className="h-full overflow-x-scroll border-t-5 w-full py-2 px-4">
 {contactData[0] && (
                    <div className="mb-3">
                      <p className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl text-center tracking-wide font-semibold mb-2">
                        +45{contactData[0].phone}
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
          </div>
        </div>
      )}
      <div className="w-[80vw] m-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-30 pb-10">
        {newsData && (
          <section className="rounded-l-full rounded-r-xs bg-[#ffc784] pr-4 py-2 flex justify-end min-h-[230px]">
            <div className="flex justify-end sm:justify-between md:justify-end lg:justify-between w-[90%] gap-2">
              <div className="my-auto hidden sm:block md:hidden lg:block text-8xl">
                <BsNewspaper />
              </div>
              <div className="text-end md:w-[80%] lg:w-auto">
                <h2 className="md:text-xl lg:text-2xl">De seneste nyheder</h2>
                {newsData.map((item, index) => (
                  <Link to="/nyheder" key={index}>
                    {item.show_article && (
                      <article className="mt-2">
                        <h3 className="text-md">{item.headline}</h3>
                        <p className="text-xs">
                          {item.created_at.slice(0, 10)}
                        </p>
                      </article>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="rounded-xs bg-[#ffc784] px-6 py-2 min-h-[230px] flex flex-col justify-center">
          {review && (
            <div>
              <article>
                <div>
                  {review.review &&
                    review.review.map((subitem, subindex) =>
                      readText(subitem, subindex)
                    )}
                </div>
                <h3 className="text-end">- {review.reviewer}</h3>
              </article>
            </div>
          )}

          <div className="flex justify-evenly">
            <button
              onClick={() => changeReview("back")}
              className="cursor-pointer text-4xl"
            >
              <BsArrowLeft />
            </button>
            <button
              onClick={() => changeReview("forward")}
              className="cursor-pointer text-4xl"
            >
              <BsArrowRight />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
