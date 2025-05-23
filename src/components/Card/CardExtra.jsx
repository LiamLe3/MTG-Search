
import React from 'react';
import './css/CardExtra.css'
import { Link, useNavigate } from 'react-router-dom';
export default function CardExtra({data}) {
  const navigate = useNavigate();

  async function handleClick(part) {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/${part.id}`);
      const cardData = await response.json();

      const setResponse = await fetch(`https://api.scryfall.com/sets/${cardData.set}`)
      const setData = await setResponse.json();

      navigate(`/card/${cardData.set}/${cardData.collector_number}`, {
        state: { cardData: { ...cardData, symbolUri: setData.icon_svg_uri } }
      });
    } catch (error) {
      console.error('Failed to fetch related card:', error);
    }
  }

  /** Displays all related cards if any */
  function displayRelated() {
    if(!data.all_parts) return;

    // Removes itself from list of related cards
    const filterRelated = data.all_parts.filter(part => part.name !== data.name);
    
    return( 
      <table className="related-info">
        <thead>
          <tr>
            <th>Faces, Tokens, and Other Parts</th>
          </tr>
        </thead>
        <tbody>
          {filterRelated.map(part => (
            <tr key={part.id} onClick={() => handleClick(part)}>
              <td>
                <p>{part.name}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
    );
  };

  /** Capitaise first letter */
  function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /** Renders artists links, if there only one artist display only one otherwise display both artists */
  function renderArtistLinks(artists) {
    return artists.split('&').map((name, index) => {
      const trimmedName = name.trim();

      return (
        <React.Fragment key={index}>
          {index > 0 && ' & '}
          <Link className="artistLinks" to={`/search?q=a:"${trimmedName}"`}>{trimmedName}</Link>
        </React.Fragment>
      );
    });
  }

  return (
    <section className="extra-container">
      <Link className="extra-info" to={`/search?q=set:${data.set}`}>
        <img className="extra-set-symbol" src={data.symbolUri} alt={`${data.set}`} />
        <p className="extra-set-name">{data.set_name} ({data.set.toUpperCase()})</p>
        <p className="card-extra">#{data.collector_number} - {capitaliseFirstLetter(data.rarity)}</p>
      </Link>
      
      {displayRelated()}
      {data.artist && <p className="artist-name">Art by {renderArtistLinks(data.artist)}</p>}
      <Link className="view-alts-btn" to={`/search?q=!"${data.name}" unique:art`}>View Unique Arts</Link>
    </section>
  );
};