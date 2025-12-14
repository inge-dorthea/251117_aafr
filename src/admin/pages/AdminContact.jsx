import ContactInfoForm from "../components/forms/ContactInfoForm";
import StaticPageForm from "../components/forms/StaticPageForm";

const AdminContact = () => {
  return (
    <div className="w-[80vw] m-auto flex flex-col gap-5">
      <ContactInfoForm />
      <StaticPageForm id={"11"} height="h-[300px]" />
      <StaticPageForm id={"12"} height="h-[300px]" />
    </div>
  );
};

export default AdminContact;
