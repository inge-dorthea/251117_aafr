//* imports
// react
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

// components
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

const EditPartner = () => {
  //* get data if there's an id in the params
  const { partnerId } = useParams();

  const dataArray =
    partnerId != undefined ? getData("partners", partnerId) : null;

  //* setImage to show a preview of the image chosen through file-input
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // handling the body:
    const date = new Date();
    const newImage = event.target.image.files[0]
      ? event.target.image.files[0]
      : null;

    const body = {
      last_updated: date,
      partner: event.target.partner.value,
      img_url: newImage
        ? newImage.name
        : dataArray
        ? dataArray[0].img_url
        : null,
      url: event.target.url.value,
      order: event.target.order.value,
    };

    // update or post:
    if (dataArray != null && dataArray.length != 0) {
      updateFunction({
        table: "partners",
        id: partnerId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "partners/",
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postFunction({
        table: "partners",
        body: body,
        newImage: newImage,
        folder: "partners/",
      });
    } // END if posting a new advisor
  }; // END handleSubmit

  //* deleting advisor
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteFunction({
      table: "partners",
      id: partnerId,
      folder: "partners/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/samarbejdspartnere",
    });
  };

  //* component
  return (
    <div className="w-[80vw] m-auto flex flex-col">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}

      {(dataArray == null ||
        dataArray.length != 0) && (
          <div className="py-5 px-6 border border-gray-400 rounded-xs">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between gap-3"
            >
              <div className="w-full">
                <div className="mb-3">
                  <Input
                    type="text"
                    name="partner"
                    label="Navn"
                    defaultValue={
                      dataArray == null ? null : dataArray[0]?.partner
                    }
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="file"
                    name="image"
                    label="Logo"
                    setImage={setImage}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="text"
                    name="url"
                    label="Link til hjemmeside"
                    defaultValue={dataArray == null ? null : dataArray[0].url}
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
                          "partners/" + partnerId + "/" + dataArray[0]?.img_url
                        )
                      : null
                  }
                  alt={"Samarbejdspartners logo"}
                  className="object-cover w-[30vw]"
                />
              </figure>
            </form>
          </div>
        )}
    </div>
  );
};

export default EditPartner;
