import { getAllEmployees } from "@/data/employee";
import { AddEmployeeForm } from "./components/form-add-employee";
import { TableEmployees } from "@/components/table-employee";

export default async function Settings() {
  const employees = await getAllEmployees();
  return (
    <div className="flex flex-col p-2 pt-16">
      <h1 className="font-bold text-xl">Ajouter un employé</h1>
      <div className="border rounded-md max-w-sm p-2">
        <AddEmployeeForm />
      </div>
      <TableEmployees employees={employees} />
    </div>
  );
}
