import { useEffect, useState } from 'react';
import '../css/CardPage.css'
import Header from './Header';
import Footer from './Footer';
import CardImg from './CardImg';
import CardInfo from'./CardInfo';
export default function CardPage() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.scryfall.com/cards/named?fuzzy=akawalli-the-seething-tower')
      .then(response => response.json())
      .then(data => {
        setCard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching card:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!card) return <p>No card found.</p>;

  console.log(card);
  return (
    <>
      <Header />
      <main>
        <section className="card-page">
          <CardImg data={card}/>
          <CardInfo data={card}/>
        </section>
      </main>
      <Footer />
    </>
  );
};