import { auth } from "@/actions/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { serializePosterRequest } from "@/lib/serialize";
import { PosterRequestModel } from "@/models/poster-request";

export const getAllPosterRequests = async () => {
  const isAuth = await auth();
  await connectToDatabase();
  const requests = (await PosterRequestModel.find()).map(
    serializePosterRequest,
  );

  if (!isAuth) {
    return requests.map((request) => ({
      ...request,
      employeeName: request.employeeName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase(),
    }));
  }

  return requests;
};
