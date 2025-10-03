import api from './axios';
import { getAuthorizationHeader } from './helpers.js';

export async function fetchRecipes({ category, area, ingredient, page = 1, limit = 12 }) {
  const { data } = await api.get('/recipes', {
    params: { category, area, ingredient, page, limit },
  });
  return data?.data || data;
}

export async function fetchRecipeById({ id }) {
  const { data } = await api.get(`/recipes/${id}`);
  return data.data;
}

export async function fetchMyRecipes(token, { page = 1, limit = 9 } = {}) {
  const { data } = await api.get('/recipes/me', {
    params: { page, limit },
    headers: { Authorization: getAuthorizationHeader(token) },
  });
  return data?.data ?? data;
}

export async function deleteMyRecipe(token, recipeId) {
  const { data } = await api.delete(`/recipes/${recipeId}`, {
    headers: { Authorization: getAuthorizationHeader(token) },
  });
  return data; 
}

export async function fetchRecipeFilters({ category, area }) {
  const { data } = await api.get('/recipes/filters', {
    params: { category, area },
  });
  return data?.data || data; 
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
