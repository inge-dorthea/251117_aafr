import StaticPageForm from "../components/forms/StaticPageForm"

const AdminHome = () => {
  return (
    <div className="w-[80vw] m-auto flex flex-col gap-5">
      <StaticPageForm id={"1"} height="h-[200px]" />
      <StaticPageForm id={"3"} height="h-[200px]" />
      <StaticPageForm id={"4"} height="h-[200px]" />
      <StaticPageForm id={"5"} height="h-[200px]" />
      <StaticPageForm id={"2"} height="h-[200px]" />

    </div>
  )
}

export default AdminHome