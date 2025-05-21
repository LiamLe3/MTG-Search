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

  const [cardsData, setCardsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(null);

  
  const [loading, setLoading] = useState(false);
  const cardsPerPage = 60;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cardsData.slice(firstCardIndex, lastCardIndex);
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const [pagesData, setPagesData] = useState({});
  const pagesCacheRef = useRef({});
  const currentBatch = useRef(null);
  const pageCount = useRef(0);

  const [nextPageUrl, setNextPageUrl] = useState(`https://api.scryfall.com/cards/search?q=${searchQuery}`);

  const fetchCards = async (request) => {
    setLoading(true);
    try {
      const response = await fetch(request);
      const data = await response.json();
      setCardsData(prev => [...prev, ...data.data]);
      setNextPageUrl(data.next_page || null);
      setTotalCards(data.total_cards);
      return data;
    } catch (error) {
      console.error("Error fetching Scryfall cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const foo = async(request) => {
    setLoading(true);
    try {
      const response = await fetch(request);
      const data = await response.json();
      addPages(data);
      currentBatch.current = data;
      console.log(currentBatch);
    }catch (error) {
      console.error("Error fetching Scryfall cards:", error);
    } finally {
      setLoading(false);
    }
  }

  function addPages(data) {
    const dataLength = data.data.length;

    if(dataLength < 1) return;

    let difference = 0;

    if(pageCount.current !== 0) {
      difference = cardsPerPage - pagesCacheRef.current[pageCount.current].length;

      if(difference > 0) {
        const fillCards = data.data.slice(0, difference);
        pagesCacheRef.current[pageCount.current] = [
          ...pagesCacheRef.current[pageCount.current],
          ...fillCards
        ];
      }
    }

    let loopCounter = 0;
    let lastIndex = 0;
    let localPageCount = pageCount.current;

    do {
      localPageCount++;
      loopCounter++;
      lastIndex = loopCounter * cardsPerPage + difference;
      const firstIndex = lastIndex - cardsPerPage;

      const cards = data.data.slice(firstIndex, Math.min(lastIndex, dataLength));
      pagesCacheRef.current[localPageCount] = cards;
    } while(lastIndex < dataLength)
    
    pageCount.current = localPageCount;
  }

  useEffect(() => {
    pagesCacheRef.current = {};
    pageCount.current = 0;
    setCurrentPage(1);
    foo(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
  }, [searchQuery])


  useEffect(() => {
    if (cardsData.length === 0) {
      fetchCards(nextPageUrl);
      return;
    }

    const needsMore = lastCardIndex > cardsData.length;

    if (needsMore && nextPageUrl) {
      fetchCards(nextPageUrl);
    }

  }, [currentPage]);

  useEffect(() => {
    setCardsData([]);
    setCurrentPage(1);
    fetchCards(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
  }, [searchQuery])

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
        <button className="prev-btn" onClick={prevPage} disabled={currentPage === 1}><PrevIcon/>Previous</button>
        <button className="next-btn" onClick={nextPage} disabled={currentPage === totalPages}>Next 60 <NextIcon/></button>
      </div>
    );
  }
  
  function renderGallery() {
    return (
      <section className="search-page">
        <p>Displaying cards {firstCardIndex + 1} - {Math.min(lastCardIndex, totalCards)} of {totalCards}</p>
        {renderPageNavigationButtons()}
        <section className="gallery-container">
          {currentCards.map((card, index) => (<PageCard key={index} data={card} />))}
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