"use server";

import { auth } from "@/actions/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { roles, type Role } from "@/lib/types";
import { EmployeeModel } from "@/models/employee";
import { employeeSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addEmployee = async (data: z.infer<typeof employeeSchema>) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const validatedFields = employeeSchema.safeParse(data);
    if (!validatedFields.success) return { error: "Invalid Fields!" };

    const { name, role } = validatedFields.data;
    if (!roles.includes(role as Role)) return { error: "Invalid Role!" };

    await connectToDatabase();
    const result = await EmployeeModel.create({ name, role });
    revalidatePath("/settings");
    return { success: `${result.name} successfully added to database!` };
  } catch {
    return { error: "Erreur interne!" };
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    await connectToDatabase();
    const result = await EmployeeModel.findByIdAndDelete(id);
    if (!result) return { error: "Employee not found!" };

    revalidatePath("/settings");
    return { success: `${result.name} successfully deleted from database!` };
  } catch {
    return { error: "Employee not found!" };
  }
};
