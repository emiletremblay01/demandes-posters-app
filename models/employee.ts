import { model, models, Schema } from "mongoose";
import { roles, type Role } from "@/lib/types";

export type EmployeeDocument = {
  name: string;
  role: Role;
};

const employeeSchema = new Schema<EmployeeDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, enum: roles, required: true },
  },
  {
    collection: "Employee",
    versionKey: false,
  },
);

export const EmployeeModel =
  models.Employee || model<EmployeeDocument>("Employee", employeeSchema);
