import React from "react";
import { ButtonProps } from "@/types/todo";
import { DeleteTodoById } from "@/lib/actions";

const DeleteButton: React.FC<ButtonProps> = ({ id }) => {

  return (
    <form action={DeleteTodoById}>
      <input type="hidden" name="id" value={id} />
      <button className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2 rounded font-bold">Delete</button>
    </form>
  );
};

export default DeleteButton;