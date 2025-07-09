import axios from 'axios';
import { API_URL } from '@config/apiUrl.config';

const api = axios.create({
    baseURL: API_URL,
});

export default api;
