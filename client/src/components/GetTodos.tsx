import React from "react"
import { GetTodos } from "@/lib/actions"
import { Todo } from "@/types/todo"
import { format, isValid, parseISO } from "date-fns"
import DeleteButton from "./DeleteButton"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle2, XCircle, Edit2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"

const GetTodosList = async () => {
  const todos: Todo[] = await GetTodos()

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {todos.map((todo) => {
        const createdAt = todo.created_at ? parseISO(todo.created_at) : null
        const updatedAt = todo.updated_at ? parseISO(todo.updated_at) : null
        const isEdited = createdAt && updatedAt && createdAt.getTime() !== updatedAt.getTime()

        return (
          <Card key={todo.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold truncate">{todo.title}</CardTitle>
              <Badge variant={todo.completed ? "default" : "destructive"} className="w-fit">
                {todo.completed ? (
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                {todo.completed ? "Completed" : "Pending"}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="flex items-center text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Created: {createdAt && isValid(createdAt) ? format(createdAt, "MMM dd, HH:mm") : "Invalid Date"}
              </p>
              {isEdited && (
                <p className="flex items-center text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Updated: {updatedAt && isValid(updatedAt) ? format(updatedAt, "MMM dd, HH:mm") : "Invalid Date"}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/edit-todo/${todo.id}`}>
                  <Edit2Icon className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <DeleteButton id={todo.id} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default GetTodosList