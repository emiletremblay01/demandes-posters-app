"use server";
import { cookies } from "next/headers";

export const auth = async () => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("nip")?.value;

  if (!cookieValue) {
    return false;
  }
  const nip = process.env.QL_NIP;
  if (!nip) {
    return false;
  }

  return cookieValue === nip;
};
