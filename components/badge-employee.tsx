import type { Employee } from "@prisma/client";
import { XIcon } from "lucide-react";

export function BadgeEmployee(employee: Employee) {
  return (
    <div className="flex p-2 py-1 gap-2 items-center border w-fit rounded-full">
      <div>{employee.name}</div>
      <XIcon className="size-4 translate-y-px" />
    </div>
  );
}
