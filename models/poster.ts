import { model, models, Schema } from "mongoose";

export type PosterDocument = {
  name: string;
  quantity?: number | null;
};

const posterSchema = new Schema<PosterDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    quantity: { type: Number, default: null, min: 0 },
  },
  {
    collection: "Poster",
    versionKey: false,
  },
);

export const PosterModel =
  models.Poster || model<PosterDocument>("Poster", posterSchema);
