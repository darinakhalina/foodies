import * as Yup from 'yup';
const recipeFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title is too long (max 100 characters)')
    .required('Title is required'),

  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),

  category: Yup.string().required('Category is required'),

  time: Yup.number()
    .min(1, 'Cooking time must be at least 1 minute')
    .max(600, 'Cooking time cannot exceed 600 minutes')
    .required('Cooking time is required'),

  area: Yup.string().required('Region is required'),

  ingredients: Yup.array().min(2, 'Add at least one ingredient'),

  instructions: Yup.string()
    .min(10, 'Instructions must be at least 10 characters')
    .required('Instructions are required'),

  photo: Yup.mixed()
    .nullable()
    .test('fileSize', 'File size is too large (max 5MB)', value => {
      return !value || (value && value.size <= 5 * 1024 * 1024);
    })
    .test('fileType', 'Only JPG and PNG images are allowed', value => {
      return !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type));
    }),
});

export default recipeFormSchema;
