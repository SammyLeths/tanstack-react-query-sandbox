import axios from "axios";
import { TodoType } from "../types/todo";

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
