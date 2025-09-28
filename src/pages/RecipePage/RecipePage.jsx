import Subtitle from '../../components/Subtitle/Subtitle';
import { Link, useParams } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo';

const RecipePage = () => {
  const { id } = useParams();

  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>RecipePage</Subtitle>
      <p> id - {id}</p>
      <div>
        <PathInfo
          pages={[
            { name: 'Home', path: '/' },
            { name: 'Recipe Page', path: `/recipe/${id}` },
          ]}
        />
      </div>
      <p>
        <Link to="/" viewTransition>
          Back to HP
        </Link>
      </p>
    </section>
  );
};

export default RecipePage;
