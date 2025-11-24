// Import React dependencies.
import { useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Element, Transforms } from "slate";
import { updateData } from "../../../api/APIfunctions";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { keyboardShortcuts, Leaf, CustomEditor } from "./functions";
import Toolbar from "./Toolbar";
import  CustomElement from "./CustomElement";

const RichTextEditor = (iV) => {
  //* Create a Slate editor object that won't change across renders.
  // using useState without a setter
  const [editor] = useState(() => withReact(createEditor()));

  //* create initial value of the text editor
  const initialValue = iV.iV || [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  //* Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(
    (props) => <CustomElement {...props} />,
    []
  );

  return (
    <>
      {/* v render the Slate context */}
      <Slate
        editor={editor}
        initialValue={initialValue}
        //*   save changes to local storage:
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
            updateData(value); // value is sent over, because that's the json - content has been turned into a string
          }
        }}
      >

<Toolbar />


        {/* Editable needs to be inside Slate apparently - that's fine lol */}
        <Editable
          renderLeaf={Leaf}
          renderElement={renderElement}
          onKeyDown={(event) => {
            keyboardShortcuts(event, editor);
          }}
        />
      </Slate>
    </>
  );
};

export default RichTextEditor;
