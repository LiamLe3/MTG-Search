import { Link } from "react-router-dom";
import "./css/HomeLinks.css"
import RandomCard from "../Others/RandomCard";

export default function HomeLinks() {
	return (
		<nav className="home-nav">
			<Link className="home-link" to="/advanced">Advanced Search</Link>
			<Link className="home-link" to="/sets">All Sets</Link>
			 <RandomCard name="home-link" content="Random" />
		</nav>
	);
};