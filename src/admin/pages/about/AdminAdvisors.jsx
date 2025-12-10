import StaticPageForm from "../../components/forms/StaticPageForm";
import UploadImage from "../../components/forms/UploadImage";
import { getData, getImage } from "../../../api/APIfunctions";

const AdminAdvisors = () => {
  const data = getData("advisors", null);

  console.log(data);

  return (
    <div className="w-[80vw] flex flex-col gap-5 m-auto">
      <StaticPageForm id={"6"} height="h-[200px]" />
      <UploadImage folder="advisors" />

      {/* map out the advisors, link to an edit page for each advisor, make delete-function and button, also make post function */}
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <figure>
              <img src={getImage("advisors/" + item.img_url)} alt={item.name} />
              <figcaption>{item.name}</figcaption>
            </figure>
          </div>
        ))}
    </div>
  );
};

export default AdminAdvisors;
