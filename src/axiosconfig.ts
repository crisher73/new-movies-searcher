import axios from 'axios';
import env from './env';


// Creamos una instancia de Axios con la configuración base
const instance = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregamos la API Key de TMDb a todas las solicitudes
instance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = env.API_KEY; //la api-key esta guardada en el archivo .env
  return config;
});

export default instance;