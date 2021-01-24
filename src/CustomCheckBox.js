import React from "react";

const CustomCheckBox = ({ residential, setResidential }) => {
  return (
    <label className="checkbox__wrapper">
      <input
        className="checkbox"
        type="checkbox"
        checked={residential}
        onChange={() => {
          residential ? setResidential(false) : setResidential(true);
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CustomCheckBox;
