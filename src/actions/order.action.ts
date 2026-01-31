"use server";

import { CreateOrderPayload, orderService } from "../services/order.service";

export const createOrderAction = async (payload: CreateOrderPayload) => {
  return orderService.createOrder(payload);
};
