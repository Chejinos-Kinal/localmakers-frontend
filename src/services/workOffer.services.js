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

export const createWorkOffertRequest = async (data, idProf) => {
  try {
    return await apiClient.post(`/workoffer/createWorkOffer/${idProf}`, data);
  } catch (err) {
    console.error(err);
    return {
      error: true,
      err,
    };
  }
};

export const getWorkOffertRequest = async()=>{
  try {
    return await apiClient.get('/workoffer/getWorkOffersByLoggedUser')
  } catch (err) {
     return {
      error: true,
      err,
     }
  }
}

export const deleteWorkOffertRequest = async(workOfferId)=>{
  try {
    return await apiClient.delete(`/workoffer/deleteWorkOffer/${workOfferId}`)
  } catch (err) {
    return {
      error: true,
      err,
    }
  }
}