import { getAllEmployees } from "@/data/employee";
import { AddEmployeeForm } from "./components/form-add-employee";
import { BadgeEmployee } from "@/components/badge-employee";

export default async function Settings() {
  const employees = await getAllEmployees();
  return (
    <div className="flex flex-col p-2 pt-16 gap-2">
      <h1 className="font-bold text-xl">Ajouter un employé</h1>
      <div className="border rounded-md max-w-sm p-2">
        <AddEmployeeForm />
      </div>
      <div className="flex flex-wrap gap-2 max-w-sm border rounded-md p-2">
        {employees.map((employee) => (
          <BadgeEmployee {...employee} key={employee.id} />
        ))}
      </div>
    </div>
  );
}
