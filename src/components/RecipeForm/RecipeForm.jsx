import { Formik, Form, Field, FieldArray } from 'formik';
import Button from '../Button/Button';
import Input from '../Input/Input';
import RecipeFormSummary from '../RecipeFormSummary/RecipeFormSummary';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import css from './RecipeForm.module.css';

const RecipeForm = () => {
  const handleSubmit = async values => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('cookingTime', values.cookingTime);
    formData.append('area', values.area);
    formData.append('recipe', values.recipe);

    if (values.photo) {
      formData.append('photo', values.photo);
    }

    values.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit recipe');
      }

      const data = await response.json();
      console.log('Recipe submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        category: '',
        cookingTime: 10,
        area: '',
        ingredients: [],
        recipe: '',
        photo: null,
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className={css.form}>
          <UploadPhoto setFieldValue={setFieldValue} />

          {/* Right side form */}
          <div className="flex flex-col gap-4">
            <RecipeFormSummary errors={errors} touched={touched} />
            {/* Category & Cooking time */}
            <div className="flex gap-4 items-center">
              <Field as="select" name="category" className="border rounded p-2 flex-1">
                <option value="">Select a category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </Field>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setFieldValue('cookingTime', Math.max(1, values.cookingTime - 1))}
                >
                  -
                </Button>
                <span>{values.cookingTime} min</span>
                <Button
                  variant="secondary"
                  onClick={() => setFieldValue('cookingTime', values.cookingTime + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Area */}
            <Field as="select" name="area" className="border rounded p-2">
              <option value="">Area</option>
              <option value="Italian">Italian</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Japanese">Japanese</option>
            </Field>

            {/* Ingredients */}
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Ingredients</span>
                  {values.ingredients.map((_, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Field
                        name={`ingredients.${index}.name`}
                        placeholder="Add the ingredient"
                        className="border rounded p-2 flex-1"
                      />
                      <Field
                        name={`ingredients.${index}.quantity`}
                        placeholder="Enter quantity"
                        className="border rounded p-2 w-32"
                      />
                      <Button onClick={() => remove(index)}>Trash</Button>
                    </div>
                  ))}
                  <Button variant="secondary">Add Ingredient + </Button>
                </div>
              )}
            </FieldArray>

            {/* Recipe Preparation */}
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Recipe Preparation</span>
              <Field
                as="textarea"
                name="recipe"
                placeholder="Enter recipe"
                maxLength={1000}
                className="border rounded p-2 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button variant="secondary">Trash Delete</Button>
              <Button type="submit">Publish</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
