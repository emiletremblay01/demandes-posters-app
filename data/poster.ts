import prismadb from "@/lib/prismadb";

export const getAllPosters = async () => {
  return prismadb.poster.findMany();
};
