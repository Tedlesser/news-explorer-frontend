import React from "react";
import "./Header.css";

const Header = ({handleLoginClick}) => {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <div className="mobile__dropdown_header">
        <p className="header__button-home">Home</p>
        <button onClick={handleLoginClick} className="header__button-signin">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
