import { Link } from "react-router-dom";
import "./css/Footer.css"

export default function Footer() {
  return (
    <footer>
      <nav className="footer-nav">
        <div className="footer-column">
          <h5>Cards</h5>
          <ul>
            <li>
              <Link className="footer-link" to="/advanced">Advanced Search</Link>
            </li>
            <li>
              <Link className="footer-link" to="/sets">All Sets</Link>
            </li>
            <li>
              <Link className="footer-link" to="/">Random Card</Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};