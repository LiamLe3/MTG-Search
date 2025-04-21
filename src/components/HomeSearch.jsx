import { useState } from "react";
import '../css/HomeSearch.css';
import Logo from './Logo';

export default function HomeSearch() {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <form className='home-search-form' action="/search">
      <Logo type="home" />
      <input 
        className={ `search-bar ${isFocused ? 'focused' : '' } ` }
        type="text"
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        autoFocus
      />
    </form>
  );
};