import { getAllEmployees } from "@/data/employee";
import { getAllPosters } from "@/data/poster";
import { AddEmployeeForm } from "./components/form-add-employee";
import { AddPosterForm } from "./components/form-add-poster";
import { BadgeEmployee } from "@/components/badge-employee";

export default async function Settings() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
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

      <h1 className="font-bold text-xl">Ajouter un poster</h1>
      <div className="border rounded-md max-w-sm p-2">
        <AddPosterForm />
      </div>
      <div className="flex flex-wrap gap-2 max-w-sm border rounded-md p-2">
        {posters.map((poster) => (
          <BadgePoster {...poster} key={poster.id} />
        ))}
      </div>
    </div>
  );
}
