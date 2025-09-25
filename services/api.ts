import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = '90455b56f40a466594c33750251804'; // Thay API key của bạn vào đây

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export default api;
