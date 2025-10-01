import Hero from '../../components/Hero/Hero';
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
    </>
  );
};

export default HomePage;
