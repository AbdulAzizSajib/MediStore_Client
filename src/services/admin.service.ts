import { cookies } from "next/headers";
import { env } from "./../env";
import { updateUser } from "better-auth/api";
import { userStatus } from "./../constants/userStatus";
const API_URL = env.API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  status: string;
}

export const adminService = {
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error.message || "Failed to update order status" },
        };
      }

      const response = await res.json();
      return {
        data: response.data as User[],
        error: null,
      };
    } catch (error) {
      console.error("Get all users error:", error);
      return {
        data: null,
        error: { message: "Failed to get all users" },
      };
    }
  },

  updateUserStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error.message || "Failed to update user status" },
        };
      }
      const response = await res.json();
      return {
        data: response.data as User,
        error: null,
      };
    } catch (error) {
      console.error("Update user status error:", error);
      return {
        data: null,
        error: { message: "Failed to update user status" },
      };
    }
  },
};
