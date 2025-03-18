import { NextRequest } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean,
}

const publicOnlyUrls: Routes = {
    "/": true,
    "/log-in": true,
    "/create-account": true,
}

export async function middleware(request: NextRequest) {
    
    const pathname = request.nextUrl.pathname;

    const session = await getSession();
    const exists = publicOnlyUrls[pathname];
    if (!session.id) {
        if (!exists) {
            return Response.redirect(new URL("/", request.url));
        }
    } else {
        if (exists) {
            return Response.redirect(new URL("/profile", request.url));
        }
    }
}

export const config = {
    matcher: ["/", "/profile", "/create-account", "/log-in"],
}