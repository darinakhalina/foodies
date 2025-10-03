import { useNavigate } from 'react-router-dom';
import css from './Hero.module.css';
import dessert from '../../assets/heroIMG/dessert.webp';
import rulet from '../../assets/heroIMG/rulet.webp';

const Hero = () => {
  const navigate = useNavigate();
  const handleClickAddRecipe = () => {
    navigate('/recipe/add');
  };

  return (
    <section className={css.hero}>
      <div className={css.containerHero}>
        <h1 className={css.heroTitle}>Improve Your Culinary Talents</h1>
        <p className={css.heroText}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
          tastes of various cuisines.
        </p>
        <button className={css.heroBtn} type="button" onClick={handleClickAddRecipe}>
          Add Recipe
        </button>
        <div className={css.wrapImg}>
          <div className={css.wrapDessert}>
            <img src={`${dessert}`} alt="dessert" />
          </div>
          <div className={css.wrapRulet}>
            <img src={`${rulet}`} alt="rulet" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
