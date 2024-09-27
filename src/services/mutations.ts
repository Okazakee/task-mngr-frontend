import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../components/pages/Dashboard";
import { apiUrl, token } from "../main";

axios.defaults.withCredentials = true;

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (newTask: Task) => axios.post(`${apiUrl}/tasks/`, newTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  });
};

export const useEditTask = () => {
  return useMutation({
    mutationFn: (updatedTask: Task) => axios.put(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskId: number) => axios.delete(`${apiUrl}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  });
};

export const useSpawnTasks = () => {
  return useMutation({
    mutationFn: () => axios.get(`${apiUrl}/tasks/spawn`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  });
};

export const login = () => {
  return useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/login`, {username: 'user', password: '123', staylogged: false})
  .then(response => {
    console.log('Response:', response); // Check if Set-Cookie is included
  })})
};