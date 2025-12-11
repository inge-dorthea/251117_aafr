//* maps out the text written in the RichTextEditor
const readText = (text, key) => {
  switch (text.type) {
    case "paragraph":
      return (
        <p key={key}>
          {text.children.map((item, index) => (
            <span
              key={index}
              className={`
                ${item.bold ? "font-bold" : "font-normal"} 
                ${item.italic ? "italic" : ""} 
                ${item.underline ? "underline" : ""} 
                ${item.linethrough ? "line-through" : ""}`}
            >
              {item.text}
            </span>
          ))}
        </p>
      );
    case "quote":
      return (
        <p key={key} className="border-l-2 px-5 font-light text-end">
          {text.children.map((item, index) => (
            <span
              key={index}
              className={`
                ${item.bold ? "font-bold" : "font-normal"} 
                ${item.italic ? "italic" : ""} 
                ${item.underline ? "underline" : ""} 
                ${item.linethrough ? "line-through" : ""}
                `}
            >
              {item.text}
            </span>
          ))}
        </p>
      );
    case "ordered-list":
      return (
        <ol key={key} className="list-decimal list-inside">
          {text.children.map((item, index) => (
            <li key={index}>
              {item.children.map((subitem, subindex) => (
                <span
                  key={subindex}
                  className={`
                ${subitem.bold ? "font-bold" : "font-normal"} 
                ${subitem.italic ? "italic" : ""} 
                ${subitem.underline ? "underline" : ""} 
                ${subitem.linethrough ? "line-through" : ""}`}
                >
                  {subitem.text}
                </span>
              ))}
            </li>
          ))}
        </ol>
      );
    case "unordered-list":
      return (
        <ul key={key} className="list-disc list-inside">
          {text.children.map((item, index) => (
            <li key={index}>
              {item.children.map((subitem, subindex) => (
                <span
                  key={subindex}
                  className={`
                ${subitem.bold ? "font-bold" : "font-normal"} 
                ${subitem.italic ? "italic" : ""} 
                ${subitem.underline ? "underline" : ""} 
                ${subitem.linethrough ? "line-through" : ""}`}
                >
                  {subitem.text}
                </span>
              ))}
            </li>
          ))}
        </ul>
      );

    default:
      console.log("no type of element");
      return null;
  }
};

export default readText;
