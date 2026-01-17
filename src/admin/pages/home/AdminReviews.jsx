//* imports
// react
import { useState, useEffect } from "react";
import { Link } from "react-router";

//components
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import NextPrev from "../../components/Pagination/NextPrev";
import AreYouSure from "../../components/AreYouSure/AreYouSure";

// own functionality
import { getData, deleteData } from "../../../data/functions";
import readText from "../../components/RichTextEditor/readText";

//* component
const AdminReviews = () => {
  //* get data:
  const data = getData("reviews", null);

  //* pagination
  const itemsPerPage = 8;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //* deleting a review
  const [showModal, setShowModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState(null);

  const handleDelete = () => {
    deleteData({
      table: "reviews",
      id: deletionItem.id,
      folder: null,
      image: null,
      navigate: null,
      path: null,
    });
  };

  //* return
  return (
    <>
      <title>Admin: Udtalelser</title>
      <section className="flex flex-col mx-5">
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* header v */}
        <h1 className="text-4xl text-center mb-3">Udtalelser</h1>
        {/* header ^ */}
        {/* go back v */}
        <Link
          to={"/admin/forside"}
          className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
        >
          Tilbage til forside
        </Link>
        {/* go back ^ */}
        {data && (
          <>
            {/* buttons - create new, next, prev v */}
            <div className="mb-3 flex gap-5 flex-wrap justify-evenly sm:justify-between">
              
                <Link
                  to={"/admin/forside/udtalelser/ny-udtalelse"}
                  className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
                >
                  Opret ny udtalelse
                </Link>
              
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            {/* buttons - create new, nect, prev ^ */}
            {/* reviews v */}
            <div className="flex flex-col gap-4 mb-3">
              {data
                .slice(currentPageIndex, currentPageIndex + itemsPerPage)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 justify-between border border-gray-300 bg-[#87d69937] rounded-xs py-5 px-6"
                  >
                    {/* review v */}
                    <article>
                      <h2 className="text-lg font-semibold">{item.reviewer}</h2>
                      {item.review &&
                        item.review.map((item, index) => readText(item, index))}
                    </article>
                    {/* review ^ */}
                    {/* buttons+ v */}
                    <div className="flex flex-wrap justify-evenly sm:justify-end gap-4">
                      <Link
                        to={"/admin/forside/udtalelser/" + item.id}
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

                      <LastUpdated table="reviews" id={item.id} />
                    </div>
                    {/* buttons+ ^ */}
                  </div>
                ))}
            </div>
            {/* reviews ^ */}
            {/* buttons - next, prev v */}
            <div className="mb-3">
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            {/* buttons - next, prev ^ */}
          </>
        )}
      </section>
    </>
  );
};

export default AdminReviews;
