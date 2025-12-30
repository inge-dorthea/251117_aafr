//* imports
// react
import { useState, useEffect } from "react";
import { Link } from "react-router";

//components
import StaticPageForm from "../../components/forms/StaticPageForm";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import NextPrev from "../../components/Pagination/NextPrev";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import Loading from "../../../components/Loading";

// own functionality
import { getData, getImage } from "../../../data/functions";
import readText from "../../components/RichTextEditor/readText";
import { deleteData } from "../../../data/functions";

//* component
const AdminAdvisors = () => {
  const [loading, setLaoding] = useState(true);
  //* get data:
  const data = getData("advisors", null);

  useEffect(() => {
    if(data) setLaoding(false);
  }, [data])

  //* pagination
  const itemsPerPage = 4;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting an advisor
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteData({
      table: "advisors",
      id: deletionItem.id,
      folder: "advisors/",
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
      {loading && (
        <Loading />
      )}
      <h1 className="text-4xl text-center mb-3">Om os - Rådgiverne</h1>

      <section className="mb-6">
        <h2 className="text-2xl mb-1">Redigér i den generelle beskrivelse</h2>
        <StaticPageForm id={"6"} height="h-[200px]" />
      </section>

      <section>
        <h2 className="text-2xl mb-1">Redigér i rådgiverne</h2>

        {data && (
          <>
            <div className="mb-3 flex justify-between">
              <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                <Link
                  to={"/admin/raadgiverne/ny-raadgiver"}
                  className="h-full w-full"
                >
                  Opret ny rådgiver
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
                      className="py-5 ps-6 pe-16 bg-orange-300 rounded-l-xs rounded-r-full"
                    >
                      <figure className="flex justify-between gap-3">
                        <figcaption className="flex flex-col justify-between w-full">
                          <article className="text-sm">
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

                            {item.description &&
                              item.description.map((item, index) =>
                                readText(item, index)
                              )}
                          </article>
                          <div className="flex justify-end gap-4">
                            <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                              <Link
                                to={"/admin/raadgiverne/" + item.id}
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
                            <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                              <p>Rækkefølge:</p>
                              <p>{item.order}</p>
                            </div>
                            <LastUpdated table="advisors" id={item.id} />
                          </div>
                        </figcaption>
                        <img
                          src={getImage(
                            "advisors/" + item.id + "/" + item.img_url
                          )}
                          alt={"Billede af " + item.name}
                          className="object-cover w-[15vw] rounded-full"
                        />
                      </figure>
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
      </section>
    </div>
  );
};

export default AdminAdvisors;
