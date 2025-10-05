import { Field, useField } from 'formik';
import Textarea from '../Textarea/Textarea';
import css from './RecipeFormSummary.module.css';
import clsx from 'clsx';
const RecipeFormSummary = () => {
  const [, meta] = useField('title');
  return (
    <div className={css.summary}>
      <div>
        <Field
          className={clsx(css.caption, meta.touched && meta.error && css['input-error'])}
          name="title"
          placeholder="THE NAME OF THE RECIPE"
          required
        />
        {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
      </div>
      <Textarea name="description" placeholder="Enter a description of the dish" maxLength={200} />
    </div>
  );
};

export default RecipeFormSummary;
