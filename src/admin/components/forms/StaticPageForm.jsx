//* react
import { useState, useEffect } from "react";

//* own functions
import { getData, updateData } from "../../../api/APIfunctions";
import { useReload } from "../LastUpdated/useReload";

//* components
import Input from "./Input";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import SaveButton from "./SaveButton";
import LastUpdated from "../LastUpdated/LastUpdated";

const StaticPageForm = ({ id, height }) => {
  //* reload-function for LastUpdated-component
  const [reload, reloading] = useReload();

  //* get data
  const dataArray = getData("static-pages", id);

  //* data for and from RichTextEditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.text);
  }, [dataArray]);

  //* updating data in database
  const handleSubmit = (event) => {
    event.preventDefault();

    const text = textData;

    const body = {
      show_title: event.target.show_title.checked,
      title: event.target.title.value,
      text: text,
    };

    updateData("static-pages", id, body);

    // reload LastUpdated-component
    reload();
  };

  //* return
  return (
    <div>
      {textData && (
        <form onSubmit={handleSubmit} className="px-9 py-7 border border-gray-400 rounded-xs">
          <div className="grid grid-cols-3 px-4 pb-4">
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

          <div className="flex justify-between pt-4">
            <SaveButton />
            {reloading ? null : <LastUpdated table="static-pages" id={id} />}
          </div>
        </form>
      )}
    </div>
  );
};

export default StaticPageForm;
