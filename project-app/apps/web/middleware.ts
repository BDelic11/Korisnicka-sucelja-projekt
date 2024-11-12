// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@repo/ui/lib/session";

const protectedRoutes = ["/inspiration"];
const publicRoutes = ["/login", "/register", "/", "/about"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionToken = req.cookies.get("session")?.value;

  // Check if the session cookie is retrieved
  console.log("Session Cookie:", sessionToken);

  const session = await decrypt(sessionToken);

  // Log session to debug its contents
  console.log("Decrypted Session:", session);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // if (isPublicRoute && session) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
