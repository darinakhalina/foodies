import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Hero.module.css';
import dessert from '../../assets/heroIMG/dessert.webp';
import rulet from '../../assets/heroIMG/rulet.webp';

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClick = e => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <section className={css.hero}>
      <div className={css.containerHero}>
        <h1 className={css.heroTitle}>Improve Your Culinary Talents</h1>
        <p className={css.heroText}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
          tastes of various cuisines.
        </p>
        <Link className={css.heroBtn} to="/recipe/add" onClick={handleClick}>
          Add Recipe
        </Link>
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
