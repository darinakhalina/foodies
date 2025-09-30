import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';
import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

const AddRecipePage = () => {
  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>Add recipe</Subtitle>
      <PathInfo
        pages={[
          { name: 'Home', path: '/' },
          { name: 'Add Recipe', path: '/recipe/add' },
        ]}
      />

      <p>
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </p>
      <RecipeForm />
    </section>
  );
};

export default AddRecipePage;
