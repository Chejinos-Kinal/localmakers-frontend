import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://localmakers-backend.vercel.app',
 //baseURL: 'http://192.168.43.194:2880',
  timeout: 5000,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.token = token;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
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
export const registerAdminRequest = async (data) => {
  try {
      return await apiClient.post('/user/newAdmin', data)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}
export const dataUserRequest = async ()=>{
    try {
        return await apiClient.get(`/user/getUserData`)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const UpdateUser = async (data) => {
  try {
    const response = await apiClient.put(`/user/updateUser`, data);
      return response.data; 
  } catch (err) {
      return {
          error: true,
          err
      };
  }
};
