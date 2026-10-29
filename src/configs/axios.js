import axios from "axios";
import { useAuthstore } from "../store/authStore";

const API_URI = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URI + '/api/v1',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = useAuthstore.getState().user?.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
