import type { Employee, Poster, PosterRequest } from "@/lib/types";
import type { EmployeeDocument } from "@/models/employee";
import type { PosterDocument } from "@/models/poster";
import type { PosterRequestDocument } from "@/models/poster-request";
import type { HydratedDocument } from "mongoose";

export function serializeEmployee(
  employee: HydratedDocument<EmployeeDocument>,
): Employee {
  return {
    id: employee._id.toString(),
    name: employee.name,
    role: employee.role,
  };
}

export function serializePoster(
  poster: HydratedDocument<PosterDocument>,
): Poster {
  return {
    id: poster._id.toString(),
    name: poster.name,
    quantity: poster.quantity ?? null,
  };
}

export function serializePosterRequest(
  request: HydratedDocument<PosterRequestDocument>,
): PosterRequest {
  return {
    id: request._id.toString(),
    posterTitle: request.posterTitle,
    employeeName: request.employeeName,
    employeeRole: request.employeeRole,
    note: request.note ?? null,
    isAccepted: request.isAccepted,
    createdAt: request.createdAt,
  };
}
