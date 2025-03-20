import { NextRequest } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean,
}

const publicOnlyUrls: Routes = {
    "/log-in": true,
    "/create-account": true,
}

export async function middleware(request: NextRequest) {
    
    const pathname = request.nextUrl.pathname;

    const session = await getSession();
    const exists = publicOnlyUrls[pathname];

    // 비로그인
    if (!session.id) {
        if (!exists) {
            return Response.redirect(new URL("/log-in", request.url));
        }
    // 로그인
    } else {
        if (exists) {
            return Response.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/", "/profile", "/create-account", "/log-in"],
}