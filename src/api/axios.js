import axios from 'axios';

const raw = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const host = raw.replace(/\/+$/, '');
const baseURL = host.endsWith('/api') ? host : `${host}/api`;

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
