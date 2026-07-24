"use server";

import { auth } from "@/actions/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { PosterModel } from "@/models/poster";
import { mongoIdSchema, posterSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addPoster = async (data: z.infer<typeof posterSchema>) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const validatedFields = posterSchema.safeParse(data);
    if (!validatedFields.success) return { error: "Invalid Fields!" };

    await connectToDatabase();
    const result = await PosterModel.create(validatedFields.data);
    revalidatePath("/settings");
    return {
      success: `Poster "${result.name}" successfully added to database!`,
    };
  } catch {
    return { error: "Erreur interne!" };
  }
};

export const deletePoster = async (id: string) => {
  try {
    if (!(await auth())) return { error: "Unauthorized!" };

    const parsedId = mongoIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid poster ID!" };

    await connectToDatabase();
    const result = await PosterModel.findByIdAndDelete(parsedId.data);
    if (!result) return { error: "Poster not found!" };

    revalidatePath("/settings");
    return {
      success: `Poster "${result.name}" successfully deleted from database!`,
    };
  } catch {
    return { error: "Erreur interne!" };
  }
};
