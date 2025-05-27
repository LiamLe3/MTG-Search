import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './css/HomeSearch.css';
import LogoIcon from '../../assets/HeaderAssets/LogoIcon.jsx';

export default function HomeSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(location.pathname === '/') {
      setInputValue('');
      setIsFocused(true);
    }
  }, [location])

  function handleSubmit(e) {
    e.preventDefault();
    if(inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }
  
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