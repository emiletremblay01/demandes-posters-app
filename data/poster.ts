import prismadb from "@/lib/prismadb";

export const getAllPosters = async () => {
  return prismadb.poster.findMany();
};

export const getPosterById = async (id: string) => {
  return prismadb.poster.findUnique({
    where: {
      id,
    },
  });
};
