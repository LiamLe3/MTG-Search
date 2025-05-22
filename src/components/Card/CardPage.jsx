import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './css/CardPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import CardImg from './CardImg';
import CardInfo from './CardInfo';
import CardExtra from './CardExtra';
import CardRules from './CardRules';

export default function CardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { set, number } = useParams();
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

  async function fetchSet(cardData) {
    try {
      const setResponse = await fetch(`https://api.scryfall.com/sets/${cardData.set}`)
      const setData = await setResponse.json();

      setCard({...cardData, symbolUri: setData.icon_svg_uri});
    } catch (error) {
      console.error('Error fetching set: ', error);
    }
  }

  /** Fetches the card then fetches the set icon*/
  async function fetchCard(set, number) {
    try {
      const cardResponse = await fetch(`https://api.scryfall.com/cards/${set}/${number}`);
      if(!cardResponse.ok) throw new Error('Failed to fetch card');
      const cardData = await cardResponse.json();

      fetchSet(cardData);

      fetchRulings(cardData.rulings_uri)
    } catch (error) {
      console.error('Error fetching card: ', error);
    }
  }
  
    /** Fetches the card then fetches the set icon*/
  async function fetchCardById(id) {
    try {
      const cardResponse = await fetch(`https://api.scryfall.com/cards/${id}`);
      if(!cardResponse.ok) throw new Error('Failed to fetch card');
      const cardData = await cardResponse.json();

      fetchSet(cardData);

      fetchRulings(cardData.rulings_uri)
      navigate(`/card/${cardData.set}/${cardData.collector_number}`, { replace: true });
    } catch (error) {
      console.error('Error fetching card: ', error);
    }
  }

  useEffect(() => {
    const state = location.state || {};

    if(state.cardId) {
      console.log("Yo");
      fetchCardById(state.cardId);
    } else if(set && number) {
      console.log("hey");
      fetchCard(set, number);
    }
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
        
        {rulings.length > 0 && <CardRules data={rulings}/>}
      </main>
      <Footer />
    </>
  );
};