"use server";

import { verifySessionToken } from "@/lib/auth-session";
import { cookies } from "next/headers";

export const auth = async () => {
  const token = cookies().get("session")?.value;
  return verifySessionToken(token);
};
