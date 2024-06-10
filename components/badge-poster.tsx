"use client";
import type { Poster } from "@prisma/client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deletePoster } from "@/actions/poster";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
    <Badge
      variant="outline"
      className="flex w-fit cursor-default items-center gap-2 rounded-full border px-3 py-1"
    >
      <div>{poster.name}</div>
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
