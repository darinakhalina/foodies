import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import { Link } from 'react-router-dom';

const UserPage = () => {
  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>User Page</Subtitle>
      <p>
        <Link to="/" viewTransition>
          Back to HP
        </Link>
      </p>
    </section>
  );
};

export default UserPage;
