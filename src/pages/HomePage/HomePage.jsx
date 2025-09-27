import Hero from '../../components/Hero/Hero';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';

const HomePage = () => {
  return (
    <>
      <Hero />
      <section className="f-container">
        <Subtitle tag="h1">Home Page</Subtitle>
      </section>
    </>
  );
};

export default HomePage;
