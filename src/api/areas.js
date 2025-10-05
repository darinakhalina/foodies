import api from './axios';
import { getAuthorizationHeader } from './helpers.js';

export const fetchAreas = async (token, options = {}) => {
  const params = {
    ...options,
  };

  const response = await api.get('/areas', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
