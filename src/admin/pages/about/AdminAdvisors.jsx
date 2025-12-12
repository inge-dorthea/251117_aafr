import StaticPageForm from "../../components/forms/StaticPageForm";
import UploadImage from "../../components/forms/UploadImage";
import { getData, getImage } from "../../../api/APIfunctions";
import readText from "../../components/RichTextEditor/readText";
import Input from "../../components/forms/Input";
import SaveButton from "../../components/forms/SaveButton";
import { updateData } from "../../../api/APIfunctions";
import { useState } from "react";
import { Link } from "react-router";

const AdminAdvisors = () => {
  const data = getData("advisors", null);

  console.log(data);

  const handleSubmit = (id, event) => {
    event.preventDefault();

    console.log(event.target.value);

    const date = new Date();

    const body = {
      last_updated: date,
      order: event.target.value,
    };

    updateData("advisors", id, body);
  };

   const [image, setImage] = useState(null)

  return (
    <div className="w-[80vw] flex flex-col gap-5 m-auto">
      <h1>Overskrift</h1>
      <h2>Overskrift til staticpageform</h2>
      <StaticPageForm id={"6"} height="h-[200px]" />
      <UploadImage folder="advisors" setImage={setImage} />
    {/* <img alt="preview image" src={image ? image : getImage("advisors/" + data[0]?.img_url)} /> */}
      
      <Input type="file" name="file" label="Upload et billede" setImage={setImage} />

      <h2>Redigér rådgiverne</h2>
      {/* map out the advisors, link to an edit page for each advisor, make delete-function and button, also make post function */}

      <div className="grid grid-cols-1">
        {data &&
          data.map((item, index) => {
            return (
              <div key={index} style={{ order: `${item.order}` }}>
                <figure>
                  <img
                    src={getImage("advisors/" + item.id + "/" + item.img_url)}
                    alt={item.name}
                  />
                  <figcaption>
                    <h3>{item.name}</h3>
                    <div>
                      {item.description && item.description.map((item, index) =>
                        readText(item, index)
                      )}
                    </div>
                  </figcaption>
                </figure>
                <Link to={"/admin/raadgiverne/" + item.id} > Redigér </Link>
                <form onSubmit={(event) => handleSubmit(item.id, event)}>
                  <Input
                    type="number"
                    name="order"
                    label="Nummer i rækkefølgen"
                    defaultValue={item.order}
                  />
                  <p>
                    når to personer har samme nummer i rækkefølgen, bliver den
                    der har haft nummeret i længst tid prioriteret
                  </p>
                  <SaveButton />
                </form>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminAdvisors;
