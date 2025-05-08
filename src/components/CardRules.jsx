import '../css/CardRules.css'
export default function CardImg({data}) {
  return (
    <>
      <h2>Notes and Rules Information:</h2>
      <ul>
        {data.map((ruling, index) => (
          <li key={index}>
            {ruling.comment}
            <span>{ruling.published_at}</span>
          </li>
        ))}
      </ul>
    </>
  );
};