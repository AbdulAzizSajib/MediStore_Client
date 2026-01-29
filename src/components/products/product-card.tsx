"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
  categoryId: string;
  sellerId: string;
  status: string;
  manufacturer?: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Price কে number এ convert করুন
  const priceNumber = parseFloat(product.price);
  const isOutOfStock = product.stock === 0;
  const isNew =
    new Date(product.createdAt) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOutOfStock && <Badge variant="destructive">Out of Stock</Badge>}
          {isNew && !isOutOfStock && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {product.status === "AVAILABLE" &&
            product.stock < 20 &&
            product.stock > 0 && (
              <Badge className="bg-amber-500 text-white">Low Stock</Badge>
            )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-md"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-md"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="text-xs text-primary">
              [{product.category.name}]
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">
              ৳{priceNumber.toFixed(2)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Stock: {product.stock}
          </span>
        </div>

        {/* Manufacturer */}
        {product.manufacturer && (
          <p className="text-xs text-muted-foreground mt-2">
            By {product.manufacturer}
          </p>
        )}
      </div>
    </div>
  );
}
