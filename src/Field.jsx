import React, { useState } from "react";

const Field = ({ value, setValue, placeholder }) => {
  let [focus, setFocus] = useState(false);
  return (
    <input
      className={`form_input ${focus && "focus"}`}
      placeholder={placeholder}
      value={value}
      type="number"
      onChange={(e) => setValue(+e.target.value)}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    ></input>
  );
};

export default Field;
