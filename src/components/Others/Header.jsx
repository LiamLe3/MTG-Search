import { Link } from "react-router-dom";
import "./css/Header.css"
import HeaderSearch from './HeaderSearch.jsx'
import LogoIcon from "../../assets/HeaderAssets/LogoIcon.jsx";
import RandomCard from "./RandomCard.jsx";
import AdvancedIcon from "../../assets/AdvancedPageAssets/AdvancedIcon.jsx";
import SetIcon from "../../assets/SharedAssets/SetIcon.jsx";

export default function Header() {
  /** Renders the header */
  return (
    <header>
      <nav className='header-nav'>
        <Link to="/" className="header-logo">
          <LogoIcon />
        </Link>
        
        <HeaderSearch />
        <div className='header-links'>
          <Link className="header-link" to="/advanced">
            <AdvancedIcon />
            Advanced
          </Link>
          <Link className="header-link" to="/sets">
            <SetIcon /> 
            Sets
          </Link>
          <RandomCard name="header-link" content="Random" isHeader={true} />
        </div>
      </nav>
    </header>
  );
};