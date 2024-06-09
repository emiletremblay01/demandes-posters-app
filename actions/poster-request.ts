"use server";

import * as z from "zod";
import { employeeSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { getEmployeeById } from "@/data/employee";
import { getPosterById } from "@/data/poster";
export const addPosterRequest = async (
  employeeId: string,
  posterId: string,
) => {
  try {
    const employee = await getEmployeeById(employeeId);
    if (!employee) {
      return { error: "Employee not found!" };
    }
    const poster = await getPosterById(posterId);
    if (!poster) {
      return { error: "Poster not found!" };
    }
    const result = await prismadb.posterRequest.create({
      data: {
        employeeId: employee.id,
        posterId: poster.id,
        quantity: 1,
      },
    });

    revalidatePath("/");
    return { success: `Poster request successfully added to database!` };
  } catch (error) {
    return { error: "Erreur interne!" };
  }
};
