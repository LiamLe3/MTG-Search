import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './css/HeaderSearch.css';
import SearchIcon from "../../assets/SearchIcon";

export default function HeaderSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearchBarClick = () => {
    inputRef.current.focus();
  };

  function handleSubmit(e) {
    console.log(inputValue);
    e.preventDefault();
    if(inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }

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