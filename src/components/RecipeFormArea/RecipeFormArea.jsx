import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';

const areas = [
  { value: 'Italian', name: 'Italian' },
  { value: 'Ukrainian', name: 'Ukrainian' },
  { value: 'Japanese', name: 'Japanese' },
];

const RecipeFormArea = () => {
  return (
    <InputContainer lable="area" id="area">
      <Select id="area" name="area" items={areas} placeholder="Area" />
    </InputContainer>
  );
};

export default RecipeFormArea;
