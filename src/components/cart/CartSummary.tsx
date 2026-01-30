"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { useAppSelector } from "@/src/store/hooks";
import { selectCartSubtotal, selectCartTotalQuantity } from "@/src/store/slices/cartSlice";

export function CartSummary() {
  const subtotal = useAppSelector(selectCartSubtotal);
  const totalItems = useAppSelector(selectCartTotalQuantity);

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

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
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `৳${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        {subtotal > 0 && subtotal < 500 && (
          <p className="text-xs text-muted-foreground">
            Add ৳{(500 - subtotal).toFixed(2)} more for free shipping
          </p>
        )}
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">
              ৳{total.toFixed(2)}
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
