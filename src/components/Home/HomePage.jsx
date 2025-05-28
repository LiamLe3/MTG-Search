import './css/HomePage.css'
import HomeSearch from './HomeSearch';
import HomeLinks from './HomeLinks';
import Footer from '../Others/Footer';
export default function HomePage() {
  /** Renders the home page */
  return (
    <>
      <main>
        <section className="home-page">
          <h1 className="home-title">Just another <b>Magic: The Gathering</b> card search</h1>
          <HomeSearch searchType="home-search"/>
          <HomeLinks />
        </section>
      </main>
      <Footer />
    </>
  );
};
