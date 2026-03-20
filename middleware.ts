import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/auth-edge";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Skip middleware for static assets, api routes, and shared lib files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // 2. Maintenance Mode Check
    // We check a specific cookie or header to see if maintenance mode is active
    // Since we can't easily query DB in Edge Middleware without an API or Edge-Ready ORM,
    // we'll check for a 'MAINTENANCE_MODE' cookie which the admin toggle will set.
    const isMaintenanceMode = request.cookies.get("MAINTENANCE_MODE")?.value === "true";
    const isMaintenancePage = pathname === "/maintenance";
    const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/phyberk");

    if (isMaintenanceMode && !isMaintenancePage && !isAdminPage) {
        // Only allow admins to bypass maintenance mode
        const token = request.cookies.get("access_token")?.value;
        const payload = token ? await verifyAccessToken(token) : null;
        
        if (payload?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
    }

    // 3. Prevent loop if on maintenance page when mode is OFF
    if (!isMaintenanceMode && isMaintenancePage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
