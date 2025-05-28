import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './css/HomeSearch.css';
import LogoIcon from '../../assets/HeaderAssets/LogoIcon.jsx';

export default function HomeSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  /** Autofocuses on search bar, and clears when navigating to home page */
  useEffect(() => {
    if(location.pathname === '/') {
      setInputValue('');
      setIsFocused(true);
    }
  }, [location])

  /** Handles navigation to the search page with given search query */
  function handleSubmit(e) {
    e.preventDefault();
    if(inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }
  
  /** Renders the home page search bar */
  return (
    <form className='home-search-form' onSubmit={handleSubmit}>
      <Link to="/" className="home-logo">
        <LogoIcon />
      </Link>
      <input 
        className={ `home-search-bar ${isFocused ? 'focused' : '' } ` }
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        autoFocus
      />
    </form>
  );
};