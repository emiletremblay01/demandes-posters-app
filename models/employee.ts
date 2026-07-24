import { roles, type Role } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export type EmployeeDocument = {
  name: string;
  role: Role;
};

const employeeSchema = new Schema<EmployeeDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    role: { type: String, enum: roles, required: true },
  },
  {
    collection: "Employee",
    versionKey: false,
  },
);

export const EmployeeModel =
  models.Employee || model<EmployeeDocument>("Employee", employeeSchema);
