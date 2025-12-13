import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { getData, getImage } from "../../../api/APIfunctions";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";
import LastUpdated from "../../components/LastUpdated/LastUpdated";

import {
  updateFunction,
  postFunction,
  deleteFunction,
} from "../../functions/dataFunctions";
import { useNavigate } from "react-router";
import AreYouSure from "../../components/AreYouSure/AreYouSure";

const EditAdvisor = () => {
  const { advisorId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const dataArray =
    advisorId != undefined ? getData("advisors", advisorId) : null;

  const [image, setImage] = useState(null);

  const [textData, setTextData] = useState(null);

  console.log(dataArray);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.description);
  }, [dataArray]);

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
      updateFunction({
        // object used for readability
        table: "advisors",
        id: advisorId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "advisors/",
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postFunction({
        table: "advisors",
        body: body,
        newImage: newImage,
        folder: "advisors/",
      });
    } // END if posting a new advisor
  }; // END handleSubmit

  const handleDelete = () => {
    deleteFunction({
      table: "advisors",
      id: advisorId,
      folder: "advisors/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/raadgiverne",
    });
  };

  return (
    <div>
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}
      {dataArray != null && (
        <>
          <button onClick={() => setShowModal(true)}>Slet rådgiver</button>
          <LastUpdated table="advisors" id={advisorId} />
        </>
      )}
      {(dataArray == null || (dataArray.length != 0 && textData)) && (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Rådgiverens navn"
            defaultValue={dataArray == null ? null : dataArray[0]?.name}
          />
          <Input
            type="number"
            name="order"
            label="Nummer i rækkefølgen"
            defaultValue={dataArray ? dataArray[0]?.order : null}
          />
          <Input
            type="file"
            name="image"
            label="Billede af rådgiveren"
            setImage={setImage}
          />
          <figure>
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
            />
          </figure>
          {!showModal && (
            <RichTextEditor
              iV={textData}
              height="h-[200px]"
              setData={setTextData}
            />
          )}

          <SaveButton />
        </form>
      )}
    </div>
  );
};

export default EditAdvisor;
