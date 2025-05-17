import { useState, useEffect } from 'react';
import './css/SearchPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import PageCard from './PageCard';
import NextIcon from '../../assets/NextIcon';
import PrevIcon from '../../assets/PrevIcon';
export default function SearchPage() {
  const [cardsData, setCardsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(null);

  const [nextPageUrl, setNextPageUrl] = useState("https://api.scryfall.com/cards/search?q=a");
  const [loading, setLoading] = useState(false);
  const cardsPerPage = 60;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cardsData.slice(firstCardIndex, lastCardIndex);
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  useEffect(() => {
    const fetchCards = async (request) => {
      setLoading(true);
      try {
        const response = await fetch(request);
        const data = await response.json();
        setCardsData(prev => [...prev, ...data.data]);
        setNextPageUrl(data.next_page || null);
        setTotalCards(data.total_cards);
      } catch (error) {
        console.error("Error fetching Scryfall cards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cardsData.length === 0) {
      fetchCards(nextPageUrl);
      return;
    }

    const needsMore = lastCardIndex > cardsData.length;

    if (needsMore && nextPageUrl) {
      fetchCards(nextPageUrl);
    }
  }, [currentPage]);

  function nextPage() {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderPageNavigationButtons() {
    return (
      <div className="search-nav">
        <button className="prev-btn" onClick={prevPage} disabled={currentPage === 1}><PrevIcon/>Previous</button>
        <button className="next-btn" onClick={nextPage} disabled={currentPage === totalPages}>Next 60 <NextIcon/></button>
      </div>
    );
  }
  
  function renderGallery() {
    return (
      <section className="search-page">
        <p>Displaying cards {firstCardIndex + 1} - {lastCardIndex} of {totalCards}</p>
        {renderPageNavigationButtons()}
        <section className="gallery-container">
          {currentCards.map((card) => (<PageCard key={card.id} data={card} />))}
        </section>
        {renderPageNavigationButtons()}
      </section>
    );
  }

  return (
    <>
      <Header />
      <main>
        {loading ? <p>Loading page...</p> : renderGallery()}
      </main>
      <Footer />
    </>
  );
}