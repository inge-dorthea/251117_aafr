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
  //* data
  const data = getData("advisors", null);

  //* pagination
  const itemsPerPage = 5;
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
    <>
    <title>Admin: Rådgiverne</title>
    <div className="mx-5 flex flex-col">
      {/* deletion modal v */}
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {/* deletion modal ^ */}
      {/* heading v */}
      <h1 className="text-4xl text-center mb-3">Om os - Rådgiverne</h1>
      {/* heading ^ */}
      {/* text editor v */}
      <section className="mb-6">
        <h2 className="text-2xl mb-1">Redigér i den generelle beskrivelse</h2>
        <StaticPageForm id={"6"} height="h-[200px]" />
      </section>
      {/* text editor ^ */}
      {/* advisors v */}
      <section>
        {/* error message v */}
        {data == null && (
          <p>
            Noget gik galt ved indlæsning af rådgiverne. Prøv at genindlæse
            siden eller kom igen senere.
          </p>
        )}
        {/* error message ^ */}
        {data && (
          <>
            <h2 className="text-2xl mb-1">Redigér i rådgiverne</h2>

            {/* buttons v */}
            <div className="mb-3 flex flex-wrap gap-5 justify-evenly sm:justify-between">
              <Link
                to={"/admin/raadgiverne/ny-raadgiver"}
                className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
              >
                Opret ny rådgiver
              </Link>
              <NextPrev
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                length={data.length}
              />
            </div>
            {/* buttons ^ */}
            {/* advisor v */}
            <div className="flex flex-col gap-4 mb-3">
              {data
                .slice(currentPageIndex, currentPageIndex + itemsPerPage)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-5 ps-6 pe-6 bg-[#87d69937] rounded-xs"
                    >
                      <figure className="flex flex-col lg:flex-row justify-between items-center gap-3">
                        {/* picture v */}
                        <img
                          src={getImage(
                            "advisors/" + item.id + "/" + item.img_url
                          )}
                          alt={"Billede af " + item.name}
                          className="object-cover w-[60%] sm:w-[30%] lg:w-[25%] rounded-xs"
                        />
                        {/* picture ^ */}
                        <figcaption className="flex flex-col justify-between w-full">
                          {/* text v */}
                          <article className="text-sm">
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

                            {item.description &&
                              item.description.map((item, index) =>
                                readText(item, index)
                              )}
                          </article>
                          {/* text ^ */}
                          {/* buttons v */}
                          <div className="flex flex-wrap justify-end gap-4">
                            <Link
                              to={"/admin/raadgiverne/" + item.id}
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
                            <LastUpdated table="advisors" id={item.id} />
                          </div>
                          {/* buttons ^ */}
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
            </div>
            {/* advisor ^ */}
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
      {/* advisors ^ */}
    </div>
    </>
    
  );
};

export default AdminAdvisors;
