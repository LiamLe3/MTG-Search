import { Link } from "react-router-dom";
import "./css/Header.css"
import HeaderSearch from './HeaderSearch.jsx'
import Logo from './Logo.jsx';

export default function Header() {
  return (
    <header>
      <nav className='header-nav'>
        <Logo type="header"/>
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