import StaticPageForm from "../../components/forms/StaticPageForm";
import Image from "../../components/forms/Image";

const AdminAdvisors = () => {
  
    return (
      <div className="w-[80vw] flex flex-col gap-5 m-auto">
        <StaticPageForm id={"6"} height="h-[200px]" />
        <Image folder="advisors" />
      </div>
    );
  
};

export default AdminAdvisors;
