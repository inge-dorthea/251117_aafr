//* imports
// react
import { Link } from "react-router";
import { useState, useEffect } from "react";

// components
import StaticPageForm from "../../components/forms/StaticPageForm";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import NextPrev from "../../components/Pagination/NextPrev";
import Loading from "../../../components/Loading";

// own functionality
import { getImage, getData } from "../../../api/APIfunctions";
import { deleteFunction } from "../../functions/dataFunctions";

//* component
const AdminPartners = () => {
  const [loading, setLoading] = useState(true);

  //* get data
  const data = getData("partners", null);

  useEffect(() => {
    if(data) setLoading(false);
  }, [data])
  

  //* pagination
  const itemsPerPage = 8;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting a partner
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteFunction({
      table: "partners",
      id: deletionItem.id,
      folder: "partners/",
      image: deletionItem.img_url,
      navigate: null,
      path: null,
    });
  };

  //* return
  return (
    <div className="w-[80vw] m-auto flex flex-col gap-5">
      <h1 className="text-4xl text-center mb-3">Om os - Samarbejdspartnere</h1>

      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {loading && (
        <Loading />
      )}
      {!showModal && (
        <section>
          <h2 className="text-2xl mb-1">Redigér i tekst om samarbejde</h2>
          <StaticPageForm id={"7"} height="h-[200px]" />
        </section>
      )}

      <section>
        <h2 className="text-2xl mb-1">Redigér i samarbejdspartnerne</h2>
        {data && (
          <>
            <div className="mb-3 flex justify-between">
              <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                <Link
                  to={"/admin/samarbejdspartnere/ny-samarbejdspartner"}
                  className="h-full w-full"
                >
                  Opret ny samarbejdspartner
                </Link>
              </button>
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            <div className="mb-3">
              {data
                .slice(currentPageIndex, currentPageIndex + itemsPerPage)
                .map((item, index) => (
                  <div
                    key={index}
                    className="py-5 px-6 border border-gray-400 rounded-xs"
                  >
                    <figure className="flex justify-between gap-3">
                      <figcaption className="flex flex-col justify-between w-full">
                        <h3 className="text-lg font-semibold text-center mb-1">
                          {item.partner}
                        </h3>
                        <div className="flex justify-center gap-4">
                          <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                            <Link
                              to={"/admin/samarbejdspartnere/" + item.id}
                              className="h-full w-full"
                            >
                              Redigér
                            </Link>
                          </button>
                          <button
                            onClick={(event) => {
                              event.preventDefault()
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
                            <LastUpdated table="partners" id={item.id} />
                          )}
                        </div>
                      </figcaption>
                      <img
                        src={getImage(
                          "partners/" + item.id + "/" + item.img_url
                        )}
                        alt={item.partner + "'s logo"}
                        className="w-[20vw] object-fit border"
                      />
                    </figure>
                  </div>
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AdminPartners;
