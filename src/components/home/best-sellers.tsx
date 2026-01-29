import Link from "next/link";
import {
  ProductCard,
  type Product,
} from "@/src/components/products/product-card";
import { ArrowRight } from "lucide-react";

const bestSellers: Product[] = [
  {
    id: "b1",
    name: "Anti-septic Dry Hand Gel",
    price: 12.0,
    image: "/images/products/hand-gel.jpg",
    category: "medical",
    tags: ["Accessories", "Medical"],
  },
  {
    id: "b2",
    name: "Independent Living Aid",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/living-aid.jpg",
    category: "supplies",
    tags: ["Baby Care", "Medical"],
    discount: 22,
  },
  {
    id: "b3",
    name: "Surgical Latex Gloves",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/gloves.jpg",
    category: "medical",
    tags: ["Care Supplies"],
    discount: 22,
  },
  {
    id: "b4",
    name: "Dairy Milk Whole Nut",
    price: 12.0,
    image: "/images/products/dairy.jpg",
    category: "beverages",
    tags: ["Care Hospital"],
  },
];

export function BestSellers() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Best Seller Products
          </h2>
          <Link
            href="/shop?sort=bestsellers"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
