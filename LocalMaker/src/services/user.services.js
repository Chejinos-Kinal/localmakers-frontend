import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http:192.168.0.10:2880',
    timeout: 5000
})


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