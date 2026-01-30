import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-32 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters Skeleton - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-4 space-y-6">
                {/* Search */}
                <div>
                  <Skeleton className="h-5 w-16 mb-3" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Categories */}
                <div>
                  <Skeleton className="h-5 w-24 mb-3" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Skeleton className="h-5 w-24 mb-3" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-40" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
