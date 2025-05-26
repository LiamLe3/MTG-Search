import { useEffect, useState } from 'react';
import './css/AdvancedPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import SetIcon from '../../assets/SetIcon';
import SYMBOL_DESCRIPTIONS from '../Card/CardInfoConstants';
import '../Others/css/Symbols.css';
export default function AdvancedPage() {
  const [filters, setFilters] = useState({
    name: "",
    text: "",
    type: "",
    colors: [],
    cmc: "",
    set: "",
    stats: "",
    rarity: "",
    artist: ""

  })
  async function fetchKeywords() {
    try {
      const response = await fetch('https://api.scryfall.com/catalog/flavor-words');
      if(!response.ok) throw new Error('Failed to fetch sets');
      const data = await response.json();
      console.log(data);
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
              <label className="advanced-label">Card Name</label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">Text</label>
              <input
                type="text"
                value={filters.text}
                onChange={(e) => setFilters({ ...filters, text: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">Type Line</label>
              <input
                type="text"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">Colours</label>
              <div>
                <fieldset>
                  <div className="colour-checkboxes">
                    <label>
                      <input type="checkbox" value="W" />
                      <abbr className={`symbol symbol-W`} title={SYMBOL_DESCRIPTIONS['W']}/>
                      White
                    </label>
                    <label>
                      <input type="checkbox" value="U" />
                      <abbr className={`symbol symbol-U`} title={SYMBOL_DESCRIPTIONS['U']}/>
                      Blue
                    </label>
                    <label>
                      <input type="checkbox" value="B" />
                      <abbr className={`symbol symbol-B`} title={SYMBOL_DESCRIPTIONS['B']}/>
                      Black
                    </label>
                    <label>
                      <input type="checkbox" value="R" />
                      <abbr className={`symbol symbol-R`} title={SYMBOL_DESCRIPTIONS['R']}/>
                      Red
                    </label>
                    <label>
                      <input type="checkbox" value="G" />
                      <abbr className={`symbol symbol-G`} title={SYMBOL_DESCRIPTIONS['G']}/>
                      Green
                    </label>
                    <label>
                      <input type="checkbox" value="C" />
                      <abbr className={`symbol symbol-C`} title={SYMBOL_DESCRIPTIONS['C']}/>
                      Colourless
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <select>
                    <option value="=">Exactly these colours</option>
                    <option value=">=">Including these colours</option>
                    <option value="<=">At most these colours</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <div className="form-row">
              <label className="advanced-label">Mana Cost</label>
              <input
                type="text"
                value={filters.cmc}
                onChange={(e) => setFilters({ ...filters, cmc: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">Stats</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">
                <SetIcon />
                Set Code
              </label>
              <input
                type="text"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label className="advanced-label">Rarity</label>
                              <fieldset>
                  <div className="colour-checkboxes">
                    <label>
                      <input type="checkbox" value="common" />
                      Common
                    </label>
                    <label>
                      <input type="checkbox" value="uncommon" />
                      Uncommon
                    </label>
                    <label>
                      <input type="checkbox" value="rare" />
                      Rare
                    </label>
                    <label>
                      <input type="checkbox" value="mythic" />
                      Mythic
                    </label>
                  </div>
                </fieldset>
            </div>
            <div className="form-row">
              <label className="advanced-label">Artist</label>
              <input
                type="text"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};