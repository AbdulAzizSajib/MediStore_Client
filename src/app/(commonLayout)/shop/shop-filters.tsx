"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Slider } from "@/src/components/ui/slider";
import { Search, X } from "lucide-react";
import { Category } from "@/src/services/category.service";

interface ShopFiltersProps {
  categories: Category[];
  showMobile?: boolean;
  onClose?: () => void;
}

export function ShopFilters({
  categories,
  showMobile = false,
  onClose,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "0";
  const currentMaxPrice = searchParams.get("maxPrice") || "1000";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [priceRange, setPriceRange] = useState([
    parseInt(currentMinPrice),
    parseInt(currentMaxPrice),
  ]);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "0" && value !== "1000") {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      newSearchParams.delete("page");

      router.push(`/shop?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = () => {
    updateURL({ search: searchQuery });
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(newCategory);
    updateURL({ category: newCategory });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handlePriceApply = () => {
    updateURL({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    router.push("/shop");
  };

  const hasActiveFilters =
    currentSearch ||
    currentCategory ||
    currentMinPrice !== "0" ||
    currentMaxPrice !== "1000";

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Search</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pr-10"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Search className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedCategory === category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <span className="text-sm text-foreground">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent"
          onClick={handlePriceApply}
        >
          Apply Price
        </Button>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  if (showMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-background p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {filterContent}
          <Button className="w-full mt-6" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return filterContent;
}
