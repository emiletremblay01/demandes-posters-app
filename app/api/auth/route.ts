import { createSessionToken } from "@/lib/auth-session";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
} from "@/lib/rate-limit";
import { loginSchema } from "@/schemas";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const identifier =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const rateLimit = checkLoginRateLimit(identifier);

    if (!rateLimit.allowed) {
      return new Response("Trop de tentatives. Réessayez plus tard.", {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      });
    }

    const parsedBody = loginSchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return new Response("NIP invalide", { status: 400 });
    }

    const expectedNip = process.env.QL_NIP;
    if (!expectedNip) {
      return new Response("Configuration du serveur invalide", {
        status: 500,
      });
    }

    if (parsedBody.data.nip !== expectedNip) {
      return new Response("NIP invalide", { status: 401 });
    }

    const token = await createSessionToken();
    clearLoginAttempts(identifier);

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
    });

    return new Response("Authorized!", { status: 200 });
  } catch {
    return new Response("Internal error", { status: 500 });
  }
}
