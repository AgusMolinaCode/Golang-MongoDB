'use client';

import { useState } from "react";
import GetTodosList from "@/components/GetTodos";
import LoginForm from "@/components/login";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setToken(token);
  };

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
          {!token ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <GetTodosList token={token} />
          )}
        </div>
      </div>
    </div>
  );
}