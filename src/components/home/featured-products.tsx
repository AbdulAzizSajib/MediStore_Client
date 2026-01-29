"use client";

import { useState } from "react";
import {
  ProductCard,
  type Product,
} from "@/src/components/products/product-card";
import { cn } from "@/src/lib/utils";

const categories = ["All", "Supplies", "Medical", "Beverages", "Baby Care"];

const products: Product[] = [
  {
    id: "1",
    name: "Anti-septic Dry Hand Gel",
    price: 12.0,
    image: "/images/products/hand-gel.jpg",
    category: "medical",
    tags: ["Accessories", "Medical"],
  },
  {
    id: "2",
    name: "Independent Living Aid",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/living-aid.jpg",
    category: "supplies",
    tags: ["Baby Care", "Medical"],
    discount: 22,
  },
  {
    id: "3",
    name: "Anti-septic Dry Hand Gel",
    price: 12.0,
    image: "/images/products/hand-gel-2.jpg",
    category: "medical",
    tags: ["Medical"],
  },
  {
    id: "4",
    name: "Independent Living Kit",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/living-kit.jpg",
    category: "supplies",
    tags: ["Supplies"],
    discount: 22,
  },
  {
    id: "5",
    name: "Surgical Latex Gloves",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/gloves.jpg",
    category: "medical",
    tags: ["Beverages"],
    discount: 22,
  },
  {
    id: "6",
    name: "Dairy Milk Whole Nut",
    price: 12.0,
    image: "/images/products/dairy.jpg",
    category: "beverages",
    tags: ["Medical", "Personal"],
  },
  {
    id: "7",
    name: "Manual Oxygen Device",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/oxygen.jpg",
    category: "medical",
    tags: ["Beverages"],
    discount: 22,
  },
  {
    id: "8",
    name: "Search Lab N95 Face Mask",
    price: 12.0,
    image: "/images/products/mask.jpg",
    category: "medical",
    tags: ["Medical", "Pharmacy"],
  },
];

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) =>
          p.tags?.some((tag) =>
            tag.toLowerCase().includes(activeCategory.toLowerCase()),
          ),
        );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Product
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
