import ContactInfoForm from "../components/forms/ContactInfoForm";
import StaticPageForm from "../components/forms/StaticPageForm";

const AdminContact = () => {

  return (
    <div>
      <ContactInfoForm />
      <StaticPageForm id={"11"} />
      <StaticPageForm id={"12"} />
    </div>
  );
};

export default AdminContact;
