import axios from 'axios';

export const fetchTasks = async () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await axios.get(`${apiUrl}/tasks`);
  return response.data;
};