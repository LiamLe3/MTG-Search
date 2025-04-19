import logo from '../assets/planeswalker.svg';
import '../css/HomeLogo.css'

export default function HomeLogo() {
  return (
    <a className="home-logo">
        <img className="logo" src={logo} alt="logo" />
    </a>
  );
};