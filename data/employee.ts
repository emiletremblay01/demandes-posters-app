import { auth } from "@/actions/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { serializeEmployee } from "@/lib/serialize";
import { EmployeeModel } from "@/models/employee";

const anonymizeName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const getAllEmployees = async () => {
  const isAuth = await auth();
  await connectToDatabase();
  const employees = (await EmployeeModel.find()).map(serializeEmployee);

  if (!isAuth) {
    return employees.map((employee) => ({
      ...employee,
      name: anonymizeName(employee.name),
    }));
  }

  return employees;
};

export const getEmployeeById = async (id: string) => {
  const isAuth = await auth();
  await connectToDatabase();
  const document = await EmployeeModel.findById(id);

  if (!document) {
    return null;
  }

  const employee = serializeEmployee(document);
  return isAuth
    ? employee
    : { ...employee, name: anonymizeName(employee.name) };
};
