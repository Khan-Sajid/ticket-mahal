import { loginCookieName } from "@/utils/userAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("asdfsadfsdfdsf");
  const loginCookie = request.cookies.get(loginCookieName);
  if (
    (request.url.includes("/profile") ||
      request.url.includes("/edit-profile")) &&
    !loginCookie
  ) {
    console.log("asdfsadfsdfdsf");
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/edit-profile"],
};
