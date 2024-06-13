import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http:192.168.0.10:2880',
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

export const getProfessionRequest = async()=>{
    try {
        return await apiClient.get('/profession/getProfession')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}