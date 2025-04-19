import { useState } from "react";
import '../css/HomeSearch.css';
import HomeLogo from './HomeLogo';

export default function HomeSearch() {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <form className='home-search-form' action="/search">
      <HomeLogo />
      <input 
        className={ `search-bar ${isFocused ? 'focused' : '' } ` }
        type="text" onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        autoFocus
      />
    </form>
  );
};