import * as z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});
