import axios from './axios.js';

export const fetchRecipeById = async (id) => {
  const response = await axios.get(`/recipes/${id}`);
  return response.data;
};

export const fetchPopularRecipes = async (token, options = {}) => {
  const res = await axios.get('/recipes/popular', {
    params: options,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data?.data ?? res.data;
};