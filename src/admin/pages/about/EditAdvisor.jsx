import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import {
  deleteFile,
  deleteData,
  getData,
  getImage,
  updateData,
  uploadFile,
  postData
} from "../../../api/APIfunctions";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";

const EditAdvisor = () => {
  const { advisorId } = useParams();

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

    const date = new Date();
    const text = textData;
    const newImage = event.target.image.files[0]
      ? event.target.image.files[0]
      : null;
    const body = {
      last_updated: date,
      name: event.target.name.value,
      description: text ? text : [],
      img_url: newImage ? newImage.name : dataArray ? dataArray[0].img_url : null,
      order: event.target.order.value,
    };

    if(dataArray != null && dataArray.length != 0) {
      updateData("advisors", advisorId, body).
      then((res) => {
        if (res == undefined) throw new Error("Couldn't update data.");
        else if (res != undefined && newImage && dataArray[0].img_url) {
          deleteFile("advisors/" + advisorId, dataArray[0].img_url).then((res) => {
            if(res == undefined) throw new Error("Couldn't delete image.");
            else {
              uploadFile(newImage, "advisors/" + advisorId, newImage.name).then((res) => {
                if(res == undefined) throw new Error("Couldn't upload image.");
                else window.location.reload();
              })
            }
          });
        }
        else if (res != undefined && newImage && !dataArray[0].img_url) {
          uploadFile(newImage, "advisors/" + advisorId, newImage.name).then((res) => {
                if(res == undefined) throw new Error("Couldn't upload image.");
                else window.location.reload();
              })
        }
        else if (res != undefined && !newImage) {
          console.log("no new image");
          window.location.reload();
        }
      })
      
    } // END if updating an existing advisor
    else if(dataArray == null || dataArray.length == 0) {
      postData("advisors", body).
      then((res) => {
        if (res == undefined) throw new Error ("Couldn't post data.");
        else if (res != undefined && newImage) {
         uploadFile(newImage, "advisors/" + res[0].id, newImage.name).
          then((res) => {
            if (res == undefined) throw new Error("Couldn't upload image.");
            else window.location.reload();
          })
        }
        else if (res != undefined && !newImage) {
          console.log("no new image");
          window.location.reload();
        }
      })
    } // END if posting a new advisor


  } // END handleSubmit

  const handleDelete = () => {
    if(dataArray[0].img_url){
    deleteFile("advisors/" + advisorId, dataArray[0].img_url).then((res) => {
            if(res == undefined) throw new Error("Couldn't delete image.");
            else deleteData("advisors", advisorId).then((res) => {
            if(res == undefined) throw new Error("Couldn't delete data.");
            else window.location.reload();
            })
    })

    }
    else {
      deleteData("advisors", advisorId).then((res) => {
            if(res == undefined) throw new Error("Couldn't delete data.");
            else window.location.reload();
            })
    }
  }

  return (
    <div>
      {dataArray != null && (
        <button onClick={handleDelete}>Slet rådgiver</button>
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
                  ? getImage("advisors/" + advisorId + "/" + dataArray[0]?.img_url)
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
