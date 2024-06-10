"use client";
import type { PosterRequest } from "@prisma/client";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTransition } from "react";
import {
  deletePosterRequest,
  approvePosterRequest,
} from "@/actions/poster-request";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

export function RequestActions({ request }: { request: PosterRequest }) {
  const [isPending, startTransition] = useTransition();
  const handleApprove = async () => {
    startTransition(() => {
      approvePosterRequest(request.id).then((res) => {
        if (res.success) {
          toast(res.success);
          return;
        }
        toast(res.error);
      });
    });
  };
  const handleDelete = async () => {
    startTransition(() => {
      deletePosterRequest(request.id).then((res) => {
        if (res.success) {
          toast(res.success);
          return;
        }
        toast(res.error);
      });
    });
  };
  return (
    <div className="flex gap-1">
      {request.isAccepted ? (
        <>
          <Badge variant="secondary">Approuvé</Badge>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="group h-fit rounded-full p-0"
            variant="ghost"
          >
            <XCircle className="size-6 text-muted-foreground group-hover:text-red-400" />{" "}
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={handleApprove}
            disabled={isPending}
            className="group h-fit rounded-full p-0"
            variant="ghost"
          >
            <CheckCircle2 className="size-6 text-muted-foreground group-hover:text-green-400" />{" "}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="group h-fit rounded-full p-0"
            variant="ghost"
          >
            <XCircle className="size-6 text-muted-foreground group-hover:text-red-400" />{" "}
          </Button>
        </>
      )}
    </div>
  );
}
