import '../css/CardExtra.css'
export default function CardExtra({data}) {
  console.log(data.all_parts);

  function displayRelated() {
    if(!data.all_parts) return;

    return( 
      <table>
        <thead>
          <tr>
            <th>Faces, Tokens, and Other Parts</th>
          </tr>
        </thead>
        <tbody>
          {data.all_parts.map(part => (
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

  return (
    <section className="card-extra">
      <img className="set-symbol" src={`https://svgs.scryfall.io/sets/${data.set}.svg`} alt={`${data.set}`}></img>
      <p>{data.set_name} ({data.set.toUpperCase()}) - #{data.collector_number}</p>
      {displayRelated()}
      <button>View Alt Arts</button>
    </section>
  );
};