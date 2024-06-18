"use server";

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
        employeeName: employee.name,
        posterTitle: poster.name,
        employeeRole: employee.role,
      },
    });

    revalidatePath("/");
    return { success: `Poster request successfully added to database!` };
  } catch (error) {
    return { error: "Erreur interne!" };
  }
};

export const deletePosterRequest = async (id: string) => {
  try {
    const res = await prismadb.posterRequest.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return {
      success: `Poster request successfully deleted from database!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Poster request not found!" };
  }
};

export const approvePosterRequest = async (id: string) => {
  try {
    const res = await prismadb.posterRequest.update({
      where: {
        id,
      },
      data: {
        isAccepted: true,
      },
    });
    revalidatePath("/");
    return {
      success: `Poster request successfully approved!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Poster request not found!" };
  }
};
