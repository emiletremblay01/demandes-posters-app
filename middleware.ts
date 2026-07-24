import { verifySessionToken } from "@/lib/auth-session";
import { NextRequest, NextResponse } from "next/server";

async function isAuthenticated(req: NextRequest) {
  return verifySessionToken(req.cookies.get("session")?.value);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    const isAuth = await isAuthenticated(req);

    if (isAuth) {
      if (pathname !== "/auth/logout") {
        return NextResponse.redirect(new URL("/auth/logout", req.url));
      }

      return NextResponse.next();
    }

    if (pathname !== "/auth/login") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
