import React from "react";
import { getTodoById } from "@/lib/actions";

const EditTodoPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const todos = await getTodoById(params.id);

  return (
    <div>
      <h1>Edit Todo</h1>
      <p>{todos.title}</p>
      <p>{todos.completed}</p>
      <p>{todos.id}</p>
    </div>
  );
};

export default EditTodoPage;
