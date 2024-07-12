import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
    /*   baseURL: 'https://localmakers-backend.vercel.app', */
    baseURL: 'http://192.168.0.18:2880',
    timeout: 5000
})

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

 export const getUserProfessionRequest = async()  =>{
    try {
        return await apiClient.get('/user/getProf')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}
export const newProfession = async(data)=>{
    try {
        return await apiClient.post('/profession/newProfession',data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}