import prismadb from "@/lib/prismadb";
import { auth } from "@/actions/auth";

export const getAllEmployees = async () => {
  const isAuth = await auth();
  if (!isAuth) {
    const employees = await prismadb.employee.findMany();
    return employees.map((employee) => ({
      ...employee,
      name: employee.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }));
  }
  return prismadb.employee.findMany();
};

export const getEmployeeById = async (id: string) => {
  const isAuth = await auth();
  if (!isAuth) {
    const employee = await prismadb.employee.findUnique({
      where: { id },
    });

    if (employee) {
      return {
        ...employee,
        name: employee.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      };
    }
  }

  return prismadb.employee.findUnique({
    where: {
      id,
    },
  });
};
