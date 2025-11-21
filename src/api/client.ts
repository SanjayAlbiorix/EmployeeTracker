import axios from "axios";
import { getToken } from "../utils/storage";
const client = axios.create({
  baseURL: "https://example.com/api",
  timeout: 15000,
});
client.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API error", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
export default client;
