import data from './mock/recipes.json';

export function fetchRecipesByCategory(category) {
  return Promise.resolve(data[category?.toUpperCase()] || []);
}

export function getAreasForCategory(category) {
  const recs = data[category?.toUpperCase()] || [];
  return [...new Set(recs.map(r => r.area))];
}

export function getIngredientsForCategory(category) {
  const recs = data[category?.toUpperCase()] || [];
  const set = new Set();
  recs.forEach(r => r.ingredients.forEach(i => set.add(i)));
  return [...set];
}
