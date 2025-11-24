import { Editor, Transforms, Element } from "slate";

/* #region CustomEditor */
export const CustomEditor = {
  //* Bold-toggle
  // checks if bold is active on the selection:
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  //   toggles bold:
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  //* Italic-toggle
  isItalicMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    isActive
      ? Editor.removeMark(editor, "italic")
      : Editor.addMark(editor, "italic", true);
  },

  //* Underline-toggle
  isUnderlineMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },
  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    isActive
      ? Editor.removeMark(editor, "underline")
      : Editor.addMark(editor, "underline", true);
  },

  //* Line-through-toggle
  isLineThroughMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.linethrough === true : false;
  },
  toggleLineThroughMark(editor) {
    const isActive = CustomEditor.isLineThroughMarkActive(editor);
    isActive
      ? Editor.removeMark(editor, "linethrough")
      : Editor.addMark(editor, "linethrough", true);
  },

  //* Quote-toggle
  isQuoteMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.quote === true : false;
  },
  toggleQuoteMark(editor) {
    const isActive = CustomEditor.isQuoteMarkActive(editor);
    isActive
      ? Editor.removeMark(editor, "quote")
      : Editor.addMark(editor, "quote", true);
  },

  //* Ordered and unordered list-toggle
  // makes sure the lists are rendered and saved properly
  // don't understand it completely, but it works
  isListType(format) {
    const LIST_TYPES = ["ordered-list", "unordered-list"];
    return LIST_TYPES.includes(format);
  },
  isBlockActive(editor, format) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => {
          if (!Editor.isEditor(n) && Element.isElement(n)) {
            return n.type === format;
          }
          return false;
        },
      })
    );

    return !!match;
  },
  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = CustomEditor.isListType(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        CustomEditor.isListType(n.type),
      split: true,
    });

    let newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };

    Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};
/* #endregion CustomEditor */

/* #region keyboardShortcuts */
//* keyboard shortcuts
export const keyboardShortcuts = (event, editor) => {
  if (!event.ctrlKey) return; // the shortcuts require the user to press ctrl

  switch (event.key) {
    // when F is pressed, selection will become bold
    case "f": {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }

    // when K is pressed, selection will become italic
    case "k": {
      event.preventDefault();
      CustomEditor.toggleItalicMark(editor);
      break;
    }

    // when U is pressed, selection will become underlined
    case "u": {
      event.preventDefault();
      CustomEditor.toggleUnderlineMark(editor);
      break;
    }
  }
};
/* #endregion keyboardShortcuts */

/* #region Leaf */
//* defines how each text string is rendered
// text strings are called leaves in the SlateJS editor
export const Leaf = (props) => {
  return (
    <span // the text is rendered in span tags to make them go inline
      {...props.attributes}
      className={`
      ${props.leaf.bold ? "font-bold" : ""} 
      ${props.leaf.italic ? "italic" : ""} 
      ${props.leaf.underline ? "underline" : ""}
      ${props.leaf.linethrough ? "line-through" : ""}
      ${props.leaf.quote ? "quote" : ""}
      `}
    >
      {props.children}
    </span>
  );
};
/* #endregion Leaf */
