import React from "react";
import { GetTodos } from "@/lib/actions";
import { Todo } from "@/types/todo";
import { format, isValid, parseISO } from "date-fns";
import DeleteButton from "./DeleteButton";

const GetTodosList = async () => {
  const todos: Todo[] = await GetTodos();

  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {todos.map((todo) => {
          const createdAt = todo.created_at ? parseISO(todo.created_at) : null;
          const updatedAt = todo.updated_at ? parseISO(todo.updated_at) : null;

          return (
            <ul key={todo.id} className="border border-gray-200 p-4 my-2">
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
              {/* Delete Button by id */}
              <DeleteButton id={todo.id} />
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default GetTodosList;
