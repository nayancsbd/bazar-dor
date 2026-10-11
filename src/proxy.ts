import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    url.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(url);
  }

  try {
    const sessionRes = await fetch(
      new URL("/api/auth/get-session", request.url),
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (sessionRes.ok) {
      const sessionData = await sessionRes.json();
      if (!sessionData?.user) {
        const url = new URL("/signin", request.url);
        url.searchParams.set("callbackUrl", request.nextUrl.pathname);
        url.searchParams.set("unauthorized", "true");
        return NextResponse.redirect(url);
      }
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
