//* imports
// react
import { useState } from "react";
import { Link } from "react-router";

//components
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import NextPrev from "../../components/Pagination/NextPrev";
import AreYouSure from "../../components/AreYouSure/AreYouSure";

// own functionality
import { getData, getImage } from "../../../api/APIfunctions";
import readText from "../../components/RichTextEditor/readText";
import { deleteFunction } from "../../functions/dataFunctions";

//* component
const AdminNews = () => {
  //* get data:
  const data = getData("news", null);

  //* pagination
  const itemsPerPage = 8;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting an article
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteFunction({
      table: "news",
      id: deletionItem.id,
      folder: "news/",
      image: deletionItem.img_url,
      navigate: null,
      path: null,
    });
  };

  //* return
  return (
    <div className="w-[80vw] flex flex-col m-auto">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}

      <h1 className="text-4xl text-center mb-3">Nyheder</h1>

      {data && (
        <>
          <div className="mb-3 flex justify-between">
            <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
              <Link to={"/admin/nyheder/ny-artikel"} className="h-full w-full">
                Opret ny artikel
              </Link>
            </button>
            <NextPrev
              itemsPerPage={itemsPerPage}
              currentPageIndex={currentPageIndex}
              setCurrentPageIndex={setCurrentPageIndex}
              length={data.length}
            />
          </div>

          <div className="flex flex-col gap-4 mb-3">
            {data
              .slice(currentPageIndex, currentPageIndex + itemsPerPage)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-5 px-6 flex justify-between gap-5 border border-gray-300 rounded-xs"
                  >
                    <div className="w-full flex flex-col justify-between gap-3">
                      <article className="text-sm border border-gray-300 rounded-xs p-2">
                        <h2 className="text-lg font-semibold">
                          {item.headline}
                        </h2>
                        <p className="text-xs">Skrevet af: {item.author}</p>
                        <p className="text-xs mb-2">
                          Udgivet: {item.created_at.slice(0, 10)}
                        </p>

                        <div className="max-h-[100px] overflow-y-scroll">
                          {item.article &&
                            item.article.map((item, index) =>
                              readText(item, index)
                            )}
                        </div>
                      </article>
                      <div className="flex justify-start gap-4">
                        <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                          <p>Rækkefølge:</p>
                          <p>{item.order}</p>
                        </div>
                        <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                      <p>Forfatter:</p>
                      <p>{item.show_author ? "Vises" : "Vises ikke"}</p>
                    </div>
                    <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                      <p>Synlighed:</p>
                      <p>{item.show_article ? "Vises" : "Vises ikke"}</p>
                    </div>
                        <LastUpdated table="news" id={item.id} />
                      </div>
                      <div className="flex justify-start gap-4"> 
                        <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                          <Link
                            to={"/admin/nyheder/" + item.id}
                            className="h-full w-full"
                          >
                            Redigér
                          </Link>
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setShowModal(true);
                            setDeletionItem(item);
                          }}
                          className="pt-4 pb-5 px-5 border border-red-300 bg-red-400 rounded-sm cursor-pointer box-border hover:bg-red-500 hover:border-red-200"
                        >
                          Slet
                        </button>
                      </div>
                      
                    </div>
                    {item.img_url && (
                      <figure>
                        <img
                          src={getImage("news/" + item.id + "/" + item.img_url)}
                          alt={item.img_alt}
                          className="object-cover w-[20vw]"
                        />
                        <figcaption className="flex flex-col justify-between w-full mt-1">
                          <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                            <p className="text-xs">{item.img_desc}</p>
                          </div>
                        </figcaption>
                      </figure>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="mb-3">
            <NextPrev
              itemsPerPage={itemsPerPage}
              currentPageIndex={currentPageIndex}
              setCurrentPageIndex={setCurrentPageIndex}
              length={data.length}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNews;
