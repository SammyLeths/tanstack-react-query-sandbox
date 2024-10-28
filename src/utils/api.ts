import { CreatePostType } from "./types";

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const res = await fetch(`${BASE_API_URL}/users`);
  console.log(res.ok, res.status);

  //return Promise.reject("Error");
  return res.json();
};

export const getPosts = async () => {
  const res = await fetch(`${BASE_API_URL}/posts`);
  return res.json();
};

export const createPost = async (body: CreatePostType) => {
  const res = await fetch(`${BASE_API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  return res.json();
};
