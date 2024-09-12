import prismadb from "@/lib/prismadb";
import { auth } from "@/actions/auth";
export const getAllPosterRequests = async () => {
  const isAuth = await auth();
  if (!isAuth) {
    const posterRequests = await prismadb.posterRequest.findMany();
    return posterRequests.map((request) => ({
      ...request,
      employeeName: request.employeeName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase(),
    }));
  }
  return prismadb.posterRequest.findMany();
};
