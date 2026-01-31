import { proxy } from "./proxy";

export default proxy;

export const config = {
  matcher: [
    "/login",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};
