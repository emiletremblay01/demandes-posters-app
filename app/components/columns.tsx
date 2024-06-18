"use client";

import {
  approvePosterRequest,
  deletePosterRequest,
} from "@/actions/poster-request";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PosterRequest } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
export const columns: ColumnDef<PosterRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "posterTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-translate-x-2 px-2"
        >
          Poster
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-translate-x-2 px-2"
        >
          Employé
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { employeeName, employeeRole } = row.original;
      return (
        <div className="flex gap-2">
          {employeeRole != "EQUIPIER" &&
            (employeeRole == "DIRECTEUR" ? (
              <Badge variant="outline">Directeur</Badge>
            ) : (
              <Badge variant="outline">Chef d&apos;équipe</Badge>
            ))}
          <div>{employeeName}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      const { id, isAccepted } = row.original;

      const handleApprove = async () => {
        startTransition(() => {
          approvePosterRequest(id).then((res) => {
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
          deletePosterRequest(id).then((res) => {
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
          {isAccepted ? (
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
    },
  },
];
