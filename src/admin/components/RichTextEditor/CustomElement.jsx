const CustomElement = ({ attributes, children, element }) => {
  const style = {};

  switch (element.type) {
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );

    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );

    case "ordered-list":
      return (
        <ol>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default CustomElement;