import { getAllEmployees } from "@/data/employee";
import { getAllPosters } from "@/data/poster";
import { AddEmployeeForm } from "./components/form-add-employee";
import { AddPosterForm } from "./components/form-add-poster";
import { BadgeEmployee } from "@/components/badge-employee";
import { BadgePoster } from "@/components/badge-poster";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export default async function Settings() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  return (
    <div className="container flex flex-col items-center gap-12 p-8 py-20">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        <Card className="w-72 shrink-0">
          <CardHeader>
            <CardTitle>Ajouter un employé</CardTitle>
            <CardDescription>Créez de nouveaux employés.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddEmployeeForm />
          </CardContent>
        </Card>
        <Card className="w-full max-w-md sm:max-w-full">
          <CardHeader>
            <CardTitle>Employés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {employees.map((employee) => (
                <BadgeEmployee {...employee} key={employee.id} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        <Card className="w-72 shrink-0">
          <CardHeader>
            <CardTitle>Ajouter un poster</CardTitle>
            <CardDescription>Créez de nouveaux posters.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddPosterForm />
          </CardContent>
        </Card>
        <Card className="w-full max-w-md sm:max-w-full">
          <CardHeader>
            <CardTitle>Posters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {posters.map((poster) => (
                <BadgePoster {...poster} key={poster.id} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
