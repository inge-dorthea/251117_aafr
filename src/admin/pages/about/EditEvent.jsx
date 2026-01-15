//* imports
// react
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// components
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";
import LastUpdated from "../../components/LastUpdated/LastUpdated";
import AreYouSure from "../../components/AreYouSure/AreYouSure";
import Loading from "../../../components/Loading";

// own functionality
import {
  getData,
  getImage,
  updateWithImage,
  postData,
  deleteData,
} from "../../../data/functions";

const EditEvent = () => {
  //* loading
  const [loading, setLoading] = useState(true);

  //* get data if there's an id in the params
  const { eventId } = useParams();

  const dataArray = eventId != undefined ? getData("events", eventId) : null;

  useEffect(() => {
    if ((dataArray && dataArray.length > 0) || eventId == undefined)
      setLoading(false);
  }, [dataArray]);

  //* set image to show a preview of image chosen through fileinput
  const [image, setImage] = useState(null);

  //* handle submit - update/post
  const handleSubmit = (event) => {
    event.preventDefault();

    // handle body
    const date = new Date();
    const newImage = event.target.image.files[0]
      ? event.target.image.files[0]
      : null;

    const body = {
      last_updated: date,
      img_url: newImage
        ? newImage.name
        : dataArray
        ? dataArray[0].img_url
        : null,
      img_alt: event.target.img_alt.value,
      img_desc: event.target.img_desc.value,
      order: event.target.order.value,
    };

    // update or post
    if (dataArray != null && dataArray.length != 0) {
      updateWithImage({
        table: "events",
        id: eventId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "events/",
      });
    } // END if updating an existing event
    else if (dataArray == null || dataArray.length == 0) {
      postData({
        table: "events",
        body: body,
        newImage: newImage,
        folder: "events/",
      });
    } // END if posting a new event
  }; // END handleSubmit

  //* handle delete
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteData({
      table: "events",
      id: eventId,
      folder: "events/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/samarbejdspartnere",
    });
  }; //END handle delete

  //* component
  return (
    <div className="w-[80vw] m-auto flex flex-col">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {loading && <Loading />}

      {(dataArray == null || dataArray.length != 0) && (
        <div className="py-5 px-6 border border-gray-400 rounded-xs">
          <form
            onSubmit={handleSubmit}
            className="flex justify-between gap-3"
          >
            <div className="w-full">
                <div className="mb-3">
                <Input
                  type="file"
                  name="image"
                  label="Event-billede"
                  setImage={setImage}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  name="img_alt"
                  label="Alternativ tekst til billede"
                  defaultValue={
                    dataArray == null ? null : dataArray[0]?.img_alt
                  }
                />
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  name="img_desc"
                  label="Billedtekst til under billedet"
                  defaultValue={
                    dataArray == null ? null : dataArray[0]?.img_desc
                  }
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  name="order"
                  label="Nummer i rækkefølgen"
                  defaultValue={
                    dataArray == null ? null : dataArray[0]?.order
                  }
                />
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
                  <LastUpdated table="events" id={dataArray[0]?.id} />
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
                        "events/" + eventId + "/" + dataArray[0]?.img_url
                      )
                    : null
                }
                alt={"Eventets billede"}
                className="object-cover w-[30vw]"
              />
            </figure>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
