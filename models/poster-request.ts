import { roles, type Role } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export type PosterRequestDocument = {
  posterTitle: string;
  employeeName: string;
  employeeRole: Role;
  note?: string | null;
  isAccepted: boolean;
  createdAt: Date;
};

const posterRequestSchema = new Schema<PosterRequestDocument>(
  {
    posterTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    employeeRole: {
      type: String,
      enum: roles,
      default: "EQUIPIER",
      required: true,
    },
    note: { type: String, trim: true, maxlength: 500, default: null },
    isAccepted: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
  },
  {
    collection: "PosterRequest",
    versionKey: false,
  },
);

export const PosterRequestModel =
  models.PosterRequest ||
  model<PosterRequestDocument>("PosterRequest", posterRequestSchema);
