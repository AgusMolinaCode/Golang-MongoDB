"use server";

export async function GetTodos() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos`);
    const data = await response.json();
    console.log("Todos:", data);
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

export async function DeleteTodoById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Deleted Todo:", data);
    return data;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}