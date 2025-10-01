import api from './axios';

export async function fetchCategoryRecipes({ category, area, ingredient, page = 1, limit = 12 }) {
  const { data } = await api.get('/recipes', {
    params: { category, area, ingredient, page, limit },
  });
  return data.data; // { recipes, total, page, totalPages }
}

export async function fetchCategoryFilters({ category }) {
  const { data } = await api.get('/recipes/filters', { params: { category } });
  return data.data; // { areas, ingredients }
}
