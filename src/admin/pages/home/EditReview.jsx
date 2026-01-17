//* imports
// react
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";

// components
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import Loading from "../../../components/Loading";

// own functionality
import {
  getData,
  updateData,
  postData,
  deleteData,
} from "../../../data/functions";
import { useReload } from "../../components/LastUpdated/useReload";

//* component
const EditReview = () => {
  const [loading, setLoading] = useState(true);

  //* reload-function for LastUpdated-component
  const [reload, reloading] = useReload();

  //* get data if there's an id in the params
  const { reviewId } = useParams();

  const dataArray = reviewId != undefined ? getData("reviews", reviewId) : null;

  //* ready data for RichTexteditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.review);
    if ((dataArray && dataArray.length > 0) || reviewId == undefined)
      setLoading(false);
  }, [dataArray]);

  //* handle submit
  const [postSucces, setPostSucces] = useState(
    "error message won't show until the post function has failed"
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    // handling the body:
    const date = new Date();
    const text = textData;

    const body = {
      last_updated: date,
      reviewer: event.target.reviewer.value,
      review: text ? text : [],
      order: event.target.order.value,
    };

    // update or post:
    if (dataArray != null && dataArray.length != 0) {
      updateData("reviews", reviewId, body);
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postData({
        table: "reviews",
        body: body,
        newImage: null,
        folder: null,
      }).then((res) => setPostSucces(res));
    } // END if posting a new advisor

    // reload LastUpdated-component
    reload();
  }; // END handleSubmit

  //* deleting review
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteData({
      table: "reviews",
      id: reviewId,
      folder: null,
      image: null,
      navigate: navigate,
      path: "/admin/forside/udtalelser",
    });
  };

  //* return
  return (
    <>
      <title>Admin: Udtalelse</title>
      <section className="mb-3 mx-5 flex flex-col m-auto">
        {loading && <Loading />}
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* go back v */}
        <Link
          to={"/admin/forside/udtalelser"}
          className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
        >
          Tilbage til udtalelser
        </Link>
        {/* go back ^ */}
        {(dataArray == null || (dataArray.length != 0 && textData)) && (
          <div className="border border-gray-300 rounded-xs py-5 px-6 bg-[#87d69937]">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                {/* edit review v */}

                <div className="mb-3">
                  <Input
                    type="text"
                    name="reviewer"
                    label="Hvem"
                    defaultValue={
                      dataArray == null ? null : dataArray[0]?.reviewer
                    }
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="number"
                    name="order"
                    label="Nummer i rækkefølgen"
                    defaultValue={dataArray ? dataArray[0]?.order : null}
                  />
                </div>

                <div className="mb-3">
                  {!showModal && (
                    <RichTextEditor
                      iV={textData}
                      height="h-[200px]"
                      setData={setTextData}
                    />
                  )}
                </div>
                {/* edit review ^ */}
                {/* buttons+ v */}
                <div className="flex flex-wrap justify-evenly sm:justify-end gap-4">
                  {/* error message v */}
                  {postSucces == null && (
                    <p>Noget gik galt, prøv igen eller kom tilbage senere.</p>
                  )}
                  {/* error message ^ */}
                  <SaveButton />

                  {dataArray != null && (
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setShowModal(true);
                      }}
                      className="pt-4 pb-5 px-5 border border-red-300 bg-red-400 rounded-sm cursor-pointer box-border hover:bg-red-500 hover:border-red-200"
                    >
                      Slet
                    </button>
                  )}
                  {dataArray != null &&
                    (reloading ? null : (
                      <LastUpdated table="reviews" id={dataArray[0]?.id} />
                    ))}
                </div>
                {/* buttons+ ^ */}
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default EditReview;
