import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdvancedPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import NameIcon from '../../assets/AdvancedPageAssets/NameIcon';
import TextIcon from '../../assets/AdvancedPageAssets/TextIcon';
import TypeIcon from '../../assets/AdvancedPageAssets/TypeIcon';
import ColoursIcon from '../../assets/AdvancedPageAssets/ColoursIcon';
import ManaCostIcon from '../../assets/AdvancedPageAssets/ManaCostIcon';
import StatsIcon from '../../assets/AdvancedPageAssets/StatsIcon';
import SetIcon from '../../assets/SharedAssets/SetIcon';
import RarityIcon from '../../assets/AdvancedPageAssets/RarityIcon';
import ArtistIcon from '../../assets/AdvancedPageAssets/ArtistIcon';
import SYMBOL_DESCRIPTIONS from '../Card/CardInfoConstants';
import CheckboxGroup from './Checkbox';
import '../Others/css/Symbols.css';

export default function AdvancedPage() {
  const navigate = useNavigate()

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

  const colourOptions = [
    { value: "W", label: "White", icon: <abbr className="symbol symbol-W" title={SYMBOL_DESCRIPTIONS['W']} /> },
    { value: "U", label: "Blue", icon: <abbr className="symbol symbol-U" title={SYMBOL_DESCRIPTIONS['U']} /> },
    { value: "B", label: "Black", icon: <abbr className="symbol symbol-B" title={SYMBOL_DESCRIPTIONS['B']} /> },
    { value: "R", label: "Red", icon: <abbr className="symbol symbol-R" title={SYMBOL_DESCRIPTIONS['R']} /> },
    { value: "G", label: "Green", icon: <abbr className="symbol symbol-G" title={SYMBOL_DESCRIPTIONS['G']}/> },
    { value: "C", label: "Colourless", icon: <abbr className="symbol symbol-C" title={SYMBOL_DESCRIPTIONS['C']} /> }
  ];

  const rarityOptions = [
    { value: "common", label: "Common" },
    { value: "uncommon", label: "Uncommon" },
    { value: "rare", label: "Rare" },
    { value: "mythic", label: "Mythic" }
  ];

  function buildQuery(filters) {
    const parts = [];

    if (filters.name) parts.push(`name:${filters.name}`);
    if (filters.text) parts.push(`oracle:${filters.text}`);
    if (filters.type) parts.push(`type:${filters.type}`);
    if (filters.set) parts.push(`set:${filters.set}`);
    if (filters.artist) parts.push(`artist:"${filters.artist}"`);

    // Colours
    if (filters.colours.length > 0) {
      const joined = filters.colours.join('');
      parts.push(`color${filters.colourMode}${joined}`);
    }

    // Mana Value (CMC)
    if (filters.cmc) {
      parts.push(`cmc=${filters.cmc}`);
    }

    // Stats
    filters.stats.forEach(({ stat, operator, value }) => {
      if (stat && operator && value !== "") {
        let field;
        if (stat === "pow") field = "power";
        else if (stat === "tou") field = "toughness";
        else if (stat === "loy") field = "loyalty";
        else field = "cmc";
        parts.push(`${field}${operator}${value}`);
      }
    });

    // Rarity
    if (filters.rarity.length > 0) {
      const joined = filters.rarity.map(r => `rarity:${r}`).join(' OR ');
      parts.push(`(${joined})`);
    }

    return parts.join(' ');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const query = buildQuery(filters);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
  function handleStatChange(index, field, newValue) {
    const newStats = [...filters.stats];
    newStats[index][field] = newValue;

    // If editing the last row and it's now filled, add a new empty row
    const last = newStats[newStats.length - 1];
    const isLastFilled = last.stat && last.operator && last.value !== "";

    if (isLastFilled && newStats.length < 4) {
      newStats.push({ stat: "", operator: "", value: "" });
    }

    setFilters({ ...filters, stats: newStats });
  }

  async function fetchKeywords() {
    try {
      const response = await fetch('https://api.scryfall.com/catalog/flavor-words');
      if(!response.ok) throw new Error('Failed to fetch sets');
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching rulings: ', error);
    }
  }
  
  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <>
      <Header />
      <main>
        <form className="advanced-search-form">
          <div className="advanced-search-container">
            <div className="form-row">
              <label className="advanced-label">
                <NameIcon />
                Card Name
              </label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <TextIcon />
                Text
              </label>
              <input
                type="text"
                value={filters.text}
                onChange={(e) => setFilters({ ...filters, text: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <TypeIcon />
                Type Line
              </label>
              <input
                type="text"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <ColoursIcon />
                Colours
              </label>
              <div>
                <fieldset>
                  <CheckboxGroup
                    options={colourOptions}
                    selected={filters.colours}
                    onChange={(newColours) => setFilters({ ...filters, colours: newColours })}
                  />
                </fieldset>
                <fieldset>
                  <select
                    value={filters.colourMode}
                    onChange={(e) => setFilters({...filters, colourMode: e.target.value })}
                  >
                    <option value="=">Exactly these colours</option>
                    <option value=">=">Including these colours</option>
                    <option value="<=">At most these colours</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <ManaCostIcon />
                Mana Cost
              </label>
              <input
                type="text"
                value={filters.cmc}
                onChange={(e) => setFilters({ ...filters, cmc: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <StatsIcon />
                Stats
              </label>
              <div className="stats-section">
              {filters.stats.map((statFilter, index) => (
                <div key={index} className="stats-row">
                  <select
                    value={statFilter.stat}
                    onChange={(e) => handleStatChange(index, 'stat', e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    <option value="cmc">Mana Value</option>
                    <option value="pow">Power</option>
                    <option value="tou">Toughness</option>
                    <option value="loy">Loyalty</option>
                  </select>
                  <select
                    value={statFilter.operator}
                    onChange={(e) => handleStatChange(index, 'operator', e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    <option value="=">equal to</option>
                    <option value="<">less than</option>
                    <option value=">">greater than</option>
                    <option value="<=">less than or equal to</option>
                    <option value=">=">greater than or equal to</option>
                    <option value="!=">not equal to</option>
                  </select>
                  <input 
                    type="number"
                    value={statFilter.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  />
                </div>
              ))}
              </div>
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <SetIcon />
                Set Code
              </label>
              <input
                type="text"
                value={filters.set}
                onChange={(e) => setFilters({ ...filters, set: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <RarityIcon />
                Rarity
              </label>
                <fieldset>
                  <CheckboxGroup
                    options={rarityOptions}
                    selected={filters.rarity}
                    onChange={(newRarities) => setFilters({ ...filters, rarity: newRarities })}
                  />
                </fieldset>
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <ArtistIcon />
                Artist
              </label>
              <input
                type="text"
                value={filters.artist}
                onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
                className="form-input"
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};