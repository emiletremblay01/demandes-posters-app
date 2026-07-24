"use server";

import { auth } from "@/actions/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { EmployeeModel } from "@/models/employee";
import { employeeSchema, mongoIdSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addEmployee = async (data: z.infer<typeof employeeSchema>) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const validatedFields = employeeSchema.safeParse(data);
    if (!validatedFields.success) return { error: "Invalid Fields!" };

    await connectToDatabase();
    const result = await EmployeeModel.create(validatedFields.data);
    revalidatePath("/settings");
    return { success: `${result.name} successfully added to database!` };
  } catch {
    return { error: "Erreur interne!" };
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const parsedId = mongoIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid employee ID!" };

    await connectToDatabase();
    const result = await EmployeeModel.findByIdAndDelete(parsedId.data);
    if (!result) return { error: "Employee not found!" };

    revalidatePath("/settings");
    return { success: `${result.name} successfully deleted from database!` };
  } catch {
    return { error: "Erreur interne!" };
  }
};
