import '../css/CardInfo.css';
export default function CardInfo({data}) {
  const game_changer = data.game_changer ? "Yes" : "No";

  return (
    <section className="card-info">
      <p className="card-title">{data.name} {data.mana_cost}</p>
      <p className="card-type">{data.type_line}</p>
      {data.oracle_text.split('\n').map((line) => (
        <p className="card-text">{line}</p>
      ))}
      <p className="card-flavour">{data.flavor_text}</p>
      <p className="card-artist">{data.artist}</p>
      <p>Commander: {data.legalities.commander}</p>
      <p>Game Changer: {game_changer}</p>
    </section>
  );
};