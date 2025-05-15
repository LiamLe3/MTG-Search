import { useState, useEffect } from 'react';
import '../css/SearchPage.css'
import Header from './Header';
import Footer from './Footer';
import Pagination from './Pagination';
import PageGallery from './PageGallery';
export default function SearchPage() {
  const [cardsData, setCardsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 60;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://api.scryfall.com/cards/search?q=layout:transform");
        const data = await response.json();
        setCardsData(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Scryfall cards:", error);
      }
    };

    fetchCards();
  }, []);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cardsData.slice(firstCardIndex, lastCardIndex);
  return (
    <main>
      <section className="search-page">
        <PageGallery cardList={currentCards}/>
        <Pagination
          totalCards={cardsData.length}
          cardsPerPage={cardsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </section>
      
    </main>
  );
}