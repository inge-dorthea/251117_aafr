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
const RichTextEditor = (iV) => {
  //* Slate editor
  // editor won't change across renders
  // uses useState without a setter
  const [editor] = useState(() => withReact(createEditor()));

  //* Initial value of the text editor
  // iV is sent through from an admin-component
  const initialValue = iV.iV || [
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
            updateData(value); // save to database //! save to a useState and make save button instead
          }
        }}
      >
        <Toolbar />
        <Editable // the "textarea"
          className="border-t border-b border-0 border-gray-300 ps-2 pt-1 pb-2"
          renderLeaf={Leaf} // render text with correct styling
          renderElement={renderElement} // render text with correct html
          onKeyDown={(event) => {
            // enables keyboard shortcuts
            keyboardShortcuts(event, editor);
          }}
        />
      </Slate>
    </>
  );
};

export default RichTextEditor;
