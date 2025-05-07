import '../css/CardExtra.css'
export default function CardExtra({data}) {
  console.log(data);

  function displayRelated() {
    if(!data.all_parts) return;
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
                <a >{part.name}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
    );
  };

  function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <section className="extra-container">
      <div className="extra-info">
        <img className="set-symbol" src={`https://svgs.scryfall.io/sets/${data.set}.svg`} alt={`${data.set}`}></img>
        <p className="set-name">{data.set_name} ({data.set.toUpperCase()})</p>
        <p className="set-extra">#{data.collector_number} - {capitaliseFirstLetter(data.rarity)}</p>
      </div>
      {displayRelated()}
      <button className="view-alts-btn">View Alt Arts</button>
    </section>
  );
};