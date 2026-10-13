import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Har request ke saath token lagao
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem("user");
    if (saved) {
      const { token } = JSON.parse(saved);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // kharab data ho to ignore karo
  }
  return config;
});

// Token expire ya ghalat ho to logout kar do
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes("/auth/");
    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
