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
  const [cardLoading, setCardLoading] = useState(true);
  const [rulings, setRulings] = useState([]);
  const [rulingsLoading, setRulingsLoading] = useState(true);

  const [cardError, setCardError] = useState(null);
  const [rulingsError, setRulingsError] = useState(null);

  async function fetchRulings(rulingsUri) {
    try {
      const response = await fetch(rulingsUri);
      if(!response.ok) throw new Error('Failed to fetch rulings');
      const data = await response.json();
      setRulings(data.data);
    } catch (error) {
      console.error('Error fetching rulings: ', error);
      setRulingsError(error.message);
    } finally {
      setRulingsLoading(false);
    }
  }

  async function fetchCard() {
    try {
      const response = await fetch('https://api.scryfall.com/cards/named?fuzzy=aarakocra-sneak');
      if(!response.ok) throw new Error('Failed to fetch card');
      const data = await response.json();
      setCard(data);
      setCardLoading(false);

      fetchRulings(data.rulings_uri);
    } catch (error) {
      console.error('Error fetching card: ', error);
      setCardError(error.message);
      setCardLoading(false);
      setRulingsLoading(false);
    }
  }

  useEffect(() => {
    fetchCard();
  }, []);


  if (cardLoading) return <p>Loading card...</p>;
  if (cardError) return <p>Error: {cardError}</p>;

  console.log(card);
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
          {rulingsLoading && <p>Loading rulings...</p>}
          {rulingsError && <p>Error: {rulingsError}</p>}
          <CardRules data={rulings}/>
        </section>
      </main>
      <Footer />
    </>
  );
};