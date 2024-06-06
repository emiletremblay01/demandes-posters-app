import * as z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom est trop court.",
  }),
});

export const posterSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du poster est trop court.",
  }),
});
