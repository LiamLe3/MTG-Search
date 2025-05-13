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

  /** Fetches the rulings of the card */
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

  /** Fetches the card then fetches the set icon*/
  async function fetchCard() {
    try {
      const cardResponse = await fetch('https://api.scryfall.com/cards/named?fuzzy=jeskas-will');
      if(!cardResponse.ok) throw new Error('Failed to fetch card');
      const cardData = await cardResponse.json();

      const setResponse = await fetch(`https://api.scryfall.com/sets/${cardData.set}`)
      const setData = await setResponse.json();

      setCard({...cardData, symbolUri: setData.icon_svg_uri});

      fetchRulings(cardData.rulings_uri)
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
        
        <CardRules data={rulings}/>
      </main>
      <Footer />
    </>
  );
};