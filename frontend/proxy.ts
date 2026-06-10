import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const generalLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "60 s"),
  prefix: "rl:general",
  analytics: true,
});

const authLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  prefix: "rl:auth",
  analytics: true,
});

const sensitiveLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "60 s"),
  prefix: "rl:sensitive",
  analytics: true,
});

function getIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

function getRateLimiter(pathname: string) {
  if (pathname.includes("/login") || pathname.includes("/register")) {
    return authLimit;
  }
  if (pathname.includes("/admin") || pathname.includes("/api/admin")) {
    return sensitiveLimit;
  }
  return generalLimit;
}

export async function proxy(request: NextRequest) {
  const ip = getIP(request);
  const pathname = request.nextUrl.pathname;
  const limiter = getRateLimiter(pathname);

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Demasiadas peticiones. Por favor espera un momento." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.floor((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", reset.toString());
  return response;
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/api/:path*",
  ],
};