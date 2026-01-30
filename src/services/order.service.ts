export interface OrderItem {
  medicineId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  phone: string;
  shippingAddress: string;
  orderItems: OrderItem[];
}

export interface Order {
  id: string;
  userId: string;
  phone: string;
  shippingAddress: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    try {
      const res = await fetch(`${API_URL}api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error.message || "Failed to create order" },
        };
      }

      const response = await res.json();
      console.log(response);
      return {
        data: response.data as Order,
        error: null,
      };
    } catch (error) {
      console.error("Order creation error:", error);
      return {
        data: null,
        error: { message: "Failed to create order" },
      };
    }
  },

  getUserOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch orders" },
        };
      }

      const response = await res.json();
      return {
        data: response.data as Order[],
        error: null,
      };
    } catch (error) {
      console.error("Fetch orders error:", error);
      return {
        data: null,
        error: { message: "Failed to fetch orders" },
      };
    }
  },
};
