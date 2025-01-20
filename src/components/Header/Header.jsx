import React from "react";
import "./Header.css";

const Header = ({handleLoginClick, isLoggedIn, handleLogout }) => {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <div className="mobile__dropdown_header">
        <p className="header__button-home">Home</p>
        {isLoggedIn && <p className="header__button-saved">Saved Articles</p>}
        {isLoggedIn ? (
          <p onClick={handleLogout} className="header__button-logout-signin">Logout</p>
        ) : (
          <p onClick={handleLoginClick} className="header__button-signin">Sign In</p>
        )}
      </div>
    </header>
  );
};

export default Header;
