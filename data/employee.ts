import prismadb from "@/lib/prismadb";

export const getAllEmployees = async () => {
  return prismadb.employee.findMany();
};
