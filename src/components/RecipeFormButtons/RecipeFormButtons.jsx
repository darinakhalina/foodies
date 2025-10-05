import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';
import css from './RecipeFormButtons.module.css';
const RecipeFormButtons = () => {
  return (
    <div className={css['buttons-box']}>
      <ButtonIcon
        iconName="icon-trash"
        variant="secondary"
        size="lg"
        onClick={() => console.log('Видалено')}
      />
      <Button type="submit">Publish</Button>
    </div>
  );
};

export default RecipeFormButtons;
