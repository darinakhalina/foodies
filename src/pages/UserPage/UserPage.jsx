import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import { Link, useParams } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';

const UserPage = () => {
  const { id } = useParams();

  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>User Page</Subtitle>
      <PathInfo
        pages={[
          { name: 'Home', path: '/' },
          { name: 'Profile', path: `user/${id}` },
        ]}
      />
      <p>
        <Link to="/" viewTransition>
          Back to HP
        </Link>
      </p>
    </section>
  );
};

export default UserPage;
