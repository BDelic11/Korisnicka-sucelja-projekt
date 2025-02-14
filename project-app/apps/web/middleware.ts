// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@repo/ui/lib/session";

const protectedRoutes = ["/inspiration"];
const authRoutes = ["/login", "/register"];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionToken = req.cookies.get("session")?.value;

  const session = await decrypt(sessionToken);

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/inspiration", req.nextUrl));
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
