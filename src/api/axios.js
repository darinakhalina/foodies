import axios from 'axios';

const baseApiUrl = 'https://add-app-here.com';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
