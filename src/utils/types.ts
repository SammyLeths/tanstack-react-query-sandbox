export interface UserDataType {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface CreatePostType {
  title: string;
  body: string;
  userId: number;
}

export interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}
