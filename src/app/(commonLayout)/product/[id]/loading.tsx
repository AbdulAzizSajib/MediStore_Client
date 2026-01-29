import { Skeleton } from "@/src/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Breadcrumb Skeleton */}
        <div className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Skeleton className="h-4 w-12" />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-10" />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </nav>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Skeleton */}
              <div className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-xl" />
              </div>

              {/* Product Info Skeleton */}
              <div className="space-y-6">
                {/* Category */}
                <Skeleton className="h-5 w-24" />

                {/* Title */}
                <Skeleton className="h-10 w-3/4" />

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5 rounded" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Price */}
                <Skeleton className="h-9 w-28" />

                {/* Stock */}
                <Skeleton className="h-4 w-32" />

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Quantity & Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-12 w-32 rounded-lg" />
                  <Skeleton className="h-12 flex-1 rounded-lg" />
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-12 w-12 rounded-lg" />
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Skeleton */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="bg-card rounded-xl p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
