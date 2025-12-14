import ContactInfoForm from "../components/forms/ContactInfoForm";
import StaticPageForm from "../components/forms/StaticPageForm";

const AdminContact = () => {
  return (
    <div className="w-[80vw] m-auto flex flex-col">
      <h1 className="text-4xl text-center mb-3">Kontakt</h1>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">Redigér i kontaktinformation</h2>
        <ContactInfoForm />
      </article>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">Redigér øverste tekst</h2>
        <StaticPageForm id={"11"} height="h-[300px]" />
      </article>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">Redigér nederste tekst</h2>
        <StaticPageForm id={"12"} height="h-[300px]" />
      </article>
    </div>
  );
};

export default AdminContact;
