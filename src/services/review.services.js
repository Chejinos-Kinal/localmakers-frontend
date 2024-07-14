import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
 /*   baseURL: 'https://localmakers-backend.vercel.app', */
 baseURL: 'http://192.168.0.18:2880',
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


export const newReviewRequest = async(data) =>{
  try {
      return await apiClient.post('/review/new', data)
  } catch (err) {
    return {
      err,
      error: err
  }
  }
}

export const getReviewProfesionalRequest = async(userProfessional)=>{
  try {
    return await apiClient.get(`/review/get/${userProfessional}`)
  } catch (err) {
    return {
      err,
      error: err
      
    }
  }
}
export const getReviewProfesionalStarRequest = async()=>{
  try {
    return await apiClient.get(`/review/getProfesional`)
  } catch (err) {
    return {
      err,
      error: err
      
    }
  }
}