export default function Pagination({totalCards, cardsPerPage, setCurrentPage, currentPage}) {
  let pages = [];

  for(let i = 1; i<= Math.ceil(totalCards/cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {
        pages.map((page, index) => {
          return <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
        })
      }
    </div>
  );
}