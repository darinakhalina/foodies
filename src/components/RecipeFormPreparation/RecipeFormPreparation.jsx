import InputContainer from '../InputContainer/InputContainer';
import Textarea from '../Textarea/Textarea';

const RecipeFormPreparation = () => {
  return (
    <InputContainer lable="recipe preparation" id="ingredients">
      <Textarea name="recipe" placeholder="Enter recipe" maxLength={5000} />
    </InputContainer>
  );
};

export default RecipeFormPreparation;
