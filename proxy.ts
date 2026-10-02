import { NextRequest, NextResponse } from "next/server";
import { verifyTrafficAdminAuthorization } from "@/lib/admin-traffic-auth";

export async function proxy(request: NextRequest) {
  const authorized = await verifyTrafficAdminAuthorization(
    request.headers.get("authorization"),
  );

  if (!authorized) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "Cache-Control": "private, no-store",
        "WWW-Authenticate": 'Basic realm="meanydeany traffic", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
