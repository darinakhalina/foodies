import { useFormikContext } from 'formik';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';
import css from './RecipeFormButtons.module.css';
const RecipeFormButtons = () => {
  const { resetForm } = useFormikContext();
  return (
    <div className={css['buttons-box']}>
      <ButtonIcon iconName="icon-trash" variant="secondary" size="lg" onClick={() => resetForm()} />
      <Button type="submit">Publish</Button>
    </div>
  );
};

export default RecipeFormButtons;
