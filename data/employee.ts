import prismadb from "@/lib/prismadb";

export const getAllEmployees = async () => {
  return prismadb.employee.findMany();
};

export const getEmployeeById = async (id: string) => {
  return prismadb.employee.findUnique({
    where: {
      id,
    },
  });
};
