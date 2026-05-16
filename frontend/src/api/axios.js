import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://evgeniy-production-a3b7.up.railway.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Добавляем токен автоматически
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Глобальная обработка ответа: http → https + защита от CORB
api.interceptors.response.use(
  (response) => {
    // Рекурсивная замена http на https во всех строках (особенно для image)
    const replaceHttp = (data) => {
      if (typeof data === 'string' && data.startsWith('http://')) {
        return data;
      }
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(key => {
          data[key] = replaceHttp(data[key]);
        });
      }
      return data;
    };

    if (response.data) {
      response.data = replaceHttp(response.data);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expired or invalid');
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');

      if (window.toast) {
        window.toast.error('Сессия истекла. Войдите заново.');
      } else {
        alert('Сессия истекла. Войдите заново.');
      }
    }
    return Promise.reject(error);
  }
);

// Отладка
console.log('🚀 API Base URL:', import.meta.env.VITE_API_URL || 'https://evgeniy-production-a3b7.up.railway.app/api/');

export default api;