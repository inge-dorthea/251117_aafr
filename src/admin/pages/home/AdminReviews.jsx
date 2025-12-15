//* imports
// react
import { useState, useEffect } from "react";
import { Link } from "react-router";

//components
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import NextPrev from "../../components/Pagination/NextPrev";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import Loading from "../../../components/Loading";

// own functionality
import { getData } from "../../../api/APIfunctions";
import readText from "../../components/RichTextEditor/readText";
import { deleteFunction } from "../../functions/dataFunctions";

//* component
const AdminReviews = () => {
  const [loading, setLoading] = useState(true);

  //* get data:
  const data = getData("reviews", null);

  useEffect(() => {
    if(data) setLoading(false);
  }, [data])

  //* pagination
  const itemsPerPage = 8;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting a review
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteFunction({
      table: "reviews",
      id: deletionItem.id,
      folder: null,
      image: null,
      navigate: null,
      path: null,
    });
  };
  return (
    <section className="w-[80vw] flex flex-col m-auto">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {loading &&
      (
        <Loading />
      )}

      <h1 className="text-4xl text-center mb-3">Udtalelser</h1>

      {data && (
        <>
          <div className="mb-3 flex justify-between">
            <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
              <Link
                to={"/admin/forside/udtalelser/ny-udtalelse"}
                className="h-full w-full"
              >
                Opret ny udtalelse
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
            {data.slice(currentPageIndex, currentPageIndex + itemsPerPage).map((item, index) => (
                <div key={index} className="flex flex-col gap-3 justify-between border border-gray-300 rounded-xs py-5 px-6">
                  <article>
                    <h2 className="text-lg font-semibold">{item.reviewer}</h2>
                    {item.review &&
                      item.review.map((item, index) => readText(item, index))}
                  </article>
                  <div className="flex justify-end gap-4">
                    <button className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200">
                      <Link
                        to={"/admin/forside/udtalelser/" + item.id}
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
                    <div className="text-center bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
                      <p>Synlighed:</p>
                      <p>{item.show_review ? "Vises" : "Vises ikke"}</p>
                    </div>
                    <LastUpdated table="reviews" id={item.id} />
                  </div>
                </div>
              ))}
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
  );
};

export default AdminReviews;
