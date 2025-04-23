import '../css/CardInfo.css';
export default function CardInfo({data}) {
  const game_changer = data.game_changer ? "Yes" : "No";

  function getLegality() {
    if(data.legalities.commander === 'banned'){
      return 'BANNED';
    } else if(data.game_changer) {
      return 'LEGAL/GC';
    }
    
    return 'LEGAL';
  }
  

  return (
    <section className="card-info">
      <p className="info-block">{data.name} {data.mana_cost}</p>
      <p className="info-block">{data.type_line}</p>
      <div className="info-block">
        {data.oracle_text.split('\n').map((line) => (
          <p className="card-text">{line}</p>
        ))}
        <p className="card-flavour">{data.flavor_text}</p>
      </div>
      <p className="info-block">{data.artist}</p>
      <p className="info-block">{getLegality} Commander</p>
    </section>
  );
};