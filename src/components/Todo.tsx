// import { useIsFetching } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutation";
import { useTodos, useTodosIds } from "../services/queries";
import { TodoType } from "../types/todo";

const Todo = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  // const isFetching = useIsFetching();

  // if (todosIdsQuery.isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (todosIdsQuery.isError) {
  //   return <span>There is an error!</span>;
  // }

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<TodoType>();

  const createTodoHandler: SubmitHandler<TodoType> = (data) => {
    createTodoMutation.mutate(data);
  };

  const updateTodoHandler = (data: TodoType | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const deleteTodoHandler = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    console.log("Successfully deleted");
  };

  return (
    <div>
      {/* <p>Query Function Status: {todosIdsQuery.fetchStatus}</p>
      <p>Query Data Status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p> */}
      {/* {todosIdsQuery.data?.map((id) => (
        <p key={id}>Id: {id}</p>
      ))} */}

      <form onSubmit={handleSubmit(createTodoHandler)}>
        <label htmlFor="title">Todo Title </label>
        <input
          type="text"
          id="title"
          placeholder="Todo title"
          {...register("title")}
        />
        <br />
        <label htmlFor="description">Todo Description </label>
        <input
          type="text"
          id="description"
          placeholder="Todo description"
          {...register("description")}
        />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        />
      </form>

      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title:</strong> {data?.title},{" "}
              <strong>Description:</strong> {data?.description}
            </span>
            <div>
              <button onClick={() => updateTodoHandler(data)}>
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data?.id && (
                <button onClick={() => deleteTodoHandler(data.id!)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
