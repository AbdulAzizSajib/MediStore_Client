import { env } from "./../env";

const API_URL = env.API_URL;

export const productService = {
  getAllProduct: async () => {
    try {
      const res = await fetch(`${API_URL}/medicine`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch featured products" },
        };
      }

      const response = await res.json();

      const medicines = response?.data?.data || [];

      return {
        data: medicines,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: { message: "Failed to fetch featured products" },
      };
    }
  },

  // getProductById
  getProductById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/medicine/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch product details" },
        };
      }
      const response = await res.json();
      const medicines = response?.data || null;
      return {
        data: medicines,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: { message: "Failed to fetch product details" },
      };
    }
  },
};
