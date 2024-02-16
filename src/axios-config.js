import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

// Agrega un interceptor para las solicitudes salientes
instance.interceptors.request.use(config => {
  // Obtiene el token de autenticación de donde lo estés almacenando (por ejemplo, en localStorage)
  const authToken = localStorage.getItem('token');

  // Si hay un token de autenticación, agrega al encabezado de la solicitud
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;