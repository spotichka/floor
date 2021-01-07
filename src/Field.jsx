import React from "react";

const Field = ({ value, setValue, placeholder }) => {
  return (
    <input
      className="form_input"
      placeholder={placeholder}
      value={value}
      type="text"
      onChange={(e) => setValue(+e.target.value)}
    ></input>
  );
};

export default Field;
