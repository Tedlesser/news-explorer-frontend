import React from "react";
import "./Header.css";
import {Link} from 'react-router-dom';

const Header = ({handleLoginClick, isLoggedIn, handleLogout }) => {

  const isSavedNews = location.pathname === "/saved-news"

  return (
    <header className="header">
      <div className={isSavedNews ? "header__logo__saved-news-active" : "header__logo"}>NewsExplorer</div>
      <div className="mobile__dropdown_header">
        <a href="/" className={isSavedNews ? "header__button-home__saved-news-active" : "header__button-home"}>Home</a>
        {isLoggedIn && 
          <p className="header__button-saved">
            <Link to="/saved-news" className={isSavedNews ? "header__button-saved__saved-news-active" : "header__button-saved"}> Saved Articles </Link>
          </p>}
        {isLoggedIn ? (
          <p onClick={handleLogout} className={isSavedNews ? "header__button-logout-signin__saved-news-active" : "header__button-logout-signin"}>Logout</p>
        ) : (
          <p onClick={handleLoginClick} className={isSavedNews ? "header__button-signin__saved-news-active" : "header__button-signin"}>Sign In</p>
        )}
      </div>
    </header>
  );
};

export default Header;
