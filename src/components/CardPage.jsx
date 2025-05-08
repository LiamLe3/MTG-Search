import { useEffect, useState } from 'react';
import '../css/CardPage.css'
import Header from './Header';
import Footer from './Footer';
import CardImg from './CardImg';
import CardInfo from './CardInfo';
import CardExtra from './CardExtra';
import CardRules from './CardRules';
export default function CardPage() {
  const [card, setCard] = useState(null);
  const [rulings, setRulings] = useState([]);

  async function fetchRulings(rulingsUri) {
    try {
      const response = await fetch(rulingsUri);
      if(!response.ok) throw new Error('Failed to fetch rulings');
      const data = await response.json();
      setRulings(data.data);
    } catch (error) {
      console.error('Error fetching rulings: ', error);
    }
  }

  async function fetchCard() {
    try {
      const response = await fetch('https://api.scryfall.com/cards/named?fuzzy=esper-sentinel');
      if(!response.ok) throw new Error('Failed to fetch card');
      const data = await response.json();
      setCard(data);
      
      fetchRulings(data.rulings_uri)
    } catch (error) {
      console.error('Error fetching card: ', error);
    }
  }

  useEffect(() => {
    fetchCard();
  }, []);

  if (!card) return <p>Loading card...</p>;
  
  return (
    <>
      <Header />
      <main>
        <section className="card-page">
          <CardImg data={card}/>
          <CardInfo data={card}/>
          <CardExtra data={card}/>
        </section>
        <section>

        </section>
      </main>
      <Footer />
    </>
  );
};