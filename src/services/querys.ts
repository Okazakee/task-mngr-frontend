import axios from 'axios';

const apiUrl = process.env.VITE_API_URL;

export const fetchTasks = async ({ pageParam }: { pageParam: number}) => {
  const res = await axios.get(`${apiUrl}/tasks?limit=${10}&page=${pageParam}`);
  return res.data
}