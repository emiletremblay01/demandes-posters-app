"use client";
import { Combobox } from "@/components/combobox";
import { Employee, Poster } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { addPosterRequest } from "@/actions/poster-request";
export const FormAddPosterRequest = ({
  employees,
  posters,
}: {
  employees: Employee[];
  posters: Poster[];
}) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const employeeId = searchParams.get("employee");
    if (!employeeId) {
      toast("Veuillez choisir un équipier.");
      return;
    }
    const posterId = searchParams.get("poster");
    if (!posterId) {
      toast("Veuillez choisir un poster.");
      return;
    }
    startTransition(() => {
      addPosterRequest(employeeId, posterId).then((result) => {
        if (result.error) {
          toast(result.error);
          return;
        }
        toast(result.success);
      });
    });
  };
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <Combobox data={employees} placeholder="Choisir Équipier..." />
      <div className="">voudrais avoir: </div>
      <Combobox data={posters} placeholder="Choisir Poster..." />
      <Button
        disabled={isPending}
        onClick={handleClick}
        className="mt-8 sm:mt-0"
      >
        Ajouter demande
      </Button>
    </div>
  );
};
