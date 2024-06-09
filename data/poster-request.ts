import prismadb from "@/lib/prismadb";

export const getAllPosterRequests = async () => {
  return prismadb.posterRequest.findMany();
};
