import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true,
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;