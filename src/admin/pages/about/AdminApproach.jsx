import StaticPageForm from "../../components/forms/StaticPageForm";

const AdminApproach = () => {
  return (
    <div className="w-[80vw] m-auto flex flex-col gap-5">
      <h1 className="text-4xl text-center mb-3">Om os - Pædagogisk tilgang</h1>
      <section>
        <h2 className="text-2xl mb-1">Redigér øverste tekst</h2>
        <StaticPageForm id={"8"} height="h-[200px]" />
      </section>
      <section>
        <h2 className="text-2xl mb-1">Redigér midterste tekst</h2>
        <StaticPageForm id={"9"} height="h-[200px]" />
      </section>
      <section>
        <h2 className="text-2xl mb-1">Redigér nederste tekst</h2>
        <StaticPageForm id={"10"} height="h-[200px]" />
      </section>
    </div>
  );
};

export default AdminApproach;
