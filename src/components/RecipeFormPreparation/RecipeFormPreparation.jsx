import InputContainer from '../InputContainer/InputContainer';
import Textarea from '../Textarea/Textarea';

const RecipeFormPreparation = () => {
  return (
    <InputContainer lable="recipe preparation" id="instructions">
      <Textarea name="instructions" placeholder="Enter recipe" maxLength={5000} />
    </InputContainer>
  );
};

export default RecipeFormPreparation;
