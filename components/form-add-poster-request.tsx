"use client";
import { Combobox } from "@/components/combobox";
import { Employee, Poster } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

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
    if (!employeeId || employeeId === "null") {
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
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Créer une demande</CardTitle>
          <CardDescription>
            Créer une demande de poster d'un équipier.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>Équipier</Label>
          <Combobox data={employees} placeholder="Choisir Équipier..." />
          <Label className="mt-6">Poster</Label>
          <Combobox data={posters} placeholder="Choisir Poster..." />
        </CardContent>
        <CardFooter className="flex w-full">
          <Button disabled={isPending} onClick={handleClick} className="w-full">
            Ajouter demande
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
