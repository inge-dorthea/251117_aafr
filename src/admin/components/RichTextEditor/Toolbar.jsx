// slate editor
import { useSlate } from "slate-react";

// functions
import { CustomEditor } from "./functions";

// icons
import { GoListUnordered } from "react-icons/go";
import { GoListOrdered } from "react-icons/go";
import { BsBlockquoteLeft } from "react-icons/bs";

const Toolbar = () => {
  const editor = useSlate(); // editor to feed the CustomEditor functions

  // are the buttons active?
  let boldActive = CustomEditor.isBoldMarkActive(editor);
  let italicActive = CustomEditor.isItalicMarkActive(editor);
  let underlineActive = CustomEditor.isUnderlineMarkActive(editor);
  let lineThroughActive = CustomEditor.isLineThroughMarkActive(editor);
  let quoteActive = CustomEditor.isBlockActive(editor, "quote");
  let orderedListActive = CustomEditor.isBlockActive(editor, "ordered-list")
  let unorderedListActive = CustomEditor.isBlockActive(editor, "unordered-list")
  
  // button style
  const buttonStyle = "border px-1.5 pt-0.5 pb-1 mt-0.5 leading-none rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"

  return (
    <menu className="p-1 ps-3 flex flex-wrap gap-4 bg-gray-50 border border-gray-300 border-b-transparent rounded-t-xs h-full">
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
          className={`font-bold ${boldActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-xl`}
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
          className={`italic ${italicActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-xl`}
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
          className={`underline ${underlineActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-xl`}
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
          className={`line-through ${lineThroughActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-xl`}
          title="Gennemstreget"
        >
          ab
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "quote");
          }}
          className={`${quoteActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-2xl`}
          title="Citat"
        >
          <BsBlockquoteLeft />
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "ordered-list");
          }}
          title="Liste med tal"
          className={`${orderedListActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-2xl`}
        >
          <GoListOrdered />
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "unordered-list");
          }}
          title="Liste med punkter"
          className={`${unorderedListActive ? "bg-gray-200 border-gray-300" : "border-transparent"} ${buttonStyle} text-2xl`}

        >
          <GoListUnordered />
        </button>
      </li>
    </menu>
  );
};

export default Toolbar;
