"use server";

import { auth } from "@/actions/auth";
import { getEmployeeById } from "@/data/employee";
import { getPosterById } from "@/data/poster";
import { connectToDatabase } from "@/lib/mongodb";
import { PosterRequestModel } from "@/models/poster-request";
import { revalidatePath } from "next/cache";

export const addPosterRequest = async (
  employeeId: string,
  posterId: string,
  note: string | undefined,
) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const employee = await getEmployeeById(employeeId);
    if (!employee) return { error: "Employee not found!" };

    const poster = await getPosterById(posterId);
    if (!poster) return { error: "Poster not found!" };

    await connectToDatabase();
    await PosterRequestModel.create({
      employeeName: employee.name,
      posterTitle: poster.name,
      employeeRole: employee.role,
      note,
    });
    revalidatePath("/");
    return { success: "Poster request successfully added to database!" };
  } catch {
    return { error: "Erreur interne!" };
  }
};

export const deletePosterRequest = async (id: string) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    await connectToDatabase();
    const result = await PosterRequestModel.findByIdAndDelete(id);
    if (!result) return { error: "Poster request not found!" };

    revalidatePath("/");
    return { success: "Poster request successfully deleted from database!" };
  } catch {
    return { error: "Poster request not found!" };
  }
};

export const approvePosterRequest = async (id: string) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    await connectToDatabase();
    const result = await PosterRequestModel.findByIdAndUpdate(
      id,
      { isAccepted: true },
      { new: true },
    );
    if (!result) return { error: "Poster request not found!" };

    revalidatePath("/");
    return { success: "Poster request successfully approved!" };
  } catch {
    return { error: "Poster request not found!" };
  }
};
