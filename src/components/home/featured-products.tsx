import { productService } from "@/src/services/product.service";
import { ProductCard } from "../products/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedProducts() {
  const { data: medicines, error } = await productService.getAllProduct();

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between  mb-4">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Link
          href="/products/best-sellers"
          className="flex items-center gap-2 text-primary font-medium hover:underline"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines && medicines.data.data.length > 0 ? (
          medicines.data.data.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            {error ? `Error: ${error.message}` : "No products found"}
          </div>
        )}
      </div>
    </div>
  );
}
