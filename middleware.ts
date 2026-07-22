import { NextResponse, NextRequest } from "next/server";

function isAuthenticated(req: NextRequest) {
  const cookieValue = req.cookies.get("nip")?.value;
  if (!cookieValue) {
    return false;
  }
  const nip = process.env.QL_NIP;
  if (!nip) {
    return false;
  }
  return cookieValue === nip;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    const isAuth = isAuthenticated(req);
    if (isAuth) {
      if (pathname !== "/auth/logout") {
        return NextResponse.redirect(new URL("/auth/logout", req.url));
      }
      return NextResponse.next();
    }

    if (pathname !== "/auth/login") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
