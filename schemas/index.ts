import { roles } from "@/lib/types";
import * as z from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const loginSchema = z.object({
  nip: z.string().regex(/^\d{4}$/, "Le NIP doit contenir 4 chiffres."),
});

export const employeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom est trop court.")
    .max(80, "Le nom est trop long."),
  role: z.enum(roles),
});

export const posterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom du poster est trop court.")
    .max(120, "Le nom du poster est trop long."),
});

export const mongoIdSchema = z
  .string()
  .regex(objectIdPattern, "Identifiant invalide.");

export const posterRequestSchema = z.object({
  employeeId: mongoIdSchema,
  posterId: mongoIdSchema,
  note: z
    .string()
    .trim()
    .max(500, "La note est trop longue.")
    .optional()
    .transform((value) => value || undefined),
});
