import { Formik, Form, Field } from 'formik';
import RecipeFormSummary from '../RecipeFormSummary/RecipeFormSummary';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import RecipeFormIngredients from '../RecipeFormIngredients/RecipeFormIngredients';
import RecipeFormPreparation from '../RecipeFormPreparation/RecipeFormPreparation';
import RecipeFormButtons from '../RecipeFormButtons/RecipeFormButtons';
import RecipeFormCooking from '../RecipeFormCooking/RecipeFormCooking';
import RecipeFormArea from '../RecipeFormArea/RecipeFormArea';
import css from './RecipeForm.module.css';

const RecipeForm = () => {
  const handleSubmit = async values => {
    console.log(values);
    // const formData = new FormData();
    // formData.append('name', values.name);
    // formData.append('description', values.description);
    // formData.append('category', values.category);
    // formData.append('cookingTime', values.cookingTime);
    // formData.append('area', values.area);
    // formData.append('recipe', values.recipe);

    // if (values.photo) {
    //   formData.append('photo', values.photo);
    // }

    // values.ingredients.forEach((ingredient, index) => {
    //   formData.append(`ingredients[${index}][name]`, ingredient.name);
    //   formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    // });

    // try {
    //   const response = await fetch('/api/recipes', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to submit recipe');
    //   }

    //   const data = await response.json();
    //   console.log('Recipe submitted successfully:', data);
    // } catch (error) {
    //   console.error('Error submitting recipe:', error);
    // }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        category: '',
        cookingTime: 10,
        area: '',
        ingredients: [
          {
            id: '',
            quantity: '',
          },
        ],
        recipe: '',
        photo: null,
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className={css.form}>
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
