import api from './axios';
import { getAuthorizationHeader } from './helpers.js';

export async function fetchCategoryRecipes({ category, area, ingredient, page = 1, limit = 12 }) {
  const { data } = await api.get('/recipes', {
    params: { category, area, ingredient, page, limit },
  });
  return data.data; // { recipes, total, page, totalPages }
}

export async function fetchRecipeById({ id }) {
  const { data } = await api.get(`/recipes/${id}`);
  return data.data;
}

export async function fetchCategoryFilters({ category }) {
  const { data } = await api.get('/recipes/filters', { params: { category } });
  return data.data; // { areas, ingredients }
}

export const addRecipeToFavorites = async (token, recipeId) => {
  const { data } = await api.post(
    `/recipes/${recipeId}/favorite`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return data;
};

export const removeRecipeFromFavorites = async (token, recipeId) => {
  await api.delete(`/recipes/${recipeId}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return { id: recipeId };
};

export const getFavoritesApi = async (token, options = {}) => {
  const params = {
    ...options,
  };

  const response = await api.get('/recipes/favorite', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
