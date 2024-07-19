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

export const newTransactionRequest = async(data)=>{
  try {
    return await apiClient.post('/transaction/new',data)
  } catch (err) {
    return{
      error: true,
      err,
    }
  }
}
export const getTransactionClient = async()=>{
  try {
    return await apiClient.get('/transaction/getClient')
  } catch (err) {
    return {
      error: true,
      err,
    }
  }
}
export const getTransactionProfesional = async()=>{
  try {
    return await apiClient.get('/transaction/getProfesional')
  } catch (err) {
    return {
      error: true,
      err,
    }
  }
}

export const updateStatusRequest = async(id, data)=>{
  try {
      return await apiClient.put(`/transaction/updateStatus/${id}`,data)
  } catch (err) {
    return{
      error: true,
      err,
    }

  }
}