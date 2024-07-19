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

export const getAccount = async()=>{
    try {
        return await apiClient.get('/account/getAccount')
    } catch (err) {
        return {
            err,
            error: err
        }
    }
}
export const getAccountAdmin =async()=>{
  try {
    return await apiClient.get('/account/getAccounts')
  } catch (err) {
    return {
      err,
      error: err
    }
  }
}
export const newPagoAdmin = async(id,data)=>{
  try {
    return await apiClient.put(`/account/ingreso/${id}`,data)
  } catch (error) {
    return {
      err,
       error: err
    }
  }
} 