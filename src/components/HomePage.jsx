import '../css/HomePage.css'
import HomeSearch from './HomeSearch';
import HomeLinks from './HomeLinks';
import Footer from './Footer';
export default function HomePage() {
  return (
    <>
      <main>
        <section className="home-page">
          <h1 className="home-title">Just another <strong>Magic: The Gathering</strong> card search</h1>
          <HomeSearch searchType="home-search"/>
          <HomeLinks />
        </section>
      </main>
      <Footer />
    </>
  );
};
