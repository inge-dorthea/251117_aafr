//* defines how the element is rendered in the "text-area"
const CustomElement = (props) => {
  switch (props.element.type) {
    case "quote":
      return <p {...props.attributes} className="border-l-2 px-5 font-light text-end">{props.children}</p>
    case "ordered-list":
      return <ol {...props.attributes} className="list-decimal list-inside">{props.children}</ol>;
    case "unordered-list":
      return <ul {...props.attributes} className="list-disc list-inside">{props.children}</ul>;
    case "list-item":
      return <li {...props.attributes}>{props.children}</li>;
    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

export default CustomElement;
