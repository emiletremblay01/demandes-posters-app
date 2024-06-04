import { Employee } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function TableEmployees({ employees }: { employees: Employee[] }) {
  return (
    <Table className="w-full">
      <TableCaption>Employés</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Rôle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
