import {useState, useEffect} from "react";
import { getData, updateData } from "../../../api/APIfunctions";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const StaticPageForm = ({id, height}) => {
  // get data
  const dataArray = getData("static-pages", id);

  // data for and from RichTextEditor
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    dataArray && setTextData(dataArray[0]?.text);
  }, [dataArray]);

  // updating data in database
  const handleSubmit = (event) => {
    event.preventDefault();

    const text = textData;

    const body = {
      show_title: event.target.show_title.checked,
      title: event.target.title.value,
      text: text,
    };

    updateData("static-pages", id, body);
  }

  return (
    <div>
      {textData && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="show_title">
            Vis overskrift:
            <input
              type="checkbox"
              name="show_title"
              id="show_title"
              defaultChecked={dataArray[0].show_title == true}
            />
          </label>
          <label htmlFor="title">
            Overskrift:
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={dataArray[0].title}
            />
          </label>
          <RichTextEditor iV={textData} height={height} setData={setTextData} />
          <button type="submit">Gem og udgiv</button>
        </form>
      )}
    </div>
  );
};

export default StaticPageForm;
