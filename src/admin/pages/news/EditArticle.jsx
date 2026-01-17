//* imports
// react
import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";

// components
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
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

//* component
const EditArticle = () => {
  const [loading, setLoading] = useState(true);

  //* get data if there's an id in the params
  const { articleId } = useParams();

  const dataArray = articleId != undefined ? getData("news", articleId) : null;

  //* ready data for RichTexteditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.article);
    if ((dataArray && dataArray.length > 0) || articleId == undefined)
      setLoading(false);
  }, [dataArray]);

  //* setImage to show a preview of the image chosen through file-input
  const [image, setImage] = useState(null);

  //* handle submit
  const [postSucces, setPostSucces] = useState(
    "error message won't show until the post function has failed"
  );

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
      updateWithImage({
        table: "news",
        id: articleId,
        body: body,
        newImage: newImage,
        oldImage: dataArray[0].img_url,
        folder: "news/",
      });
    } // END if updating an existing advisor
    else if (dataArray == null || dataArray.length == 0) {
      postData({
        table: "news",
        body: body,
        newImage: newImage,
        folder: "news/",
      }).then((res) => setPostSucces(res));
    } // END if posting a new advisor
  }; // END handleSubmit

  //* deleting article
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteData({
      table: "news",
      id: articleId,
      folder: "news/",
      image: dataArray[0].img_url,
      navigate: navigate,
      path: "/admin/nyheder",
    });
  };

  //* return
  return (
    <>
      <title>Admin: Artikel</title>
      <div className="mb-3 mx-5 flex flex-col">
        {loading && <Loading />}
        {/* deletion modal v */}
        {showModal && (
          <AreYouSure doFunction={handleDelete} setShowModal={setShowModal} />
        )}
        {/* deletion modal ^ */}
        {/* go back v */}
        <Link
          to={"/admin/nyheder"}
          className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
        >
          Tilbage til nyheder
        </Link>
        {/* go back ^ */}
        {/* form v */}
        {(dataArray == null || (dataArray.length != 0 && textData)) && (
          <div className="py-5 px-6 flex justify-between gap-5 bg-[#87d69937] border border-gray-300 rounded-xs">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full">
                {/* checkboxes v */}

                <div className="mb-3 flex flex-wrap gap-x-15 gap-y-5 justify-end">
                  <Input
                    type="checkbox"
                    name="show_author"
                    label="Vis forfatter"
                    defaultValue={
                      dataArray == null
                        ? true
                        : dataArray[0].show_author == true
                    }
                  />

                  <Input
                    type="checkbox"
                    name="show_article"
                    label="Vis artikel"
                    defaultValue={
                      dataArray == null
                        ? true
                        : dataArray[0].show_article == true
                    }
                  />
                </div>
                {/* checkboxes ^ */}

                {/* inputs v */}
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
                    defaultValue={
                      dataArray == null ? null : dataArray[0]?.author
                    }
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
                {/* inputs ^ */}

                {/* image inputs v */}
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
                                "news/" +
                                  articleId +
                                  "/" +
                                  dataArray[0]?.img_url
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
                          dataArray == null
                            ? true
                            : dataArray[0].show_img == true
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
                {/* image inputs ^ */}

                {/* text editor v */}
                <div className="mb-3">
                  {!showModal && (
                    <RichTextEditor
                      iV={textData}
                      height="h-[400px]"
                      setData={setTextData}
                    />
                  )}
                </div>
                {/* text editor ^ */}
                {/* button v */}
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
                    <LastUpdated table="news" id={dataArray[0]?.id} />
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

export default EditArticle;
