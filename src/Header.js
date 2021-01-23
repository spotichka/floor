import React from "react";
import logo from "./building.png";
import refresh from "./refresh.png";

const Header = () => {
  const onClickHandler = () => {
    document.location.reload();
  };
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
        <h1 className="header__heading">Floor Checker</h1>
      </div>

      <button className="header__btn" onClick={onClickHandler}>
        <img src={refresh} alt="refresh" />
      </button>
    </div>
  );
};

export default Header;
