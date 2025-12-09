// component for uploading images
//! i need to work on this

import { uploadFile, getImage } from "../../../api/APIfunctions"
import SaveButton from "./SaveButton"

const Image = ({folder}) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        let file = event.target.file_upload.files[0];

        uploadFile(file, folder, file.name)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="file" id="file_upload" name="file_upload" />
        <SaveButton />
    </form>
  )
}

export default Image