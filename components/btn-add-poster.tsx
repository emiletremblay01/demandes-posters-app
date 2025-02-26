"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addPoster } from "@/actions/poster";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { posterSchema } from "@/schemas";
import { useTransition } from "react";

export function AddPosterButton({ text }: { text: string }) {
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof posterSchema>>({
    resolver: zodResolver(posterSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit() {
    const values = posterSchema.safeParse({
      name: text,
    });
    
    if (!values.success) {
        toast(values.error.format());
        return;
    }
    
    startTransition(() => {
      console.log(values.data);
      addPoster(values.data).then((result) => {
        if (result.error) {
          toast(result.error);
          return;
        }
        toast(result.success);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Button
          type="submit"
          className="h-fit w-fit"
          variant="secondary"
          disabled={isPending}
        >
          Ajouter <br /> <span className="italic">{text}</span>
        </Button>
      </form>
    </Form>
  );
}
