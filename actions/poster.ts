"use server";

import * as z from "zod";
import { posterSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { auth } from "@/actions/auth";
export const addPoster = async (data: z.infer<typeof posterSchema>) => {
  try {
    const isAuth = await auth();
    if (!isAuth) {
      return { error: "Unauthorized!" };
    }
    const validatedFields = posterSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
    }

    const { name } = validatedFields.data;

    const result = await prismadb.poster.create({
      data: {
        name,
      },
    });

    revalidatePath("/settings");
    return {
      success: `Poster "${result.name}" successfully added to database!`,
    };
  } catch (error) {
    return { error: "Erreur interne!" };
  }
};

export const deletePoster = async (id: string) => {
  try {
    const isAuth = await auth();
    if (!isAuth) {
      return { error: "Unauthorized!" };
    }
    const res = await prismadb.poster.delete({
      where: {
        id,
      },
    });
    revalidatePath("/settings");
    return {
      success: `Poster "${res.name}" successfully deleted from database!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Poster not found!" };
  }
};
