import { Editor, Transforms, Element } from "slate";

/* #region toggle functions */
//* toggle functions
// a custom set of helpers
// toggles for bold, italic and underline
export const CustomEditor = {
  //! BOLD
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

  //! ITALIC
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

  //! UNDERLINE
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


  isBlockActive (editor, format) {
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
        !Editor.isEditor(n) && Element.isElement(n) && CustomEditor.isListType(n.type),
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

isListType(format) {
const LIST_TYPES = ["ordered-list", "bulleted-list"];

  return LIST_TYPES.includes(format);
}

}; // END toggle functions
/* #endregion toggle functions */

/* #region keyboard shortcuts */
//* keyboard shortcut function
// the user can press ctrl + f/k/u to make the text bold/italic/underlined
// uses the CustomEditor functions to toggle
export const keyboardShortcuts = (event, editor) => {
  if (!event.ctrlKey) return; // if ctrl is not pressed

  switch (event.key) {
    // when F is pressed, selection will become bold
    case "f": {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }

    // when K is pressed, selection will becom italic
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

    // unordered list
    case "-": {
      event.preventDefault();
      // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'listitem',
            })
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'listitem' },
              { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )

    }
  }
}; // END keyboard shortcuts
/* #endregion keyboard shortcuts */

/* #region Leaf - correct rendering in slate editor */
//* render the text correctly in the SlateJS editor
// the text strings in the SlateJS editor are called leaves
// this function makes sure that the leaves get rendered with bold/italic/underlined text
export const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
}; // END correct rendering-function
/* #endregion Leaf - correct rendering in slate editor */
