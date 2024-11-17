import "./Header.css"

const Header = () => {
    return(
        <header className="header">
        <div className="header__logo">NewsExplorer</div>
        <button className="header__menu"></button>
        <div className="mobile__dropdown">
          <div className="mobile__dropdown_header">
            <p className="mobile__dropdown_header_logo">NewsExplorer</p>
            <button className="mobile__dropdown_header_close"></button>
          </div>
          <p className="mobile__dropdown-title">Home</p>
          <button
            className="mobile__dropdown-signin_button"
          >
            Sign In
          </button>
        </div>
        <nav className="header__nav"></nav>
      </header>
    )
}

export default Header; 