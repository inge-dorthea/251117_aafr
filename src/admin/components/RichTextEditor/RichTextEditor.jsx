//* imports
// react
import { useState, useCallback } from "react";

// slate
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// api
import { updateData } from "../../../api/APIfunctions";

// components
import Toolbar from "./Toolbar";
import CustomElement from "./CustomElement";

// functions
import { keyboardShortcuts, Leaf } from "./functions";

//* Rich Text Editor
const RichTextEditor = ({ iV, height, setData }) => {
  //* Update database
  // const [data, setData] = useState(iV);

  const updateDB = () => {
    // updateData("test-table", 3, data);
  };

  //* Slate editor
  // editor won't change across renders
  // uses useState without a setter
  const [editor] = useState(() => withReact(createEditor()));

  //* Initial value of the text editor
  // iV is sent through from an admin-component
  const initialValue = iV || [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  //* Rendering function
  // render based on the element passed to props - a list will be a list and so on
  // useCallback: to memoize the function for subsequent renders.
  const renderElement = useCallback(
    (props) => <CustomElement {...props} />,
    []
  );

  return (
    <>
      <Slate // slate context
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          // saving the value
          const isLastChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isLastChange) {
            // const content = JSON.stringify(value);
            // localStorage.setItem("content", content); // save to local storage
            setData(value); // save to database //! save to a useState and make save button instead
          }
        }}
      >
        <Toolbar />
        <Editable // the "textarea"
          className={`border border-x-gray-200 border-gray-300 px-2 pt-1 pb-2 focus:border-0 focus:outline-2 outline-blue-300 rounded-b-xs box-border overflow-scroll w-full ${height}`}
          renderLeaf={Leaf} // render text with correct styling
          renderElement={renderElement} // render text with correct html
          onKeyDown={(event) => {
            // enables keyboard shortcuts
            keyboardShortcuts(event, editor);
          }}
        />
        {/* <div className="flex mt-2 w-full">
          <button
          className="w-full border rounded-xs cursor-pointer box-border px-2 py-1 bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
          title="Gem og udgiv på hjemmesiden"
          onClick={() => updateDB()}
        >
          Gem og udgiv
        </button>
        <p className="text-end w-full mt-1">Feedback ift. om teksten er gemt.</p>
        </div> */}
        
      </Slate>
    </>
  );
};

export default RichTextEditor;
