import { FormAddPosterRequest } from "@/components/form-add-poster-request";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllEmployees } from "@/data/employee";
import { getAllPosters } from "@/data/poster";
import { getAllPosterRequests } from "@/data/poster-request";

export default async function Home() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  const posterRequests = await getAllPosterRequests();
  return (
    <div className="container flex flex-col items-center pt-20">
      <FormAddPosterRequest {...{ employees, posters }} />
      <Table className="mx-auto mt-20 w-full max-w-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Équipier</TableHead>
            <TableHead>Poster</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posterRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {
                  employees.find(
                    (employee) => employee.id === request.employeeId,
                  )?.name
                }
              </TableCell>
              <TableCell>
                {posters.find((poster) => poster.id === request.posterId)?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
