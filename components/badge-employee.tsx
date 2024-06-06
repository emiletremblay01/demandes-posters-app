"use client";
import type { Employee } from "@prisma/client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteEmployee } from "@/actions/employee";
import { toast } from "sonner";
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
    <div className="flex px-3 py-1 gap-2 items-center border w-fit rounded-full">
      <div>{employee.name}</div>
      <Button
        variant="ghost"
        className="p-0 h-fit"
        disabled={isPending}
        onClick={handleDelete}
      >
        <XIcon className="size-4 translate-y-px" />
      </Button>
    </div>
  );
}
