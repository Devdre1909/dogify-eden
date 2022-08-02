import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_DOG_CEO_BASE_URL,
});

export default axiosInstance;
