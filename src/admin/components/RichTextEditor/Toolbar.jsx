import { CustomEditor } from "./functions";

import { useSlate } from "slate-react";

const Toolbar = () => {
  const editor = useSlate();

  return (
    <menu>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
          className="font-bold"
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
          className="italic"
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
          className="underline"
          title="Understreget&#10;(Ctrl + U)"
        >
          U
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleLineThroughMark(editor);
          }}
          className="line-through"
          title="Gennemstreget"
        >
          ab
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleQuoteMark(editor);
          }}
          className="quote"
          title="Citat"
        >
          quote
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "ordered-list");
          }}
          title="Liste med tal"
        >
          ordered list
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "unordered-list");
          }}
          title="Liste med punkter"
        >
          unordered list
        </button>
      </li>
    </menu>
  );
};

export default Toolbar;
