const Input = ({ type, name, label, defaultValue, span, setImage }) => {

  const onImageChange = (event) => {
    // set a preview image for the file-input
    if(event.target.files && event.target.files[0]){
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  if (type == "file")
    return (
      <div className={`${span} sm:flex gap-3 justify-start`}>
        <label htmlFor={name} className="h-fit my-auto">
          {label}:
        </label>
        <input type="file" onChange={onImageChange} name={name} id={name} className="p-1 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200" />
      </div>
    );
  else if (type == "checkbox")
    return (
      <div className={`${span} flex gap-3 justify-end`}>
        <label htmlFor={name} className="h-fit my-auto">
          {label}:
        </label>
        <input
          type={type}
          name={name}
          id={name}
          defaultChecked={defaultValue}
          className="mt-0.5"
        />
      </div>
    );
  else
    return (
      <div className={`${span} sm:flex gap-3 justify-start`}>
        <label htmlFor={name} className="h-fit my-auto break-keep">
          {label}:
        </label>
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          className="w-full bg-white border border-gray-300 px-2 pt-1 pb-2 focus:border-o focus:outline-2 outline-blue-300 rounded-xs box-border"
        required
        />
      </div>
    );
};

export default Input;
