"use client";

import { addPosterRequest } from "@/actions/poster-request";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Employee, Poster } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  note: z.string().trim().max(500, "La note est trop longue.").optional(),
});

export const FormAddPosterRequest = ({
  employees,
  posters,
}: {
  employees: Employee[];
  posters: Poster[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
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
      addPosterRequest(employeeId, posterId, data.note)
        .then((result) => {
          if (result.error) {
            toast(result.error);
            return;
          }

          toast(result.success);
          form.reset();
        })
        .finally(() => {
          router.refresh();
        });
    });
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <Card className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Créer une demande</CardTitle>
              <CardDescription>
                Créer une demande de poster d&apos;un équipier.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Label>Équipier</Label>
              <Combobox
                data={employees}
                type="employee"
                placeholder="Choisir Équipier..."
              />

              <Label className="mt-6">Poster</Label>
              <Combobox
                data={posters}
                type="poster"
                placeholder="Choisir Poster..."
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>
                      Note{" "}
                      <span className="text-muted-foreground">(optionnel)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Note..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex w-full">
              <Button disabled={isPending} type="submit" className="w-full">
                Ajouter demande
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
