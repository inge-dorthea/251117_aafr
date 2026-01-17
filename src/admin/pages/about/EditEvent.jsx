//* imports
// react
import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";

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
  const [postSucces, setPostSucces] = useState(
    "error message won't show until the post function has failed"
  );

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
      }).then((res) => setPostSucces(res));
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

  //* return
  return (
    <>
      <title>Admin: Event</title>
      <div className="mx-5 flex flex-col">
        {loading && <Loading />}
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* go back v */}
        <Link
          to={"/admin/samarbejde"}
          className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
        >
          Tilbage til samarbejde
        </Link>
        {/* go back ^ */}
        {/* form v */}
        {(dataArray == null || dataArray.length != 0) && (
          <div className="py-5 px-6 bg-[#87d69937] border border-gray-400 rounded-xs">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* image v */}
              <figure className="mx-auto w-[60%] sm:w-[30%] lg:w-[25%]">
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
                  className="object-cover mx-auto w-full rounded-xs"
                />
              </figure>
              {/* image ^ */}
              <div className="w-full">
                {/* inputs v */}

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
                {/* inputs ^ */}
                {/* buttons v */}
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
                  {dataArray != null && (
                    <LastUpdated table="events" id={dataArray[0]?.id} />
                  )}
                </div>
                {/* buttons ^ */}
              </div>
            </form>
          </div>
        )}
        {/* form ^ */}
      </div>
    </>
  );
};

export default EditEvent;
