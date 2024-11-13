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

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTodo(id, values);
        form.reset();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="completed"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormLabel>Completed</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Update Todo</Button>
  </form>
</Form>