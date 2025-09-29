import Hero from '../../components/Hero/Hero';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import Header from '../../components/Header/Header.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={css.homePageUiHolder}>
        <Header />
        <Hero />
      </div>
      <section className="f-container no-margin">
        <Categories />
      </section>
      <section className="f-container">
        <Subtitle tag="h1">Home Page</Subtitle>
      </section>
    </>
  );
};

export default HomePage;
