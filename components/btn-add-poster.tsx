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
  
  
  function onSubmit() {
    const values = posterSchema.safeParse({
      name: text,
    });
    
    if (!values.success) {
      console.log(values.error)
      toast("erreur, voir console");
      return;
    }
    
    startTransition(() => {
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
    <Button
      onClick={onSubmit}
      className="h-fit w-fit"
      variant="secondary"
      disabled={isPending}
    >
      Ajouter <br /> <span className="italic">{text}</span>
    </Button>
  );
}
