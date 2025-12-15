import { getData, getImage } from "../api/APIfunctions";
import readText from "../admin/components/RichTextEditor/readText";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const News = ({}) => {
  const [loading, setLoading] = useState(true);

  const data = getData("news", null);

  useEffect(() => {
    if(data) setLoading(false);
  }, [data])
  

  const [showArticle, setShowArticle] = useState(0);

  const article = data[showArticle];

  return (
    <>
      <title>Nyheder</title>
      {loading && (
        <Loading />
      )}
      <div>
        {article && (
          <section>
            <article>
              <h1>{article.headline}</h1>
              <p>{article.created_at.slice(0, 10)}</p>
              {article.show_author && <p>Skrevet af: {article.author}</p>}
              {article.show_img && (
                <figure>
                  <img
                    src={getImage("news/" + article.id + "/" + article.img_url)}
                    alt={article.img_alt}
                  />
                  <figcaption>{article.img_desc}</figcaption>
                </figure>
              )}
              <div>
                {article.article &&
                  article.article.map((item, index) => readText(item, index))}
              </div>
            </article>
          </section>
        )}
        <section>
          {data &&
            data.map((item, index) => (
              <button
                onClick={() => setShowArticle(index)}
                key={index}
                disabled={showArticle == index ? true : false}
                className="disabled:text-gray-500"
              >
                <p>{item.headline}</p>
                <p>{item.created_at.slice(0, 10)}</p>
              </button>
            ))}
        </section>
      </div>
    </>
  );
};

export default News;
