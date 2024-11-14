import React from "react";
import { getTodoById } from "@/lib/actions";
import EditForm from "@/components/EditForm";
import { Todo } from "@/types/todo";

const EditTodoPage = async ({ params }: { params: { id: string } }) => {
  const todo: Todo = await getTodoById(params.id);

  return (
    <div>
      <EditForm 
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
      />
    </div>
  );
};

export default EditTodoPage;