import axios from 'axios';
import { apiUrl } from '../main';

export const fetchTasks = async ({ pageParam }: { pageParam: number}) => {
  const res = await axios.get(`${apiUrl}/tasks/page?limit=${10}&page=${pageParam}`);

  return res.data
}