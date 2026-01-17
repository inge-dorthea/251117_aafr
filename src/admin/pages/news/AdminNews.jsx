//* imports
// react
import { useState } from "react";
import { Link } from "react-router";

//components
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import NextPrev from "../../components/Pagination/NextPrev";
import AreYouSure from "../../components/AreYouSure/AreYouSure";

// own functionality
import { getData, getImage, deleteData } from "../../../data/functions";
import readText from "../../components/RichTextEditor/readText";

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
    deleteData({
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
    <>
      <title>Admin: Nyheder</title>
      <div className="mx-5 flex flex-col">
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* heading v */}
        <h1 className="text-4xl text-center mb-3">Nyheder</h1>
        {/* heading ^ */}
        {data && (
          <>
            {/* buttons v */}
            <div className="mb-3 flex flex-wrap gap-5 justify-evenly sm:justify-between">
              <Link
                to={"/admin/nyheder/ny-artikel"}
                className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
              >
                Opret ny artikel
              </Link>
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            {/* buttons ^ */}

            {/* news v */}
            <div className="flex flex-col gap-4 mb-3">
              {data
                .slice(currentPageIndex, currentPageIndex + itemsPerPage)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-5 px-6 flex justify-between gap-5 bg-[#87d69937] border border-gray-300 rounded-xs"
                    >
                      <div className="w-full flex flex-col justify-between gap-3">
                        {/* image v */}
                        {item.img_url && (
                          <figure>
                            <img
                              src={getImage(
                                "news/" + item.id + "/" + item.img_url
                              )}
                              alt={item.img_alt}
                              className="object-cover m-auto w-[60%] sm:w-[30%] lg:w-[25%] rounded-xs"
                            />
                          </figure>
                        )}
                        {/* image ^ */}
                        {/* article v */}
                        <article className="text-sm bg-gray-50 border border-gray-300 rounded-xs p-2">
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
                        {/* article ^ */}
                        {/* buttons v */}
                        <div className="flex flex-wrap justify-evenly sm:justify-start gap-4">
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
                        <div className="flex flex-wrap justify-evenly sm:justify-start gap-4">
                            <Link
                              to={"/admin/nyheder/" + item.id}
                              className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
                            >
                              Redigér
                            </Link>
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
                        {/* buttons ^ */}
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* news ^ */}
            {/* buttons v */}
            <div className="mb-3">
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            {/* buttons ^ */}
          </>
        )}
      </div>
    </>
  );
};

export default AdminNews;
