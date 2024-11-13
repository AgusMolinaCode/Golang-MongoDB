import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formSchema } from "@/lib/zodSchema";
import { getTodoById, updateTodo } from "@/lib/actions";
import { ButtonProps, Todo } from "@/types/todo";

const EditForm = async ({ id }: ButtonProps) => {
  const todo: Todo = await getTodoById(id);

  console.log(todo);


  
  return (
    <>
      {todo.title}
      {todo.completed}
      {todo.id}
    </>
  );
};

export default EditForm;
