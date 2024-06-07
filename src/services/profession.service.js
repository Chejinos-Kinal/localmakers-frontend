import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:2880',
  timeout: 500,
});

export const getProfessionRequest = async () => {
  try {
    return await apiClient.get('/profession/getProfession');
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};
