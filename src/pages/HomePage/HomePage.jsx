import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import css from './HomePage.module.css';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get('category');

  const handleSelect = name => {
    setParams({ category: name }); // Сюда имя категории
  };

  const handleClear = () => {
    setParams({});
  };

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
        <Testimonials />
      </section>

      <div className="f-container">
        <h2>Test</h2>
        {!category && (
          <div>
            <div>
              <h2>Секция категорий со списком</h2>
              <p>Тут список разных карточек</p>
              <p>Нужно обработать только all - все рецепты без конкретной категории</p>
              <div>
                <div>Одна из карточек Beef</div>
                <div>
                  <p>Кнопка с переходом на рецепты Beef</p>
                  <p>
                    <button onClick={() => handleSelect('Beef')}>Выбрать Beef</button>
                    <button onClick={() => handleSelect('Dessert')}>Выбрать Dessert</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {category && (
          <div>
            <h2>У нас выбрана категория: {category}</h2>
            <p>Мы получаем ее из params.get(category);</p>
            <p>И делаем запрос на бекенд в рамках этой категории: {category}</p>
            <div>Тут карточки</div>
            <p>
              <button onClick={handleClear}>
                Очищаем категории и возвращаемся к секции всех категорий
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
