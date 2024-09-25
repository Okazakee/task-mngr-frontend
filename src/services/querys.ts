import axios from 'axios';
import { apiUrl, token } from '../main';

export const fetchTasks = async ({ pageParam }: { pageParam: number}) => {
  const res = await axios.get(`${apiUrl}/tasks?limit=${10}&page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return res.data
}