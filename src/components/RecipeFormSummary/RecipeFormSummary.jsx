import { Field } from 'formik';
import Textarea from '../Textarea/Textarea';
import css from './RecipeFormSummary.module.css';
const RecipeFormSummary = () => {
  return (
    <div className={css.summary}>
      <Field className={css.caption} name="title" placeholder="THE NAME OF THE RECIPE" required />
      <Textarea name="description" placeholder="Enter a description of the dish" maxLength={200} />
    </div>
  );
};

export default RecipeFormSummary;
