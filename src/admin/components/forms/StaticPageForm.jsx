//* react
import { useState, useEffect } from "react";

//* own functions
import { getData, updateData } from "../../../data/functions"
import { useReload } from "../LastUpdated/useReload";

//* components
import Input from "./Input";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import SaveButton from "./SaveButton";
import LastUpdated from "../LastUpdated/LastUpdated";
import Loading from "../../../components/Loading";

const StaticPageForm = ({ id, height }) => {
  //* set the page to be laoding until data has been fetched
  const [loading, setLoading] = useState(true);

  //* reload-function for LastUpdated-component
  const [reload, reloading] = useReload();

  //* get data
  const dataArray = getData("static-pages", id);

  //* data for and from RichTextEditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.text);

    if(dataArray) setLoading(false);
  }, [dataArray]);

  //* updating data in database
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const date = new Date();

    const text = textData;

    const body = {
      last_updated: date,
      show_title: event.target.show_title.checked,
      title: event.target.title.value,
      text: text,
    };

    const updatedData = updateData("static-pages", id, body);

    if(updatedData) setLoading(false);

    // reload LastUpdated-component
    reload();
  };

  //* return
  return (
    <div>
      {loading && (
        <Loading />
      )}
      {textData && (
        <form onSubmit={handleSubmit} className="px-3 sm:px-9 py-7 border border-gray-400 rounded-xs bg-[#87d69937]">
          <div className="grid grid-cols-1 lg:grid-cols-3 px-4 pb-4">
            <Input
              type="text"
              name="title"
              label="Overskrift"
              defaultValue={dataArray[0].title}
              span="col-span-2"
            />
            <Input
              type="checkbox"
              name="show_title"
              label="Vis overskrift"
              defaultValue={dataArray[0].show_title == true}
              span="col-span-1"
            />
          </div>

          <RichTextEditor iV={textData} height={height} setData={setTextData} />

          <div className="flex flex-col gap-5 sm:flex-row items-center sm:justify-between pt-4">
            <SaveButton />
            {reloading ? null : <LastUpdated table="static-pages" id={id} />}
          </div>
        </form>
      )}
    </div>
  );
};

export default StaticPageForm;
