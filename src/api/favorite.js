import api from './axios';
import { getAuthorizationHeader } from './helpers';

export const addFavorite = async (recipeId, token) => {
  const response = await api.post(
    `/recipes/${recipeId}/favorite`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return response.data;
};

export const deleteFavorite = async (recipeId, token) => {
  const response = await api.delete(`/recipes/${recipeId}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};

export const fetchFavoriteRecipes = async (token, page = 1, limit = 9) => {
  try {
    const response = await api.get(`/recipes/favorite`, {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Помилка при запиті favorite recipes:',
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
