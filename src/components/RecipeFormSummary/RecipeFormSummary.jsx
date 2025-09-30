import Input from '../Input/Input';
import css from './RecipeFormSummary.module.css';
const RecipeFormSummary = ({ errors, touched }) => {
  return (
    <div className={css.summary}>
      <Input
        name="name"
        placeholder="THE NAME OF THE RECIPE"
        required
        errors={errors}
        touched={touched}
      />
      <Input
        name="description"
        type="textarea"
        placeholder="Enter a description of the dish"
        required
        errors={errors}
        touched={touched}
        maxLength={200}
      />
    </div>
  );
};

export default RecipeFormSummary;
