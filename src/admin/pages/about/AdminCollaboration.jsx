//* imports
// react
import { Link } from "react-router";
import { useState, useEffect } from "react";

// components
import StaticPageForm from "../../components/forms/StaticPageForm";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import NextPrev from "../../components/Pagination/NextPrev";

// own functionality
import { getData, getImage, deleteData } from "../../../data/functions";

const AdminCollaboration = () => {
  //* get data
  const data = getData("events", null);

  //* pagination
  const itemsPerPage = 8;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting a partner
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteData({
      table: "events",
      id: deletionItem.id,
      folder: "events/",
      image: deletionItem.img_url,
      navigate: null,
      path: null,
    });
  };

  //* return
  return (
    <>
      <title>Admin: Samarbejde</title>
      <div className="mx-5 flex flex-col gap-5">
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* headline v */}
        <h1 className="text-4xl text-center mb-3">Om os - Samarbejde</h1>
        {/* headline ^ */}
        {/* text editor v */}
        {!showModal && (
          <section>
            <h2 className="text-2xl mb-1">Redigér i tekst om samarbejde</h2>
            <StaticPageForm id={"7"} height="h-[200px]" />
          </section>
        )}
        {/* text editor ^ */}
        {/* events v */}
        <section>
          <h2 className="text-2xl mb-1">Redigér i events</h2>
          {data && (
            <>
              {/* buttons v */}
              <div className="mb-3 flex flex-wrap gap-5 justify-evenly sm:justify-between">
                <Link
                  to={"/admin/samarbejde/ny-event"}
                  className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
                >
                  Opret ny event
                </Link>
                <NextPrev
                  itemsPerPage={itemsPerPage}
                  currentPageIndex={currentPageIndex}
                  setCurrentPageIndex={setCurrentPageIndex}
                  length={data.length}
                />
              </div>
              {/* buttons ^ */}
              {/* event v */}
              <div className="mb-3 flex flex-col gap-5">
                {data
                  .slice(currentPageIndex, currentPageIndex + itemsPerPage)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="py-5 px-6 border border-gray-400 rounded-xs bg-[#87d69937]"
                    >
                      <figure className="flex flex-col gap-3 items-center">
                        {/* image v */}
                        <img
                          src={getImage(
                            "events/" + item.id + "/" + item.img_url
                          )}
                          alt={item.img_alt}
                          className="object-cover w-[60%] sm:w-[30%] lg:w-[25%] rounded-xs"
                        />
                        {/* image ^ */}
                        <figcaption className="flex flex-col justify-center w-full">
                          {/* text v */}
                          <article className="text-center mb-3 font-thin">
                            <p>{item.img_desc}</p>
                          </article>
                          {/* text ^ */}
                          <div className="flex flex-wrap justify-evenly sm:justify-start gap-4">
                            {/* buttons v */}
                            <Link
                              to={"/admin/samarbejde/" + item.id}
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
                            <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                              <p>Rækkefølge:</p>
                              <p>{item.order}</p>
                            </div>
                            {item.last_updated && (
                              <LastUpdated table="events" id={item.id} />
                            )}
                            {/* buttons ^ */}
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
              </div>
              {/* event ^ */}
            </>
          )}
        </section>
        {/* events ^ */}
      </div>
    </>
  );
};

export default AdminCollaboration;
