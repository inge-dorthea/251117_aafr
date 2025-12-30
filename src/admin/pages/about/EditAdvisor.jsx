//* imports
// react
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// components
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import Loading from "../../../components/Loading";

// own functionality
import {getData, getImage, postData, deleteData, updateWithImage } from "../../../data/functions";

//* component
const EditAdvisor = () => {
  const [loading, setLoading] = useState(true);

  //* get data if there's an id in the params
  const { advisorId } = useParams();

  const dataArray =
    advisorId != undefined ? getData("advisors", advisorId) : null;

  //* ready data for RichTexteditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.description);
    if(dataArray || advisorId == undefined) setLoading(false);
  }, [dataArray]);

  //* setImage to show a preview of the image chosen through file-input
  const [image, setImage] = useState(null);

  //* handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // handling the body:
    const date = new Date();
    const text = textData;
    const newImage = event.target.image.files[0]
      ? event.target.image.files[0]
      : null;

    const body = {
      last_updated: date,
      name: event.target.name.value,
      description: text ? text : [],
      img_url: newImage
        ? newImage.name
        : dataArray
        ? dataArray[0].img_url
        : null,
      order: event.target.order.value,
    };

    // update or post:
    if (dataArray != null && dataArray.length != 0) {
      updateWithImage({
        table: "advisors",
        id: advisorId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "advisors/",
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postData({
        table: "advisors",
        body: body,
        newImage: newImage,
        folder: "advisors/",
      });
    } // END if posting a new advisor
  }; // END handleSubmit

  //* deleting advisor
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteData({
      table: "advisors",
      id: advisorId,
      folder: "advisors/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/raadgiverne",
    });
  };

  //* component
  return (
    <div className="mb-3 w-[80vw] flex flex-col m-auto">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {loading && (
        <Loading />
      )}

      {(dataArray == null || (dataArray.length != 0 && textData)) && (
        <div className="py-5 ps-6 pe-16 bg-orange-300 rounded-l-xs rounded-r-full">
          <form onSubmit={handleSubmit} className="flex justify-between gap-3">
            <div className="w-full">
              <div className="mb-3">
                <Input
                  type="text"
                  name="name"
                  label="Rådgiverens navn"
                  defaultValue={dataArray == null ? null : dataArray[0]?.name}
                />
              </div>

              <div className="mb-3">
                <Input
                  type="file"
                  name="image"
                  label="Billede af rådgiveren"
                  setImage={setImage}
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

            <figure className="size-fit my-auto">
              <img
                src={
                  image
                    ? image
                    : dataArray
                    ? getImage(
                        "advisors/" + advisorId + "/" + dataArray[0]?.img_url
                      )
                    : null
                }
                alt={"Billede af rådgiveren"}
                className="object-cover w-[30vw] rounded-full"
              />
            </figure>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAdvisor;
