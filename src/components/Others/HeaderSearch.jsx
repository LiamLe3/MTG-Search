import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './css/HeaderSearch.css';
import SearchIcon from "../../assets/HeaderAssets/SearchIcon";

export default function HeaderSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  /** Clicking anywhere on the search bar will focus on it e.g. clicking on icon */
  const handleSearchBarClick = () => {
    inputRef.current.focus();
  };

  /** Handles navigation to the search page with given search query */
  function handleSubmit(e) {
    e.preventDefault();
    if(inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }

  /** Render header search bar */
  return (
    <form 
      className={`header-search-form ${isFocused ? 'focused' : ''} `}
      onClick={handleSearchBarClick}
      onSubmit={handleSubmit}
    >
      <SearchIcon />
      <input
        ref={inputRef}
        className='search-bar'
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
      />
    </form>
  );
};