//* functions
import { getData } from "../../data/functions";
import readText from "../../admin/components/RichTextEditor/readText";

//* components
import Loading from "../../components/Loading";

//* react
import { BsNewspaper } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const NewsWidget = () => {
  //* data and loading
  const [loading, setLoading] = useState(true);

  const newsData = getData("news", null);

  useEffect(() => {
    if ((newsData && newsData.length > 0) || newsData == null)
      setLoading(false);
  }, [newsData]);

  //  * return
  if (newsData == null) return null; // the widget doesn't show if there's no data
  else if (newsData && newsData[0])
    return (
      <>
        {loading && <Loading />}
        <section className="rounded-l-full rounded-r-xs bg-[#ffc784] pr-4 py-2 flex justify-end min-h-[230px]">
          <div className="flex justify-end sm:justify-between md:justify-end lg:justify-between w-[90%] gap-2">
            <div className="my-auto hidden sm:block md:hidden lg:block text-8xl">
              <BsNewspaper />
            </div>
            <div className="text-end md:w-[80%] lg:w-auto">
              <h2 className="text-xl lg:text-2xl">Seneste nyhed</h2>
              <Link to="/nyheder" >
              <article className="mt-3">
                <h3 className="text-md">{newsData[0].headline}</h3>
                <p className="text-xs">{newsData[0].created_at.slice(0, 10)}</p>
                <div className="text-sm break-all">
                    {newsData[0].article.slice(0, 1).map((item, index) => readText(item, index, "short"))}
                </div>
              </article>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
};

export default NewsWidget;
