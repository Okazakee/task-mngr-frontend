import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../components/pages/Dashboard";
import { apiUrl } from "./envExports";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (newTask: Task) => axios.post(`${apiUrl}/tasks/`, newTask)
  });
};

export const useEditTask = () => {
  return useMutation({
    mutationFn: (updatedTask: Task) => axios.put(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask)
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskId: number) => axios.delete(`${apiUrl}/tasks/${taskId}`)
  });
};

export const useSpawnTasks = () => {
  return useMutation({
    mutationFn: () => axios.get(`${apiUrl}/tasks/spawn`)
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/login`, {username: 'okazakee', password: 'caccamolla', staylogged: false})
    .then(res => localStorage.setItem('userInfo', JSON.stringify({
      username: res.data.username,
      email: res.data.email
    }) ))
  })
};