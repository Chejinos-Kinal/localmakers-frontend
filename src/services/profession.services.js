import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localmakers-backend.vercel.app',
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
export const getProfessionRequest = async () => {
    try {
      const response = await apiClient.get('/profession/getProfession');
      return response.data;
    } catch (err) {
      console.error('Error fetching professions:', err);
      return { error: true, err };
    }
  };
  