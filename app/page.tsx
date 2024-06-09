import { FormAddPosterRequest } from "@/components/form-add-poster-request";
import { RequestActions } from "@/components/request-actions";
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
import { Suspense } from "react";

export default async function Home() {
  const employees = await getAllEmployees();
  const posters = await getAllPosters();
  const posterRequests = await getAllPosterRequests();
  return (
    <Suspense>
      <div className="container flex flex-col items-center pt-20">
        <FormAddPosterRequest {...{ employees, posters }} />
        <h1 className="mt-20 text-lg font-bold">Demandes de poster</h1>
        <Table className="mx-auto w-full max-w-md">
          <TableHeader>
            <TableRow>
              <TableHead>Équipier</TableHead>
              <TableHead>Poster</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posterRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.employeeName}</TableCell>
                <TableCell>{request.posterTitle}</TableCell>
                <TableCell>
                  <RequestActions request={request} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Suspense>
  );
}
