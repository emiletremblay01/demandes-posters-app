import { model, models, Schema } from "mongoose";

export type PosterDocument = {
  name: string;
  quantity?: number | null;
};

const posterSchema = new Schema<PosterDocument>(
  {
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, default: null },
  },
  {
    collection: "Poster",
    versionKey: false,
  },
);

export const PosterModel =
  models.Poster || model<PosterDocument>("Poster", posterSchema);
