"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { selectCartItems, clearCart } from "@/src/store/slices/cartSlice";
import { CartItemCard } from "@/src/components/cart/CartItemCard";
import { CartSummary } from "@/src/components/cart/CartSummary";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="bg-muted py-4">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Cart</span>
              </nav>
            </div>
          </div>
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Cart</span>
            </nav>
          </div>
        </div>

        {/* Cart Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Shopping Cart
              </h1>
              {cartItems.length > 0 && (
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
                <Link href="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              /* Cart Items */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Order Summary */}
                <div>
                  <CartSummary />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
