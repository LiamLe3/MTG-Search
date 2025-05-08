import '../css/CardImg.css'
export default function CardImg({data}) {
  return (
    <div className="img-container">
      <img className="card-img" src={data.image_uris.png} alt={data.name} />
    </div>
  );
};