import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRole } from "./libs/constants";

export const proxy = async (request: NextRequest) => {
    let isAuthenticate = false;
    let isAdmin = false;
    let isProvider = false;
    const pathName = request.nextUrl.pathname

    const { data } = await userService.getSession()
    if (data) {
        isAuthenticate = true;
        isAdmin = data.user.role === UserRole.admin
        isProvider = data.user.role === UserRole.provider
    }

    if (!isAuthenticate) {
        return NextResponse.redirect(new URL("/login", request.url))
    }


    if (isAdmin && !pathName.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    if (isProvider && !pathName.startsWith("/provider")) {
        return NextResponse.redirect(new URL("/provider/dashboard", request.url))
    }
    // if ((!isAdmin && !isProvider) && !pathName.startsWith("/customer")) {
    //     return NextResponse.redirect(new URL("/customer/dashboard", request.url))
    // }
    return NextResponse.next()
} 

export const config = {
    matcher: ["/checkout","/profile", "/orders", "/admin", "/admin/:path*", "/provider", "/provider/:path*"]
}