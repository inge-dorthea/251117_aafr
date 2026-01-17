import StaticPageForm from "../../components/forms/StaticPageForm";

const AdminApproach = () => {
  return (
    <>
    <title>Admin: Pædagogisk tilgang</title>
    <div className="mx-5 flex flex-col gap-5">
      <h1 className="text-4xl text-center mb-3">Om os - Pædagogisk tilgang</h1>
      <section>
        <StaticPageForm id={"8"} height="h-[200px]" />
      </section>
      <section>
        <StaticPageForm id={"9"} height="h-[200px]" />
      </section>
      <section>
        <StaticPageForm id={"10"} height="h-[200px]" />
      </section>
    </div>
    </>
    
  );
};

export default AdminApproach;
