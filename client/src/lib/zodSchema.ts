import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(2).max(50),
    completed: z.boolean(),
  });

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});