import api from './axios';
import { getAuthorizationHeader } from './helpers.js';

export const fetchIngredients = async (token, options = {}) => {
  const params = {
    ...options,
  };

  const response = await api.get('/ingredients', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
