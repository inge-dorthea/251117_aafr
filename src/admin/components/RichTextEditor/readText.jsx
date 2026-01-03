//* maps out the text written in the RichTextEditor
const readText = (text, key, length = "long") => {
  if (length == "long"){
    switch (text.type) {
    case "paragraph":
      return (
        <p key={key} className="mb-1.5">
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
            <li key={index} className="ms-2">
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
            <li key={index} className="ms-2">
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
  }
  else if (length == "short") {
    switch (text.type) {
    case "paragraph":
      return (
        <p key={key} className="mb-1.5">
          {text.children.map((item, index) => (
            <span
              key={index}
              className={`
                ${item.bold ? "font-bold" : "font-normal"} 
                ${item.italic ? "italic" : ""} 
                ${item.underline ? "underline" : ""} 
                ${item.linethrough ? "line-through" : ""}`}
            >
              {item.text.slice(0, 100)}
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
              {item.text.slice(0, 100)}
            </span>
          ))}
        </p>
      );
    case "ordered-list":
      return (
        <ol key={key} className="list-decimal list-inside">
          {text.children.slice(0, 3).map((item, index) => (
            <li key={index} className="ms-2">
              {item.children.map((subitem, subindex) => (
                <span
                  key={subindex}
                  className={`
                ${subitem.bold ? "font-bold" : "font-normal"} 
                ${subitem.italic ? "italic" : ""} 
                ${subitem.underline ? "underline" : ""} 
                ${subitem.linethrough ? "line-through" : ""}`}
                >
                  {subitem.text.slice(0, 50)}
                </span>
              ))}
            </li>
          ))}
        </ol>
      );
    case "unordered-list":
      return (
        <ul key={key} className="list-disc list-inside">
          {text.children.slice(0, 3).map((item, index) => (
            <li key={index} className="ms-2">
              {item.children.map((subitem, subindex) => (
                <span
                  key={subindex}
                  className={`
                ${subitem.bold ? "font-bold" : "font-normal"} 
                ${subitem.italic ? "italic" : ""} 
                ${subitem.underline ? "underline" : ""} 
                ${subitem.linethrough ? "line-through" : ""}`}
                >
                  {subitem.text.slice(0, 50)}
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
  }
  
};

export default readText;
