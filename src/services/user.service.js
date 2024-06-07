import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:2880',
  timeout: 500,
});

export const getUserProfession = async () => {
  try {
    return await apiClient.get('/user/getProf');
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};
