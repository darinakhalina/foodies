import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import { Link } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';

const AddRecipePage = () => {
  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>Add Recipe Page</Subtitle>
      <PathInfo
        pages={[
          { name: 'Home', path: '/' },
          { name: 'Add Recipe', path: '/recipe/add' },
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

export default AddRecipePage;
