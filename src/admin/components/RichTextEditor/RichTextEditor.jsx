// Import React dependencies.
import { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import { updateData } from "../../../api/APIfunctions";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { keyboardShortcuts, Leaf, CustomEditor } from "./functions";

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
        {/* toolbar */}
        <menu>
          <li>
            <button
              onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
              }}
              style={{ fontWeight: "bold" }}
              title="Fed&#10;(Ctrl + F)"
            >
              F
            </button>
          </li>
          <li>
            <button
              onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleItalicMark(editor);
              }}
              style={{ fontStyle: "italic" }}
              title="Kursiv&#10;(Ctrl + K)"
            >
              K
            </button>
          </li>
          <li>
            <button
              onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
              }}
              style={{ textDecoration: "underline" }}
              title="Understreget&#10;(Ctrl + U)"
            >
              U
            </button>
          </li>
        </menu>
        {/* end toolbar */}

        {/* Editable needs to be inside Slate apparently - that's fine lol */}
        <Editable
          renderLeaf={Leaf}
          onKeyDown={(event) => {
            keyboardShortcuts(event, editor);
          }}
        />
      </Slate>
    </>
  );
};

export default RichTextEditor;
