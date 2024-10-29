import axios from "axios";
import { TodoType } from "../types/todo";
import { ProjectType } from "../types/projects";

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstance.get<TodoType[]>("todos")).data.map(
    (todo) => todo.id
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<TodoType>(`todos/${id}`)).data;
};

export const createTodo = async (data: TodoType) => {
  await axiosInstance.post("todos", data);
};

export const updateTodo = async (data: TodoType) => {
  await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async (page = 1) => {
  return (
    await axiosInstance.get<ProjectType[]>(`projects?_page=${page}&limit=3`)
  ).data;
};
