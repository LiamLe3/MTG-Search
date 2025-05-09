import "../css/Header.css"
import HeaderSearch from './HeaderSearch.jsx'
import Logo from './Logo.jsx';

export default function Header() {
  return (
    <header>
      <nav className='header-nav'>
        <Logo type="header"/>
        <HeaderSearch />
        <div className='header-links'>
          <a className="header-link" href="">
            <span>Advanced</span>
          </a>
          <a className="header-link" href="">
            <span>Sets</span>
          </a>
          <a className="header-link" href="">
            <span>Random</span>
          </a>
        </div>
      </nav>
    </header>
  );
};