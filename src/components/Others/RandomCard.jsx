import { useNavigate } from "react-router-dom";
import "./css/Footer.css"
import RandomIcon from "../../assets/RandomIcon";

export default function RandomCard({name, content}) {
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/random`);
      const cardData = await response.json();

      const setResponse = await fetch(`https://api.scryfall.com/sets/${cardData.set}`)
      const setData = await setResponse.json();

      navigate(`/card/${cardData.set}/${cardData.collector_number}`, {
        state: { cardData: { ...cardData, symbolUri: setData.icon_svg_uri } }
      });
    } catch (error) {
      console.error('Failed to fetch related card:', error);
    }
  }

  return (
    <span className={name} onClick={handleClick}>
      {content === "Random" && <RandomIcon />}
      {content}
    </span>
  );
};