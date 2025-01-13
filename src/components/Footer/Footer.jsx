import facebookLink from "../../assets/fb-logo.svg";
import githubLink from "../../assets/github-logo.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <div className="footer__social">
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Tripleten
          </a>
        </nav>
        <div className="footer__media">
          <a href="https://github.com" target="_blank">
            <img
              className="footer__github-icon"
              alt="GitHub"
              src={githubLink}
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__fb-icon"
              alt="Facebook"
              src={facebookLink}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
