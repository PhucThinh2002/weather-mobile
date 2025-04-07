import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = '1f6ced3bfab143cda1e44028240205'; // Thay API key của bạn vào đây

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export default api;
