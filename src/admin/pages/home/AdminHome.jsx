//* import
// react
import { Link } from "react-router";

// components
import StaticPageForm from "../../components/forms/StaticPageForm";

//* component
const AdminHome = () => {
  //* return
  return (
    <>
    <title>Admin: Forside</title>
      <section className="px-5 flex flex-col">
        <h1 className="text-4xl text-center mb-3">Forside</h1>

        <Link
          to={"/admin/forside/udtalelser"}
          className="mb-3 pt-4 pb-5 w-full text-center border border-gray-300 bg-[#fdc684] rounded-xs cursor-pointer box-border hover:bg-[#ffb75f] hover:border-gray-200"
        >
          Redigér i udtalelser
        </Link>
        <article className="mb-3">
          <StaticPageForm id={"1"} height="h-[200px]" />
        </article>

        <article className="mb-3">
          
          <StaticPageForm id={"3"} height="h-[200px]" />
        </article>
        <h2 className="text-2xl mb-1">
        </h2>
        <StaticPageForm id={"4"} height="h-[200px]" />
        <article className="mb-3"></article>

        <article className="mb-3">
          
          <StaticPageForm id={"5"} height="h-[200px]" />
        </article>

        <article className="mb-3">
          
          <StaticPageForm id={"2"} height="h-[200px]" />
        </article>
      </section>
    </>
  );
};

export default AdminHome;
