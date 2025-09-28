import data from './recipes.json';

export function getRecipesByCategory(category) {
  const key = (category || '').toUpperCase();
  const list = data[key];
  return Array.isArray(list) ? list : [];
}
