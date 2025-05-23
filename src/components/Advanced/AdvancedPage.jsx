import { useEffect, useState } from 'react';
import './css/AdvancedPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
export default function AdvancedPage() {
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
              <input/>
            </div>
            <div className="form-row">
              <label className="advanced-label">Text</label>
              <input/>
            </div>
            <div className="form-row">
              <label className="advanced-label">Type Line</label>
              <input/>
            </div>
            <div className="form-row">
              <label className="advanced-label">Colors</label>
              <div>
                <fieldset>
                  <div></div>
                </fieldset>
              </div>
            </div>
            <div className="form-row">
              <label className="advanced-label">Mana Cost</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">Stats</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">Sets</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">Rarity</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">Artist</label>
            </div>
            <div className="form-row">
              <label className="advanced-label">Order By</label>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};