import { Link } from "react-router-dom";
import "./css/Header.css"
import HeaderSearch from './HeaderSearch.jsx'
import LogoIcon from "../../assets/LogoIcon.jsx";

export default function Header() {
  return (
    <header>
      <nav className='header-nav'>
        <Link to="/" className="header-logo">
          <LogoIcon />
        </Link>
        
        <HeaderSearch />
        <div className='header-links'>
          <Link className="header-link" to="/advanced">
            <span>Advanced</span>
          </Link>
          <Link className="header-link" to="/sets">
            <span>Sets</span>
          </Link>
          <Link className="header-link" to="/">
            <span>Random</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};