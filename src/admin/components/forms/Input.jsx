import React from "react";

const Input = ({ type, name, label, defaultValue }) => {
  if (type == "checkbox")
    return (
      <div className="flex gap-3 justify-end">
        <label htmlFor={name} className="h-fit my-auto">{label}:</label>
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
      <div className="flex gap-3 justify-start">
        <label htmlFor={name} className="h-fit my-auto break-keep">{label}:</label>
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          className="w-full border border-gray-300 px-2 pt-1 pb-2 focus:border-o focus:outline-2 outline-blue-300 rounded-xs box-border"
        />
      </div>
    );
};

export default Input;
