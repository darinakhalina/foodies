import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../../redux/recipes/operations';
import RecipeFormSummary from '../RecipeFormSummary/RecipeFormSummary';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import RecipeFormIngredients from '../RecipeFormIngredients/RecipeFormIngredients';
import RecipeFormPreparation from '../RecipeFormPreparation/RecipeFormPreparation';
import RecipeFormButtons from '../RecipeFormButtons/RecipeFormButtons';
import RecipeFormCooking from '../RecipeFormCooking/RecipeFormCooking';
import RecipeFormArea from '../RecipeFormArea/RecipeFormArea';
import { mapRecipeData } from '../../utils/recipe';
import recipeFormSchema from '../../validation/recipeFormSchema';
import css from './RecipeForm.module.css';

const RecipeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async values => {
    const formData = new FormData();
    const recipe = mapRecipeData(values);
    formData.append('recipe', recipe);
    if (values.photo) {
      formData.append('photo', values.photo);
    }
    dispatch(addRecipe(formData));
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: ''.trim(),
        category: '',
        time: 10,
        area: '',
        ingredients: [
          {
            id: '',
            quantity: '',
          },
        ],
        instructions: '',
        photo: null,
      }}
      validationSchema={recipeFormSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className={css.form} noValidate>
          <UploadPhoto setFieldValue={setFieldValue} />
          <div className={css.info}>
            <RecipeFormSummary errors={errors} touched={touched} />
            <RecipeFormCooking
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              touched={touched}
            />
            <RecipeFormArea />
            <RecipeFormIngredients values={values} errors={errors} touched={touched} />
            <RecipeFormPreparation errors={errors} touched={touched} />
            <RecipeFormButtons />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
