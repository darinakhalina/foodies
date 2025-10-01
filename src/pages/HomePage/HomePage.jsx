import Hero from '../../components/Hero/Hero';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import Header from '../../components/Header/Header.jsx';
import css from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/ui/modalSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={css.homePageUiHolder}>
        <Header />
        <Hero />
      </div>
      <section className="f-container">
        <Subtitle tag="h1">Home Page</Subtitle>
      </section>
      <div>
        <button onClick={() => dispatch(openModal('login'))}>Open Login</button>
        <button onClick={() => dispatch(openModal('register'))}>Open Register</button>
        <button onClick={() => dispatch(openModal('logout'))}>Open Logout</button>
      </div>
    </>
  );
};

export default HomePage;
