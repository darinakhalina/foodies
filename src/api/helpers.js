export const getAuthorizationHeader = token => {
  if (!token || token === 'null' || token === 'undefined') {
    return '';
  }
  return `Bearer ${token}`;
};
