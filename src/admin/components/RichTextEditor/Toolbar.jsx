import React from 'react'
import { CustomEditor } from './functions';

//? editor doesn't work??

const Toolbar = (editor) => {
  return (
    <menu>
        <li>
            <button onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
            }}
            style={{fontWeight: "bold"}}
            title="Fed&#10;(Ctrl + F)"
            >
                F
            </button>
        </li>
        <li>
            <button onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleItalicMark(editor);
            }}
            style={{fontStyle: "italic"}}
            title="Kursiv&#10;(Ctrl + K)">
                K
            </button>
        </li>
        <li>
            <button onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
            }}
            style={{textDecoration: "underline"}}
            title="Understreget&#10;(Ctrl + U)">
                U
            </button>
        </li>
    </menu>
  )
}

export default Toolbar