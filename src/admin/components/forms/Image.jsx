// component for uploading images
//! i need to work on this

import { uploadFile } from "../../../api/APIfunctions"
import SaveButton from "./SaveButton"

const Image = ({bucket}) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event.target.file_upload.value)

        uploadFile(event.target.file_upload.value, bucket)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="file" id="file_upload" name="file_upload" />
        <SaveButton />
    </form>
  )
}

export default Image