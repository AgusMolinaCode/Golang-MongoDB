'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { formSchema } from "@/lib/zodSchema";
import { updateTodo } from "@/lib/actions";
import { ArrowLeft, Save } from 'lucide-react';

interface EditFormProps {
  id: string;
  title: string;
  completed: boolean;
}

const EditForm: React.FC<EditFormProps> = ({ id, title, completed }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      completed,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTodo(id, values);
      form.reset(values);
    } catch (error) {
      console.log("Error updating todo");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Main Page
        </Link>
      </Button>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Todo</CardTitle>
          <CardDescription>Update your todo item</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter todo title" />
                    </FormControl>
                    <FormDescription>
                      Edit the title of your todo item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Completed</FormLabel>
                      <FormDescription>
                        Mark this todo as completed
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <CardFooter className="px-0 pt-6">
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Update Todo
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditForm;