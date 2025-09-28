import axios from 'axios';

const baseApiUrl = 'https://foddies-rest-api-main.onrender.com/api';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
