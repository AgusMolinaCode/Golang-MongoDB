import GetTodosList from "@/components/GetTodos";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {

  return (
    <div>
      <Button>
        <Link href="/add-todo">Add Todo </Link>   
      </Button>
      <GetTodosList />
    </div>
  );
}
