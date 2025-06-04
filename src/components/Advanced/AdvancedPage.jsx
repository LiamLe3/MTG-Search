import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdvancedPage.css'
import './css/Checkbox.css';
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import TextSection from './TextSection';
import StatsSection from './StatsSection';
import ColourSection from './ColoursSection';
import RaritySection from './RaritySection';

import NameIcon from '../../assets/AdvancedPageAssets/NameIcon';
import TextIcon from '../../assets/AdvancedPageAssets/TextIcon';
import TypeIcon from '../../assets/AdvancedPageAssets/TypeIcon';
import ManaCostIcon from '../../assets/AdvancedPageAssets/ManaCostIcon';
import SetIcon from '../../assets/SharedAssets/SetIcon';
import ArtistIcon from '../../assets/AdvancedPageAssets/ArtistIcon';

export default function AdvancedPage() {
  const navigate = useNavigate()

  // Manages state of all search filters
  const [filters, setFilters] = useState({
    name: "",
    text: "",
    type: "",
    colours: [],
    colourMode: "=",
    cmc: "",
    set: "",
    stats: [
      { stat: "cmc", operator: "=", value: ""}
    ],
    rarity: [],
    artist: ""
  });

  /** Handles updates to the stat filter
   * Dynamically adds a new stat filter row up to a total of 4
   */
  function handleStatChange(index, field, newValue) {
    const newStats = [...filters.stats];
    newStats[index][field] = newValue;

    const last = newStats[newStats.length - 1];
    const isLastFilled = last.stat && last.operator && last.value !== "";

    // If previous stat query is filled, add another stat query. Does not exceed 4 stat queries.
    if (isLastFilled && newStats.length < 4) {
      newStats.push({ stat: "", operator: "", value: "" });
    }

    setFilters({ ...filters, stats: newStats });
  }

   /**
   * Builds a search query string based on all selected filters.
   */
  function buildQuery(filters) {
    const queryParts = [];

    // Adds name, text, type, set, and artist search parameters to query if any
    if (filters.name) queryParts.push(`name:${filters.name}`);
    if (filters.text) queryParts.push(`oracle:${filters.text}`);
    if (filters.type) queryParts.push(`type:${filters.type}`);
    if (filters.set) queryParts.push(`set:${filters.set}`);
    if (filters.artist) queryParts.push(`artist:"${filters.artist}"`);

    // Adds colour search parameter to query if any
    if (filters.colours.length > 0) {
      const colourQuery = filters.colours.join('');
      queryParts.push(`color${filters.colourMode}${colourQuery}`);
    }

    // Adds mana cost (cmc) to search parameter to query if any
    if (filters.cmc) {
      queryParts.push(`mana=${filters.cmc}`);
    }

    // Adds stats to search parameter to query if any
    filters.stats.forEach(({ stat, operator, value }) => {
      if (stat && operator && value !== "") {
        let statType;
        if (stat === "pow") statType = "power";
        else if (stat === "tou") statType = "toughness";
        else if (stat === "loy") statType = "loyalty";
        else statType = "cmc";
        queryParts.push(`${statType}${operator}${value}`);
      }
    });

    // Adds rarity to search parameter to query if any
    if (filters.rarity.length > 0) {
      const rarityQuery = filters.rarity.map(r => `rarity:${r}`).join(' OR ');
      queryParts.push(`(${rarityQuery})`);
    }

    return queryParts.join(' ');
  }

  /** Handles form submission */
  function handleSubmit(e) {
    e.preventDefault();
    const query = buildQuery(filters);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }



  /** Renders the advanced search page */
  return (
    <>
      <Header />
      <main>
        <form className="advanced-search-form">
          <div className="advanced-search-container">
            <TextSection 
              icon={<NameIcon />}
              label="Card Name"
              value={filters.name}
              onChange={(val) => setFilters({ ...filters, name: val })}
              placeholder='Enter in any name, e.g. "Chandra"'
            />
            <TextSection 
              icon={<TextIcon />}
              label="Text"
              value={filters.text}
              onChange={(val) => setFilters({ ...filters, text: val })}
              placeholder='Enter in any text, e.g. "draw a card" or "{T}"'
            />
            <TextSection 
              icon={<TypeIcon />}
              label="Type Line"
              value={filters.type}
              onChange={(val) => setFilters({ ...filters, type: val })}
              placeholder='Enter a type, e.g. "Zombie"'
            />
            <ColourSection
              colours={filters.colours}
              colourMode={filters.colourMode}
              onColoursChange={(newColours) => setFilters({ ...filters, colours: newColours })}
              onModeChange={(mode) => setFilters({ ...filters, colourMode: mode })}
            />
            <TextSection 
              icon={<ManaCostIcon />}
              label="Mana Cost"
              value={filters.cmc}
              onChange={(val) => setFilters({ ...filters, cmc: val })}
              placeholder='Enter any mana symbols, e.g. {W}{U}'
            />
            <StatsSection 
              stats={filters.stats}
              onStatChange={handleStatChange}
            />
            <TextSection 
              icon={<SetIcon />}
              label="Set Code"
              value={filters.set}
              onChange={(val) => setFilters({ ...filters, set: val })}
              placeholder='Any set code, e.g. "FIN"'
            />
            <RaritySection
              rarity={filters.rarity}
              onChange={(newRarities) => setFilters({ ...filters, rarity: newRarities })}
            />
            
            <TextSection 
              icon={<ArtistIcon />}
              label="Artist"
              value={filters.artist}
              onChange={(val) => setFilters({ ...filters, artist: val })}
              placeholder='Any artist name, e.g. "Magali"'
            />
            <div className="form-row">
              <div className="advanced-label"></div>
              <button onClick={handleSubmit} className="search-btn">Search</button>
            </div>
            
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};