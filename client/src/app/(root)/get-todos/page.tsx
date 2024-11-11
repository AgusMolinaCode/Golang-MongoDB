import React from "react";
import { GetTodos } from "@/lib/actions";
import { Todo } from "@/types/todo";
import { format, isValid, parseISO } from "date-fns";

const page = async () => {
  const todos: Todo[] = await GetTodos();

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          const createdAt = todo.created_at ? parseISO(todo.created_at) : null;
          const updatedAt = todo.updated_at ? parseISO(todo.updated_at) : null;

          return (
            <ul
              key={todo.id}
              className="border border-gray-200 p-4 my-2 max-w-xs mx-auto"
            >
              <li className="font-semibold text-black">
                ID: <span className="text-gray-600">{todo.id}</span>{" "}
              </li>
              <li className="font-semibold text-black">
                Title: <span className="text-gray-600">{todo.title}</span>{" "}
              </li>
              <li className="font-semibold text-black">
                Completed:{" "}
                <span className="text-gray-600">
                  {todo.completed ? "✅" : "❌"}
                </span>{" "}
              </li>
              <li className="font-semibold text-black">
                Creado:
                <span className="text-gray-600">
                  {createdAt && isValid(createdAt)
                    ? format(createdAt, "MM-dd HH:mm")
                    : "Invalid Date"}
                </span>{" "}
              </li>
              <li className="font-semibold text-black">
                Editado:
                <span className="text-gray-600">
                  {updatedAt && isValid(updatedAt)
                    ? format(updatedAt, "MM-dd HH:mm")
                    : "Invalid Date"}
                </span>{" "}
              </li>
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
