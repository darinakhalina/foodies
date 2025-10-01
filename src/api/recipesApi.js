import axios from './axios.js';

export const fetchRecipeById = async id => {
  const response = await axios.get(`/recipes/${id}`);
  return response.data;
};

export const fetchPopularRecipes = async () => {
  const response = await axios.get(`/recipes/popular`);
  return response.data;
};
