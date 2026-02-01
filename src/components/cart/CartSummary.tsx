"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { useAppSelector } from "@/src/store/hooks";
import { selectCartSubtotal, selectCartTotalQuantity } from "@/src/store/slices/cartSlice";

export function CartSummary() {
  const subtotal = useAppSelector(selectCartSubtotal);
  const totalItems = useAppSelector(selectCartTotalQuantity);

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({totalItems} items)
          </span>
          <span className="font-medium">৳{subtotal.toFixed(2)}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Shipping will be calculated at checkout
        </p>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Subtotal</span>
            <span className="font-bold text-primary text-lg">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link href="/checkout">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={totalItems === 0}
        >
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="outline" className="w-full mt-3 bg-transparent">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
