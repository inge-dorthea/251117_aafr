//* defines how the element is rendered in the "text-area"
const CustomElement = ({ children, element }) => {
  switch (element.type) {
    case "ordered-list":
      return <ol className="list-decimal list-inside">{children}</ol>;
    case "unordered-list":
      return <ul className="list-disc list-inside">{children}</ul>;
    case "list-item":
      return <li>{children}</li>;
    default:
      return <p>{children}</p>;
  }
};

export default CustomElement;
