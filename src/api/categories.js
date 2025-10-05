import api from './axios';
import { getAuthorizationHeader } from './helpers.js';

export const fetchCategories = async (token, options = {}) => {
  const params = {
    ...options,
  };

  const response = await api.get('/categories', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
