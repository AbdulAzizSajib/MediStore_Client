"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAppDispatch } from "@/src/store/hooks";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/src/store/slices/cartSlice";
import { CartItem } from "@/src/types/cart.types";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </h3>
        </Link>
        {item.manufacturer && (
          <p className="text-sm text-muted-foreground">
            By {item.manufacturer}
          </p>
        )}
        <p className="text-primary font-semibold mt-1">
          ৳{item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => dispatch(decrementQuantity(item.id))}
            className="p-2 hover:bg-muted transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 font-medium min-w-[40px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(incrementQuantity(item.id))}
            className="p-2 hover:bg-muted transition-colors"
            disabled={item.quantity >= item.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold text-foreground">
          ৳{(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
