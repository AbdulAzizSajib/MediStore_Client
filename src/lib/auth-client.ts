import { createAuthClient } from "better-auth/react";
import { env } from "./../env";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:5000/",
  baseURL: `${env.NEXT_PUBLIC_BACKEND_URL}/`,

});
