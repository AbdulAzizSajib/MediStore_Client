"use client";

import { useState } from "react";
import {
  ProductCard,
  type Product,
} from "@/src/components/products/product-card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Slider } from "@/src/components/ui/slider";
import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const categories = [
  { id: "medical", name: "Medical Supplies", count: 24 },
  { id: "personal", name: "Personal Care", count: 18 },
  { id: "baby", name: "Baby Care", count: 12 },
  { id: "beverages", name: "Beverages", count: 8 },
  { id: "accessories", name: "Accessories", count: 15 },
  { id: "pharmacy", name: "Pharmacy", count: 20 },
];

const allProducts: Product[] = [
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
    category: "personal",
    tags: ["Baby Care", "Medical"],
    discount: 22,
  },
  {
    id: "3",
    name: "Anti-septic Dry Hand Gel Pro",
    price: 15.0,
    image: "/images/products/hand-gel-2.jpg",
    category: "medical",
    tags: ["Medical"],
    isNew: true,
  },
  {
    id: "4",
    name: "Independent Living Kit",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/living-kit.jpg",
    category: "personal",
    tags: ["Supplies"],
    discount: 22,
  },
  {
    id: "5",
    name: "Surgical Latex Gloves",
    price: 8.0,
    originalPrice: 12.0,
    image: "/images/products/gloves.jpg",
    category: "medical",
    tags: ["Medical"],
    discount: 33,
  },
  {
    id: "6",
    name: "Nutritional Dairy Drink",
    price: 12.0,
    image: "/images/products/dairy.jpg",
    category: "beverages",
    tags: ["Beverages", "Personal"],
  },
  {
    id: "7",
    name: "Manual Oxygen Device",
    price: 45.0,
    originalPrice: 60.0,
    image: "/images/products/oxygen.jpg",
    category: "medical",
    tags: ["Medical"],
    discount: 25,
  },
  {
    id: "8",
    name: "N95 Face Mask Pack",
    price: 24.0,
    image: "/images/products/mask.jpg",
    category: "medical",
    tags: ["Medical", "Pharmacy"],
    isNew: true,
  },
  {
    id: "9",
    name: "Digital Thermometer",
    price: 18.0,
    image: "/images/products/hand-gel.jpg",
    category: "medical",
    tags: ["Medical"],
    isNew: true,
  },
  {
    id: "10",
    name: "Baby Care Essentials",
    price: 35.0,
    originalPrice: 45.0,
    image: "/images/products/living-aid.jpg",
    category: "baby",
    tags: ["Baby Care"],
    discount: 22,
  },
  {
    id: "11",
    name: "First Aid Kit Complete",
    price: 55.0,
    image: "/images/products/living-kit.jpg",
    category: "medical",
    tags: ["Medical", "Accessories"],
  },
  {
    id: "12",
    name: "Hand Sanitizer Family Pack",
    price: 28.0,
    originalPrice: 35.0,
    image: "/images/products/hand-gel-2.jpg",
    category: "personal",
    tags: ["Personal"],
    discount: 20,
  },
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("featured");

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId],
    );
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Shop
            </h1>
            <p className="text-muted-foreground">
              Browse our wide selection of medical supplies and healthcare
              products
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-4 space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Search</h3>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <span className="text-sm text-foreground">
                          {category.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Price Range
                  </h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategories.length > 0 || searchQuery) && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchQuery("");
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
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
                    Showing {sortedProducts.length} of {allProducts.length}{" "}
                    products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded-md px-3 py-2 bg-background"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>

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

              {/* Products Grid */}
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1",
                )}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchQuery("");
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-background p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Search</h3>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <span className="text-sm text-foreground">
                          {category.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Price Range
                  </h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  className="w-full"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
