"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GetTodos() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

export async function getTodoById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
}

export async function DeleteTodoById(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
  revalidatePath("/"); 
}

export async function createTodo(values: { title: string; completed: boolean }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
  }
  redirect("/");
}

export async function updateTodo(id: string, values: { title: string; completed: boolean }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating todo:", error);
  }
  redirect("/");
}