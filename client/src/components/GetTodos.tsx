import React from "react";
import { GetTodos } from "@/lib/actions";
import { Todo } from "@/types/todo";
import { format, isValid, parseISO } from "date-fns";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

const GetTodosList = async () => {
  const todos: Todo[] = await GetTodos();
  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {todos.map((todo) => {
          const createdAt = todo.created_at ? parseISO(todo.created_at) : null;
          const updatedAt = todo.updated_at ? parseISO(todo.updated_at) : null;

          const isEdited =
            createdAt &&
            updatedAt &&
            createdAt.getTime() !== updatedAt.getTime();

          return (
            <ul key={todo.id} className="border border-gray-200 p-4 my-2 h-50 flex flex-col justify-between">
              <div>
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
                {isEdited && (
                  <li className="font-semibold text-black">
                    Actualizado:
                    <span className="text-gray-600">
                      {updatedAt && isValid(updatedAt)
                        ? format(updatedAt, "MM-dd HH:mm")
                        : "Invalid Date"}
                    </span>{" "}
                  </li>
                )}
              </div>
              <div className="flex justify-center gap-2 mx-auto pt-4">
                <Link
                  className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4 rounded"
                  href={`/edit-todo/${todo.id}`}
                >
                  Edit
                </Link>

                <DeleteButton id={todo.id} />
              </div>
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default GetTodosList;
