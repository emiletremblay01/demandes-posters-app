"use server";

import * as z from "zod";
import { employeeSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
export const addEmployee = async (data: z.infer<typeof employeeSchema>) => {
  try {
    const validatedFields = employeeSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
    }

    const { name, role } = validatedFields.data;

    // if role is not in the enum, return error
    if (!Object.values(Role).includes(role as Role)) {
      return { error: "Invalid Role!" };
    }

    const result = await prismadb.employee.create({
      data: {
        name,
        role: role as Role,
      },
    });

    revalidatePath("/settings");
    return { success: `${result.name} successfully added to database!` };
  } catch (error) {
    return { error: "Erreur interne!" };
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const res = await prismadb.employee.delete({
      where: {
        id,
      },
    });
    revalidatePath("/settings");
    return { success: `${res.name} successfully deleted from database!` };
  } catch (error) {
    return { error: "Employee not found!" };
  }
};
