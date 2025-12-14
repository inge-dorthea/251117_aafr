import StaticPageForm from "../../components/forms/StaticPageForm";
import { Link } from "react-router";

const AdminHome = () => {
  return (
    <section className="w-[80vw] m-auto flex flex-col">
      <h1 className="text-4xl text-center mb-3">Forside</h1>

      <Link
        to={"/admin/forside/udtalelser"}
        className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
      >
        Redigér i udtalelser
      </Link>
      <article className="mb-3">
        <h2 className="text-2xl mb-1">Redigér i tilbudstekst</h2>
        <StaticPageForm id={"1"} height="h-[200px]" />
      </article>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">
          Redigér i praktisk informationstekst nr. 1
        </h2>
        <StaticPageForm id={"3"} height="h-[200px]" />
      </article>
      <h2 className="text-2xl mb-1">
        Redigér i praktisk informationstekst nr. 2
      </h2>
      <StaticPageForm id={"4"} height="h-[200px]" />
      <article className="mb-3"></article>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">
          Redigér i praktisk informationstekst nr. 3
        </h2>
        <StaticPageForm id={"5"} height="h-[200px]" />
      </article>

      <article className="mb-3">
        <h2 className="text-2xl mb-1">
          Redigér i information om hvad der sker, når man ringer
        </h2>
        <StaticPageForm id={"2"} height="h-[200px]" />
      </article>
    </section>
  );
};

export default AdminHome;
