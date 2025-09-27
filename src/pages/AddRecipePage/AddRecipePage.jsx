import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import { Link } from 'react-router-dom';

const AddRecipePage = () => {
  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>Add Recipe Page</Subtitle>
      <p>
        <Link to="/">Back to HP</Link>
      </p>
    </section>
  );
};

export default AddRecipePage;
