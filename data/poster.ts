import { connectToDatabase } from "@/lib/mongodb";
import { serializePoster } from "@/lib/serialize";
import { PosterModel } from "@/models/poster";

export const getAllPosters = async () => {
  await connectToDatabase();
  const posters = await PosterModel.find();
  return posters.map(serializePoster);
};

export const getPosterById = async (id: string) => {
  await connectToDatabase();
  const poster = await PosterModel.findById(id);
  return poster ? serializePoster(poster) : null;
};
