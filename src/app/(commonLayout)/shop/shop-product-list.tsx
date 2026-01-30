"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/src/components/products/product-card";
import { Button } from "@/src/components/ui/button";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Category } from "@/src/services/category.service";
import { ShopFilters } from "./shop-filters";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface ShopProductListProps {
  products: any[];
  categories: Category[];
  meta?: PaginationMeta;
  totalProducts: number;
}

export function ShopProductList({
  products,
  categories,
  meta,
  totalProducts,
}: ShopProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`/shop?${newSearchParams.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden bg-transparent"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <p className="text-sm text-muted-foreground">
            Showing {products.length} of {totalProducts} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background",
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background",
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1",
          )}
        >
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products found matching your criteria.
          </p>
          <Button
            variant="link"
            className="mt-2"
            onClick={() => router.push("/shop")}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {showFilters && (
        <ShopFilters
          categories={categories}
          showMobile={true}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  );
}
