import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts, getUsers } from "./utils/api";
import { PostType, UserDataType } from "./utils/types";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const USER_ID = 4589;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useQuery<UserDataType[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    refetch: refetchGetPosts,
  } = useQuery<PostType[]>({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  const {
    mutate: createPostMutation,
    isSuccess: isCreatePostSuccess,
    isPending: isCreatePostPending,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });

  // useEffect(() => {
  //   if (isCreatePostSuccess && !isCreatePostPending) {
  //     console.log("isCreatePostSuccess - Refetching Posts");
  //     //refetchGetPosts();
  //     queryClient.invalidateQueries({ queryKey: ["getPosts"] });
  //     queryClient.invalidateQueries({ queryKey: ["getUsers"] });
  //   }
  // }, [isCreatePostSuccess, queryClient, isCreatePostPending]);

  console.log(usersIsLoading);

  if (usersError && !usersIsLoading) {
    return <div>An error has occured while fetching users...</div>;
  }

  const submitHandler = (event: FormEvent) => {
    event?.preventDefault();
    createPostMutation({
      title,
      body,
      userId: USER_ID,
    });
    //refetchGetPosts();
  };

  return (
    <div>
      <div>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event?.target.value);
            }}
          />
          <br />
          <label htmlFor="body">Body</label>
          <input
            type="text"
            name="body"
            id="body"
            value={body}
            onChange={(event) => {
              setBody(event?.target.value);
            }}
          />
          <button>Create Post</button>
        </form>
        {!postsIsLoading &&
          postsData &&
          postsData.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #000",
                padding: "10px",
                margin: "10px;",
                width: "70%",
              }}
            >
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
      {/* {!usersIsLoading && usersData ? (
        <div>
          {usersData.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #000",
                padding: "10px",
                margin: "10px;",
                width: "max-content",
              }}
            >
              <div>
                <b>User Id:</b> {user.name}
              </div>
              <div>
                <b>Username:</b> {user.username}
              </div>
              <div>
                <b>User Email:</b> {user.email}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )} */}
      {/* <div>Tanstack Query</div> */}
    </div>
  );
}

export default App;
