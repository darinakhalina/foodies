import api from './axios';
import axios from './axios.js';
import { getAuthorizationHeader } from './helpers.js';

// export const fetchCategories = async () => {
//   const response = await axios.get(`/categories`);
//   return response.data;
// };

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
