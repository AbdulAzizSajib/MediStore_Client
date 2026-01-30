import { env } from "./../env";

const API_URL = env.API_URL;

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryService = {
  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/category`, {
        next: { tags: ["categories"] },
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch categories" },
        };
      }

      const response = await res.json();
      const categories: Category[] = response?.data || [];

      return {
        data: categories,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: { message: "Failed to fetch categories" },
      };
    }
  },
};
