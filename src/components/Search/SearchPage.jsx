import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './css/SearchPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
import ThumbnailCard from './ThumbnailCard';
import NextIcon from '../../assets/SearchPageAssets/NextIcon';
import PrevIcon from '../../assets/SearchPageAssets/PrevIcon';

export default function SearchPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const cardCache = useRef({});
  const currentBatch = useRef(null);
  const pageCount = useRef(0);
  const isFetching = useRef(false);

  const cardsPerPage = 60;
  const maxPages = Math.ceil((currentBatch.current?.total_cards || 0) / cardsPerPage)
  const totalCards = currentBatch.current?.total_cards || 0;
  const cardsToDisplay = cardCache.current[currentPage] || [];
  const firstCardNum = (currentPage - 1) * cardsPerPage + 1;
  const lastCardNum = Math.min(currentPage * cardsPerPage, totalCards);
  
  // Each query change, reset states and fetch first batch
  useEffect(() => {
    cardCache.current = {};
    pageCount.current = 0;
    setCurrentPage(1);
    fetchBatch(`https://api.scryfall.com/cards/search?q=${searchQuery}`);

  }, [searchQuery])

  // If the last cached page is reached, fetch for next batch if available
  useEffect(() => {
    if(currentPage === pageCount.current && currentBatch.current.has_more) {
      fetchBatch(currentBatch.current.next_page)
    }
  }, [currentPage]);

  const fetchBatch = async(url) => {
    // Prevent concurrent fetches
    if(isFetching.current) return;
    isFetching.current = true;

    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const cardBatch = await response.json();
      cacheBatchCards(cardBatch);
      currentBatch.current = cardBatch;
    }catch (error) {
      console.error("Error fetching Scryfall cards...", error);
      if(error.message.includes("404"))
        setErrorMsg("No cards were found...")
      else 
        setErrorMsg(error.message);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }

  // Cache new batch into pages of cards
  function cacheBatchCards(batch) {
    //Ascetain how many cards needed to fill previous page, ignore if first batch
    const remainingSlots = pageCount.current !== 0
    ? cardsPerPage - cardCache.current[pageCount.current].length : 0;

    pageCount.current = paginateAndCacheCards(batch.data, pageCount.current, remainingSlots);
  }

  // Splits cards into pages, filling up previous page if required
  function paginateAndCacheCards(cards, startPage, offset) {
    let remaining = [...cards];
    let page = startPage;

    // If previous page exists and needs to be filled
    if(offset > 0 && cardCache.current[page]) {
      cardCache.current[page] = [...cardCache.current[page], ...remaining.splice(0, offset)];
    }

    // While there are cards still to paginate
    while(remaining.length > 0) {
      page++;
      cardCache.current[page] = remaining.splice(0, cardsPerPage);
    }

    return page;
  }

  /**  Navigates user to next page */
  function nextPage() {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /**  Navigates user to previous page */
  function prevPage() {
    setCurrentPage(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /** Renders navigation buttons, sometimes button are not shown if loading or upon reaching the first and/or last page. */
  function renderPageNavigationButtons() {
    return (
      <div className="search-nav">
        <button className="prev-btn" onClick={prevPage} disabled={currentPage <= 1 || loading}><PrevIcon/>Previous</button>
        <button className="next-btn" onClick={nextPage} disabled={currentPage >= maxPages || loading}>Next 60 <NextIcon/></button>
      </div>
    );
  }
  
  /**  Renders all cards to be displayed on the current page */
  function renderGallery() {
    return (
      <section className="search-page">
        <p className="display-text">Displaying cards {firstCardNum} - {lastCardNum} of {totalCards}</p>
        {renderPageNavigationButtons()}
        <section className="gallery-container">
          {cardsToDisplay.map((card) => (<ThumbnailCard key={card.id} data={card} />))}
        </section>
        {renderPageNavigationButtons()}
      </section>
    );
  }

  /** Conditionally renders error message, loading message, or the full set table */
  return (
    <>
      <Header />
      <main>
        {errorMsg && <p className="error">{errorMsg}</p>}
        {!errorMsg && loading && <p className="loading">Loading page...</p>}
        {!errorMsg && !loading && renderGallery()}
      </main>
      <Footer />
    </>
  );
}