import '../css/PageGallery.css'
import PageCard from './PageCard';
export default function PageGallery({cardList}) {

  return (
    <section className="gallery">
      {
        cardList.map(card => {
          if(['transform', 'modal_dfc', 'double_faced_token', 'reversible_card'].includes(card.layout))
            return <PageCard data={card}/>

          return (
            <img
              className="gallery-img"
              key={card.id}
              src={card?.image_uris?.normal}
              alt={card.name}
            />
          );
        })
      }
    </section>
  );
}