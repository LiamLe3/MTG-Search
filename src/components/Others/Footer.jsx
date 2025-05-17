import "./css/Footer.css"

export default function Footer() {
  return (
    <footer>
      <nav className="footer-nav">
        <div className="footer-column">
          <h5>Cards</h5>
          <ul>
            <li>
              <a className="footer-link" href="">Advanced Search</a>
            </li>
            <li>
              <a className="footer-link" href="">All Sets</a>
            </li>
            <li>
              <a className="footer-link" href="">Random Card</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};