// components/DeleteButton.tsx
import React from "react";
import { DeleteButtonProps } from "@/types/todo";
import { DeleteTodoById } from "@/lib/actions";

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const handleDelete = async () => {
    try {
      const data = await DeleteTodoById(id);
      console.log("Deleted Todo:", data);
      // Optionally, you can refresh the list of todos here
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
      Delete
    </button>
  );
};

export default DeleteButton;