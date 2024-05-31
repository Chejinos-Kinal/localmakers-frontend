import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:3200',
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
