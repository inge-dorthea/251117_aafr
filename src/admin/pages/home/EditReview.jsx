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

// own functionality
import { getData, getImage } from "../../../api/APIfunctions";
import {
  updateFunction,
  postFunction,
  deleteFunction,
} from "../../functions/dataFunctions";

//* component
const EditReview = () => {
  //* get data if there's an id in the params
  const { reviewId } = useParams();

  const dataArray = reviewId != undefined ? getData("reviews", reviewId) : null;

  //* ready data for RichTexteditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.review);
  }, [dataArray]);

  //* handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // handling the body:
    const date = new Date();
    const text = textData;

    const body = {
      last_updated: date,
      reviewer: event.target.reviewer.value,
      review: text ? text : [],
      show_review: event.target.show_review.checked,
      order: event.target.order.value,
    };

    // update or post:
    if (dataArray != null && dataArray.length != 0) {
      updateFunction({
        table: "reviews",
        id: reviewId,
        body: body,
        newImage: null,
        oldImage: null,
        folder: null,
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postFunction({
        table: "reviews",
        body: body,
        newImage: null,
        folder: null,
      });
    } // END if posting a new advisor
  }; // END handleSubmit

  //* deleting review
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteFunction({
      table: "reviews",
      id: reviewId,
      folder: null,
      image: null,
      navigate: navigate,
      path: "/admin/forside/udtalelser",
    });
  };

  return <section className="mb-3 w-[80vw] flex flex-col m-auto">
{showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}

      <Link
        to={"/admin/forside/udtalelser"}
        className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
      >
        Tilbage til udtalelser
      </Link>

      {(dataArray == null || (dataArray.length != 0 && textData)) && (
        <div className="border border-gray-300 rounded-xs py-5 px-6">
            <form onSubmit={handleSubmit}>
                <div className="w-full">
                   <div className="mb-3">
                <Input type="checkbox" name="show_review" label="Vis udtalelse" defaultValue={dataArray == null ? true : dataArray[0].show_review == true} />
              </div> 
              <div className="mb-3">
                <Input
                  type="text"
                  name="reviewer"
                  label="Hvem"
                  defaultValue={dataArray == null ? null : dataArray[0]?.reviewer}
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
              <div className="flex justify-end gap-4">
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
                {dataArray != null && (
                  <LastUpdated table="advisors" id={dataArray[0]?.id} />
                )}
              </div>
            </div>
            </form>
        </div>
      )}
  </section>
};

export default EditReview;
