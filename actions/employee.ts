"use server";

import * as z from "zod";
import { employeeSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
export const addEmployee = async (data: z.infer<typeof employeeSchema>) => {
  const validatedFields = employeeSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name } = validatedFields.data;

  const result = await prismadb.employee.create({
    data: {
      name,
      role: "EQUIPIER",
    },
  });

  revalidatePath("/settings");
  return result;
};

export const deleteEmployee = async (id: string) => {};
