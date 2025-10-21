import axios from "axios";
import { useAuthStore } from "@/stores/auth";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true; 

axios.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      try {
        const res = await axios.post("/auth/refresh", { withCredentials: true });
        const auth = useAuthStore();
        auth.setUser(res.data.accessToken);

        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        const auth = useAuthStore();
        auth.clearUser();
        console.error("Session expired. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);
