import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    if (isTokenExpired()) {
      try {
        const newToken = await refreshToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

const refreshToken = async () => {
  try {
    const response = await axios.post("/refresh-token");
    const { token, expiresIn } = response.data;
    saveToken(token, expiresIn);
    return token;
  } catch (error) {
    console.error("Token refresh failed", error);
    // redirect to login
    throw error;
  }
};

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  return new Date().getTime() > expirationTime;
};

const saveToken = (token, expiresIn) => {
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiration", expirationTime);
};
