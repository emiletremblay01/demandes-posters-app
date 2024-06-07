"use client";
import type { Poster } from "@prisma/client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deletePoster } from "@/actions/poster";
import { toast } from "sonner";
export function BadgePoster(poster: Poster) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deletePoster(poster.id).then((result) => {
        if (result.error) {
          toast(result.error);
          return;
        }
        toast(result.success);
      });
    });
  };
  return (
    <div className="flex px-3 py-1 gap-2 items-center border w-fit cursor-default rounded-full">
      <div>{poster.name}</div>
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
