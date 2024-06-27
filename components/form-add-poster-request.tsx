"use client";
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
import { Employee, Poster } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addPosterRequest } from "@/actions/poster-request";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  note: z.string().optional(),
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    const { note } = data;
    startTransition(() => {
      addPosterRequest(employeeId, posterId, note)
        .then((result) => {
          if (result.error) {
            toast(result.error);
            return;
          }
          toast(result.success);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <CardHeader>
              <CardTitle>Créer une demande</CardTitle>
              <CardDescription>
                Créer une demande de poster d&apos;un équipier.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Label>Équipier</Label>
              <Combobox data={employees} placeholder="Choisir Équipier..." />
              <Label className="mt-6">Poster</Label>
              <Combobox data={posters} placeholder="Choisir Poster..." />
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
