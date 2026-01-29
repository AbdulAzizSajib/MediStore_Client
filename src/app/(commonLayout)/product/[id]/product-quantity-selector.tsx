"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Heart, ShoppingCart, Share2, Minus, Plus } from "lucide-react";

interface ProductQuantitySelectorProps {
  productId: string;
  stock: number;
}

export function ProductQuantitySelector({
  productId,
  stock,
}: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () =>
    setQuantity((q) => Math.min(stock, q + 1));
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${quantity} of product ${productId} to cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center border border-border rounded-lg">
        <button
          onClick={decrementQuantity}
          className="p-3 hover:bg-muted transition-colors"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-6 py-3 font-medium">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="p-3 hover:bg-muted transition-colors"
          disabled={quantity >= stock}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Button
        onClick={handleAddToCart}
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        disabled={stock === 0}
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </Button>

      <Button variant="outline" size="icon">
        <Heart className="h-5 w-5" />
      </Button>

      <Button variant="outline" size="icon">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
