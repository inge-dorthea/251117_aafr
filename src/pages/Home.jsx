import { useState, useEffect, useCallback, useMemo } from "react";
import readText from "../admin/components/RichTextEditor/readText";
import { getData } from "../api/APIfunctions";
import { Link } from "react-router";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const data = getData("static-pages", null, setLoading);
  const newsData = getData("news", null, setLoading);
  const reviewData = getData("reviews", null, setLoading);
  const contactData = getData("contact-info", null, setLoading);

  useEffect(() => {
  if(data && newsData && reviewData && contactData) setLoading(false);
  }, [data, newsData, reviewData, contactData])
  

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

  return (
    <>
      <title>Åben Forældrerådgivning</title>
      {loading && <Loading />}
      {data && (
        <div className="w-[80vw] m-auto">
          <section className="mb-3">
            {data[0] && (
              <article>
                {data[0].show_title && <h1>{data[0].title}</h1>}
                <div>
                  {data[0].text &&
                    data[0].text.map((item, index) => readText(item, index))}
                </div>
              </article>
            )}
          </section>

          <section className="my-3">
            <div>
              <button onClick={() => changeNumber("down")}>▲</button>
              <button onClick={() => changeNumber("up")}>▼</button>
            </div>
            {data[showNumber] && (
              <article id="frontpage_2">
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
          <section className="my-3">
            {data[1] && (
              <article>
                {data[1].show_title && <h2>{data[1].title}</h2>}
                <div>
                  {data[1].text &&
                    data[1].text.map((item, index) => readText(item, index))}
                </div>
                {contactData[0] && (
                  <div>
                    <p>Vi har telefon tid {contactData[0].phone_time}</p>
                    <p>+45 {contactData[0].phone}</p>
                  </div>
                )}
              </article>
            )}
          </section>
        </div>
      )}
      {newsData && (
        <div className="w-[80vw] m-auto">
          <section>
            {newsData.map((item, index) => (
              <Link to="/nyheder" key={index}>
                {item.show_article && (
                  <article>
                    <h3>{item.headline}</h3>
                    <p>{item.created_at.slice(0, 10)}</p>
                  </article>
                )}
              </Link>
            ))}
          </section>
        </div>
      )}
      {reviewData && (
        <div>
          <section>
            {reviewData.map((item, index) => (
              <div key={index}>
                {item.show_review && (
                  <article>
                    <div>
                      {item.review &&
                        item.review.map((subitem, subindex) =>
                          readText(subitem, subindex)
                        )}
                    </div>
                    <h3>- {item.reviewer}</h3>
                  </article>
                )}
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
