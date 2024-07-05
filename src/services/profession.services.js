import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localmakers-backend.vercel.app',
    baseURL: 'http://192.168.43.217:2880',
    timeout: 5000
})

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
