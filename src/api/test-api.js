import axios from './default';

// Example test function to fetch data
export async function getTest(params) {
  const response = await axios.get('/posts', {
    params,
  });
  return response.data;
}

export async function getTestById(id) {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
}
