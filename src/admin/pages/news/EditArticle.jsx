//* imports
// react
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";

// components
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
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

const EditArticle = () => {
  //* get data if there's an id in the params
  const { articleId } = useParams();

  const dataArray = articleId != undefined ? getData("news", articleId) : null;

  //* ready data for RichTexteditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.article);
  }, [dataArray]);

  //* setImage to show a preview of the image chosen through file-input
  const [image, setImage] = useState(null);

  //* handle submit
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
      headline: event.target.headline.value,
      show_article: event.target.show_article.checked,
      article: text ? text : [],
      show_author: event.target.show_author.checked,
      author: event.target.author.value,
      img_url: newImage
        ? newImage.name
        : dataArray
        ? dataArray[0].img_url
        : null,
      img_alt: event.target.img_alt ? event.target.img_alt.value : null,
      img_desc: event.target.img_desc ? event.target.img_desc.value : null,
      show_img: event.target.show_img ? event.target.show_img.checked : false,
      order: event.target.order.value,
    };

    // update or post:
    if (dataArray != null && dataArray.length != 0) {
      updateFunction({
        table: "news",
        id: articleId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "news/",
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postFunction({
        table: "news",
        body: body,
        newImage: newImage,
        folder: "news/",
      });
    } // END if posting a new advisor
  }; // END handleSubmit

  //* deleting article
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteFunction({
      table: "news",
      id: articleId,
      folder: "news/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/nyheder",
    });
  };

  return (
    <div className="mb-3 w-[80vw] flex flex-col m-auto">
      {showModal && (
        <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
      )}

      {(dataArray == null || (dataArray.length != 0 && textData)) && (
        <div className="py-5 px-6 flex justify-between gap-5 border border-gray-300 rounded-xs">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full">
              <div className="mb-3 flex gap-15 justify-end">
                <Input
                  type="checkbox"
                  name="show_author"
                  label="Vis forfatter"
                  defaultValue={
                    dataArray == null ? true : dataArray[0].show_author == true
                  }
                />

                <Input
                  type="checkbox"
                  name="show_article"
                  label="Vis artikel"
                  defaultValue={
                    dataArray == null ? true : dataArray[0].show_article == true
                  }
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

              <div className="mb-3">
                <Input
                  type="text"
                  name="author"
                  label="Forfatter"
                  defaultValue={dataArray == null ? null : dataArray[0]?.author}
                />
              </div>

              <div className="mb-3">
                <Input
                  type="text"
                  name="headline"
                  label="Overskrift"
                  defaultValue={
                    dataArray == null ? null : dataArray[0]?.headline
                  }
                />
              </div>

              <div className="mb-3">
                <Input
                  type="file"
                  name="image"
                  label="Billede"
                  setImage={setImage}
                />
              </div>
              {(image || (dataArray && dataArray[0].img_url)) && (
                <div>
                  <figure className="size-fit mx-auto mb-3">
                    <img
                      src={
                        image
                          ? image
                          : dataArray
                          ? getImage(
                              "news/" + articleId + "/" + dataArray[0]?.img_url
                            )
                          : null
                      }
                      alt={dataArray ? dataArray[0].img_alt : "Et billede"}
                      className="object-contain w-full"
                    />
                  </figure>
                  <div className="mb-3 flex justify-start">
                    <Input
                      type="checkbox"
                      name="show_img"
                      label="Vis billede"
                      defaultValue={
                        dataArray == null ? true : dataArray[0].show_img == true
                      }
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
                </div>
              )}

              <div className="mb-3">
                {!showModal && (
                  <RichTextEditor
                    iV={textData}
                    height="h-[400px]"
                    setData={setTextData}
                  />
                )}
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
                  <LastUpdated table="news" id={dataArray[0]?.id} />
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditArticle;
