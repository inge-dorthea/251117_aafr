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
      <div className="py-5">
      <div className="grid grid-cols-1 md:grid-cols-5 bg-[#ffc784] mx-5 rounded-xs md:max-h-screen md:overflow-y-scroll">
        {article && (
          <section className="md:col-span-3 lg:col-span-4 bg-[#e6ffec] m-5 p-10 rounded-xs md:max-h-[90vh] md:overflow-y-scroll">
            <article>
              <h1 className="text-5xl">{article.headline}</h1>
              <p className="text-sm">Udgivet: {article.created_at.slice(0, 10)}</p>
              {article.show_author && <p className="text-sm">Skrevet af: {article.author}</p>}
              {article.show_img && (
                <figure className="w-[80%] m-auto">
                  <img
                    src={getImage("news/" + article.id + "/" + article.img_url)}
                    alt={article.img_alt}
                  />
                  <figcaption className="text-sm p-3 rounded-xs border border-gray-400">{article.img_desc}</figcaption>
                </figure>
              )}
              <div className="mt-5">
                {article.article &&
                  article.article.map((item, index) => readText(item, index))}
              </div>
            </article>
          </section>
        )}
        <section className="md:col-span-2 lg:col-span-1 text-center p-5 md:pl-0 md:py-5 md:pr-5 flex flex-col gap-3 md:max-h-[90vh] md:overflow-y-scroll">
          {data &&
            data.map((item, index) => (
              <button
                onClick={() => setShowArticle(index)}
                key={index}
                disabled={showArticle == index ? true : false}
                className="disabled:bg-[#ffb75f8f] disabled:cursor-default cursor-pointer w-full rounded-xs bg-[#e6ffec]"
              >
                <p>{item.headline}</p>
                <p className="text-sm">{item.created_at.slice(0, 10)}</p>
              </button>
            ))}
        </section>
      </div></div>
    </>
  );
};

export default News;
