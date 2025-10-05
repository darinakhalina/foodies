import { useFormikContext } from 'formik';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';
import css from './RecipeFormButtons.module.css';
import Loader from '../Loader/Loader';

const RecipeFormButtons = () => {
  const { resetForm, isSubmitting } = useFormikContext();
  return (
    <div className={css['buttons-box']}>
      <ButtonIcon iconName="icon-trash" variant="secondary" size="lg" onClick={() => resetForm()} />
      <Button type="submit">Publish</Button>
      {isSubmitting && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default RecipeFormButtons;
