import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import {
  deleteFile,
  getData,
  getImage,
  updateData,
  uploadFile,
} from "../../../api/APIfunctions";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";

const EditAdvisor = () => {
  const { advisorId } = useParams();

  const dataArray =
    advisorId != undefined ? getData("advisors", advisorId) : null;

  const [image, setImage] = useState(null);

  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.description);
  }, [dataArray]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const date = new Date();
    const text = textData;
    const newImage = event.target.image.files[0] ? event.target.image.files[0] : null;
    const body = {
      last_updated: date,
      name: event.target.name.value,
      description: text,
      img_url: newImage ? newImage.name : dataArray[0].img_url,
      order: event.target.order.value,
    };

    if (dataArray != null && dataArray.length != 0) {
      updateData("advisors", advisorId, body);
      if (newImage) {
        deleteFile("advisors", dataArray[0].img_url);
        uploadFile(
          newImage,
          "advisors",
          newImage.name
        );
      }
    }
  };

  return (
    <div>
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
                  ? getImage("advisors/" + dataArray[0]?.img_url)
                  : null
              }
              alt={"Billede af rådgiveren"}
            />
          </figure>
          <RichTextEditor
            iV={textData}
            height="h-[200px]"
            setData={setTextData}
          />
          <SaveButton />
        </form>
      )}
    </div>
  );
};

export default EditAdvisor;
