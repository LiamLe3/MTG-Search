import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './css/SearchPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import PageCard from './PageCard';
import NextIcon from '../../assets/NextIcon';
import PrevIcon from '../../assets/PrevIcon';
export default function SearchPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q');

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cardCache = useRef({});
  const currentBatchData = useRef(null);
  const pageCount = useRef(0);

  const cardsPerPage = 60;
  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  const maxPages = Math.ceil((currentBatchData.current?.total_cards || 0) / cardsPerPage)
  const totalCards = (currentBatchData.current?.total_cards || 0);
  const cardsToDisplay = (cardCache.current[currentPage] || []);

  const fetchBatch = async(request) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(request);
      if(!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      addCardsToCache(data);
      currentBatchData.current = data;
    }catch (error) {
      console.error("Error fetching Scryfall cards...", error);
      if(error.message.includes("404"))
        setError("No cards were found...")
      else 
        setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function addCardsToCache(data) {
    const difference = fillLastPage(data.data, pageCount.current)

    pageCount.current = cachePaginateCards(data.data, pageCount.current, difference);
  }

  function fillLastPage(data, pageNum) {
    let difference = 0;

    if(pageNum !== 0) {
      difference = cardsPerPage - cardCache.current[pageNum].length;

      if(difference > 0) {
        const fillCards = data.slice(0, difference);
        cardCache.current[pageNum] = [
          ...cardCache.current[pageNum],
          ...fillCards
        ];
      }
    }

    return difference;
  }

  function cachePaginateCards(data, startPage, offset) {
    const dataLength = data.length;
    let loopCounter = 0;
    let lastIndex = 0;
    let pageNum = startPage;

    do {
      pageNum++;
      loopCounter++;
      lastIndex = loopCounter * cardsPerPage + offset;
      const firstIndex = lastIndex - cardsPerPage;

      const cards = data.slice(firstIndex, Math.min(lastIndex, dataLength));
      cardCache.current[pageNum] = cards;
    } while(lastIndex < dataLength)
    
    return pageNum;
  }

  useEffect(() => {
    cardCache.current = {};
    pageCount.current = 0;
    setCurrentPage(1);
    fetchBatch(`https://api.scryfall.com/cards/search?q=${searchQuery}`);

  }, [searchQuery])

  
  useEffect(() => {
    if(currentPage === pageCount.current && currentBatchData.current.has_more) {
      fetchBatch(currentBatchData.current.next_page)
    }
  }, [currentPage]);

  function nextPage() {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function prevPage() {
    setCurrentPage(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderPageNavigationButtons() {
    return (
      <div className="search-nav">
        <button className="prev-btn" onClick={prevPage} disabled={currentPage <= 1}><PrevIcon/>Previous</button>
        <button className="next-btn" onClick={nextPage} disabled={currentPage >= maxPages}>Next 60 <NextIcon/></button>
      </div>
    );
  }
  
  function renderGallery() {
    return (
      <section className="search-page">
        <p className="display-text">Displaying cards {firstIndex + 1} - {Math.min(lastIndex, totalCards)} of {totalCards}</p>
        {renderPageNavigationButtons()}
        <section className="gallery-container">
          {cardsToDisplay.map((card, index) => (<PageCard key={index} data={card} />))}
        </section>
        {renderPageNavigationButtons()}
      </section>
    );
  }

  return (
    <>
      <Header />
      <main>
        {loading && <p className="loading-message">Loading page...</p>}
        {error && <p className="error-message">⚠️ {error}</p>}
        {!loading && !error && renderGallery()}
      </main>
      <Footer />
    </>
  );
}