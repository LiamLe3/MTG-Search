import '../css/CardExtra.css'
export default function CardExtra({data}) {
  console.log(data.image_uris);
  return (
    <section className="card-extra">
      <img className="set-symbol" src={`https://svgs.scryfall.io/sets/${data.set}.svg`} alt={`${data.set}`}></img>
      <p>{data.set_name} ({data.set.toUpperCase()}) - #{data.collector_number}</p>
      <p>View All Unique Art</p>
    </section>
  );
};