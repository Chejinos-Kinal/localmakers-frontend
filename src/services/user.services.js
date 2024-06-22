import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localmakers-backend.vercel.app',
    timeout: 5000
})


apiClient.interceptors.request.use(
    (config) => {
      const token = AsyncStorage.getItem('token');
      if (token) {
        config.headers.token = token;
      }
      return config;
    },
    (err) => Promise.reject(err),
  );
export const loginRequest = async (data) => {
    try {
        return await apiClient.post('/user/login', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}


export const registerRequest = async (data) => {
    try {
        return await apiClient.post('/user/newUser', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}