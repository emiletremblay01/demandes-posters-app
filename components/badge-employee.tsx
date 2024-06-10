"use client";
import type { Employee } from "@prisma/client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteEmployee } from "@/actions/employee";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
export function BadgeEmployee(employee: Employee) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteEmployee(employee.id).then((result) => {
        if (result.error) {
          toast(result.error);
          return;
        }
        toast(result.success);
      });
    });
  };
  return (
    <Badge
      variant="outline"
      className="flex w-fit cursor-default items-center gap-2 rounded-full border px-3 py-1"
    >
      <div>{employee.name}</div>
      <Button
        variant="ghost"
        className="h-fit p-0"
        disabled={isPending}
        onClick={handleDelete}
      >
        <XIcon className="size-4" />
      </Button>
    </Badge>
  );
}
