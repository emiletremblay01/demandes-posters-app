import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/actions/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    const isAuth = await auth();
    if (isAuth) {
      if (pathname !== "/auth/logout") {
        return NextResponse.redirect(new URL("/auth/logout", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth) {
      if (pathname !== "/auth/login") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
