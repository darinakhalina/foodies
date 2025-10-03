import api from './axios';
import { getAuthorizationHeader } from './helpers';

export const fetchFollowers = async (id, token, page = 1, limit = 5) => {
  try {
    const response = await api.get(`users/${id}/followers`, {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error.response?.status, error.response?.data);
    throw error;
  }
};
