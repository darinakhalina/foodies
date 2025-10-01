import axios from 'axios';

const raw = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const host = raw.replace(/\/+$/, '');
const baseURL = host.endsWith('/api') ? host : `${host}/api`;

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// small logger to see final URLs in DevTools
api.interceptors.request.use((cfg) => {
  console.log('[API]', cfg.method?.toUpperCase(), `${cfg.baseURL}${cfg.url}`, cfg.params || '');
  return cfg;
});

export default api;
