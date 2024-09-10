import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../pages/Home";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (newTask: Task) => axios.post(`${apiUrl}/tasks/`, newTask),
  });
};

export const useEditTask = () => {
  return useMutation({
    mutationFn: (updatedTask: Task) => axios.put(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask),
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskId: number) => axios.delete(`${apiUrl}/tasks/${taskId}`),
  });
};
