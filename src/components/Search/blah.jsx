import { useState, useEffect } from 'react';
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

  const [loading, setLoading] = useState(false);

  const [pagesData, setPagesData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [fetchUrl, setFetchUrl] = useState(null);
  
  const cardsPerPage = 60;

  async function fetchSearch() {
    setLoading(true);
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching searched cards: ", error);
    } finally {
      setLoading(false);
    }
  }

  function addPages(data) {
    const dataLength = data.data.length;

    if(dataLength < 1) return;

    let difference = cardsPerPage - pagesData[pageCount].length;

    if(difference > 0) {
      const fillCards = data.data.slice(0, difference);
      setPagesData(prev => ({
        ...prev,
        [pageCount]: [...(prev[pageCount]), ...fillCards]
      }));
    }

    let loopCounter = 0;
    let lastIndex = 0;
    let localPageCount = pageCount;

    do {
      localPageCount++;
      loopCounter++;
      lastIndex = loopCounter * cardsPerPage + difference;
      const firstIndex = lastIndex - cardsPerPage;
      const cards = data.data.slice(firstIndex, Math.min(lastIndex, dataLength));
      setPagesData(prev => ({
        ...prev,
        [localPageCount]: cards
      }));
      
    } while(lastIndex < dataLength)

    setPageCount(localPageCount);
  }

  useEffect(() => {
    if(!fetchUrl) {
      setFetchUrl(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
      const data = fetchSearch();
      setTotalCards(data.total_cards);
      addPages(data);
    }
  }, [searchQuery])

  useEffect(() => {
    if(currentPage === pageCount){
      const data = fetchSearch();
      addPages(data);
    }

  }, [currentPage])

  function renderPageNavigationButtons() {
    return (
      <div className="search-nav">
        <button className="prev-btn" onClick={prevPage} disabled={currentPage === 1}><PrevIcon/>Previous</button>
        <button className="next-btn" onClick={nextPage} disabled={currentPage === pageCount}>Next 60 <NextIcon/></button>
      </div>
    );
  }
  
  function renderGallery() {
    return (
      <section className="search-page">
        <p>Displaying cards {(currentPage - 1) * cardsPerPage + 1} - {Math.min(currentPage * cardsPerPage, totalCards)} of {totalCards}</p>
        {renderPageNavigationButtons()}
        <section className="gallery-container">
          {(pagesData[currentPage] || []).map((card, index) => (<PageCard key={index} data={card} />))}
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