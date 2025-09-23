import axios from 'axios';

// for test purposes
const baseApiUrl = 'https://jsonplaceholder.typicode.com';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
