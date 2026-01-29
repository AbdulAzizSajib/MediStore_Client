import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;

  const { data } = await userService.getSession();
  console.log(" Session data in proxy:", data);
  if (data) {
    isAuthenticated = true;
    if (data.user.role === Roles.ADMIN) {
      isAdmin = true;
    } else if (data.user.role === Roles.SELLER) {
      isSeller = true;
    } else if (data.user.role === Roles.CUSTOMER) {
      isCustomer = true;
    }
  }
  //..........

  // Redirect to login if not authenticated
  if (!isAuthenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if already logged in and trying to access login page
  if (isAuthenticated && pathname === "/login") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (isSeller) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //...........
  // Admin accessing admin-dashboard - allow
  if (isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.next();
  }

  // Admin trying to access seller-dashboard - redirect to admin-dashboard
  if (isAdmin && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //...........
  // Seller accessing seller-dashboard - allow
  if (isSeller && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.next();
  }

  // Seller trying to access admin-dashboard - redirect to seller-dashboard
  if (isSeller && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  //...........
  // Customer trying to access any dashboard - redirect to home
  if (
    isCustomer &&
    (pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/seller-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};
