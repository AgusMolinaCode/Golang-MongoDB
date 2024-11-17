import GetTodosList from "@/components/GetTodos";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end pb-6">
          <ModeToggle />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">
          TodoList con Golang y Next.js 15
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          Utilizando Server Actions para una experiencia fluida
        </p>
        <div className="flex justify-center mb-8">
          <Button>
            <Link href="/add-todo">Add Todo </Link>
          </Button>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
          <GetTodosList />
        </div>
      </div>
    </div>
  );
}
