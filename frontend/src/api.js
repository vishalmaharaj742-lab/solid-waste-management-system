import axios from "axios";

const fallbackBaseUrl = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || fallbackBaseUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("swms_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
