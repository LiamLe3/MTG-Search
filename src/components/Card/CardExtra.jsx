
import React from 'react';
import './css/CardExtra.css'
export default function CardExtra({data}) {

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
            <tr key={part.id}>
              <td>
                <a>{part.name}</a>
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
          <a className="artistLinks">{trimmedName}</a>
        </React.Fragment>
      );
    });
  }

  return (
    <section className="extra-container">
      <div className="extra-info">
        <img className="extra-set-symbol" src={data.symbolUri} alt={`${data.set}`} />
        <p className="extra-set-name">{data.set_name} ({data.set.toUpperCase()})</p>
        <p className="card-extra">#{data.collector_number} - {capitaliseFirstLetter(data.rarity)}</p>
      </div>
      
      {displayRelated()}
      {data.artist && <p className="artist-name">Art by {renderArtistLinks(data.artist)}</p>}
      <button className="view-alts-btn">View Alt Arts</button>
    </section>
  );
};