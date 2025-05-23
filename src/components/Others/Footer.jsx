import { Link } from "react-router-dom";
import "./css/Footer.css"
import RandomCard from "./RandomCard";

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
              <RandomCard name="footer-link" content="Random Card"/>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};