import { deleteFile, updateData, uploadFile, postData, deleteData } from '../../api/APIfunctions'


export const updateFunction = ({table, id, body, newImage, oldImage, folder}) => {
  updateData(table, id, body).
  then((res) => {
    if(res == undefined) throw new Error("Couldn't update data.");
    else if (res != undefined && newImage && oldImage) {
        deleteFile(folder + id, oldImage).
        then((res) => {
            if (res == undefined) throw new Error("Couldn't delete image.");
            else {
                uploadFile(newImage, folder + id, newImage.name).
                then((res) => {
                    if (res == undefined) throw new Error("Couldn't upload image.");
                    else window.location.reload();
                })
            }
        })
    }
    else if (res != undefined && newImage && !oldImage) {
        uploadFile(newImage, folder + id, newImage.name).
                then((res) => {
                    if (res == undefined) throw new Error("Couldn't upload image.");
                    else window.location.reload();
                })
    }
    else if ( res != undefined && !newImage) {
        window.location.reload();
    }
  })
}

export const postFunction = ({table, body, newImage, folder}) => {
  postData(table, body).then((res) => {
    if (res == undefined) throw new Error("Couldn't post data.");
    else if (res != undefined && newImage) {
      uploadFile(newImage, folder + res[0].id, newImage.name).then((res) => {
        if (res == undefined) throw new Error("Couldn't upload image.");
        else window.location.reload();
      });
    } else if (res != undefined && !newImage) {
      window.location.reload();
    }
  });
};

export const deleteFunction = ({ table, id, folder, image, navigate, path }) => {
  if (image && folder) {
    deleteFile(folder + id, image).then((res) => {
      if (res == undefined) throw new Error("Couldn't delete image.");
      else
        deleteData(table, id).then((res) => {
          if (res == undefined) throw new Error("Couldn't delete data.");
          else if (navigate && path) navigate(path);
          else window.location.reload();
        }) //.then(() => navigate(path));
    });
  } else {
    deleteData(table, id).then((res) => {
      if (res == undefined) throw new Error("Couldn't delete data.");
      else if (navigate && path) navigate(path);
      else window.location.reload();
    }) //.then(() => navigate(path));
  }
};