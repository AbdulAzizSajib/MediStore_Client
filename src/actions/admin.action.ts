"use server";

import { adminService } from "../services/admin.service";

export const getAllUsersAction = async () => {
  return adminService.getAllUsers();
};

export const updateUserStatusAction = async (id: string, status: string) => {
  return adminService.updateUserStatus(id, status);
};
