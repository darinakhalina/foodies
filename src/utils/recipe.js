export const mapRecipeToFormData = recipe => {
  const formData = new FormData();

  const {
    title = '',
    description = '',
    time = 0,
    instructions = '',
    area = null,
    category = null,
    ingredients = [],
    photo = null,
  } = recipe;

  const ingredientsJson = JSON.stringify(
    ingredients
      .filter(ing => ing.id && ing.quantity)
      .map(ing => ({
        ingredientId: Number(ing.id),
        measure: ing.quantity,
      }))
  );
  formData.append('title', title);
  formData.append('description', description);
  formData.append('time', time.toString());
  formData.append('instructions', instructions);
  if (area) {
    formData.append('areaId', area.toString());
  }
  if (category) {
    formData.append('categoryId', category.toString());
  }
  formData.append('ingredients', ingredientsJson);
  if (photo) {
    formData.append('photo', photo);
  }
  return formData;
};
