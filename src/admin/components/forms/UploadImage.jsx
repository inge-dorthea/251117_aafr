// component for uploading images
//! i need to work on this

import { uploadFile, getImage } from "../../../api/APIfunctions"
import SaveButton from "./SaveButton"
import { useState } from "react"

const UploadImage = ({folder, setImage}) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        let file = event.target.file_upload.files[0];

        uploadFile(file, folder, file.name)
    }

   

const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}

  return (
    <form onSubmit={handleSubmit}>
        <input type="file" onChange={onImageChange} id="file_upload" name="file_upload" />

        <SaveButton />
    </form>
  )
}

export default UploadImage