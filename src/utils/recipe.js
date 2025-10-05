export const mapRecipeData = value => {
  return {
    title: value.title || '',
    description: value.description || '',
    thumb: value.photo || 'https://example.com/images/default-thumbnail.jpg',
    time: value.time || 0,
    instructions: value.instructions || '',
    areaId: value.area || null,
    categoryId: value.category || null,
    ingredients: (value.ingredients || [])
      .filter(ing => ing.id && ing.quantity)
      .map(ing => ({
        ingredientId: Number(ing.id),
        measure: ing.quantity,
      })),
  };
};
