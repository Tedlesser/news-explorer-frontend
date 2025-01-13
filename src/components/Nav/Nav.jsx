import "./Nav.css";
import MainMenu from "../Main/Main";
import { useState } from "react";

function Nav({ handleLoginClick, isInverse, isLoggedIn, handleLogout }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleMainClick = () => {
    setIsClicked(true);
  };

  const handleMainCloseClick = () => {
    setIsClicked(false);
  };

  return (
    <nav className="nav" data-theme={isInverse ? "light" : "dark"}>
      <p className="nav__logo">NewsExplorer</p>
      <button
        onClick={handleMainClick}
        className={
          isInverse ? "nav__menu-btn nav__menu-btn--black" : "nav__menu-btn"
        }
      ></button>

      {isClicked ? (
        <MainMenu
          isLoggedIn={isLoggedIn}
          onClose={handleMainCloseClick}
          handleLoginClick={handleLoginClick}
          handleLogout={handleLogout}
        />
      ) : null}
    </nav>
  );
}

export default Nav;