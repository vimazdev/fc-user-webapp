import envs from '@config/env.json';
const isProd = import.meta.env.MODE === 'production';
export const API_URL = isProd ? envs.prod : envs.dev;
