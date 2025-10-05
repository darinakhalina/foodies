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

export const fetchFollowings = async (token, page = 1, limit = 5) => {
  try {
    const response = await api.get(`users/me/followings`, {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching followings:', error.response?.status, error.response?.data);
    throw error;
  }
};

export const followUser = async (id, token) => {
  const response = await api.post(
    `users/${id}/subscribe`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return response.data;
};

export const unfollowUser = async (id, token) => {
  const response = await api.delete(`users/${id}/unsubscribe`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
