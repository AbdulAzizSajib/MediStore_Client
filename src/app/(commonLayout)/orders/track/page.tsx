"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { trackOrderStatusAction } from "@/src/actions/order.action";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Order } from "@/src/services/order.service";
import {
  Package,
  ChevronRight,
  Search,
  Loader2,
  Check,
  XCircle,
  Truck,
  Clock,
  PackageCheck,
  Box,
} from "lucide-react";
import Link from "next/link";

const ORDER_STEPS = [
  { status: "PLACED", label: "Order Placed", icon: Clock },
  { status: "PROCESSING", label: "Processing", icon: Box },
  { status: "SHIPPED", label: "Shipped", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: PackageCheck },
];

export default function OrderTrackPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<Order["status"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = useCallback(async (id: string) => {
    if (!id.trim()) return;

    setLoading(true);
    setError(null);
    setStatus(null);

    const result = await trackOrderStatusAction(id.trim());

    if (result.error) {
      setError(result.error.message);
    } else if (result.data) {
      setStatus(result.data.status);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const orderIdParam = searchParams.get("orderId");
    if (orderIdParam) {
      setOrderId(orderIdParam);
      trackOrder(orderIdParam);
    }
  }, [searchParams, trackOrder]);

  const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackOrder(orderId);
  };

  const getStepState = (stepStatus: string) => {
    if (!status || status === "CANCELLED") return "pending";
    const statusOrder = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"];
    const currentIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(stepStatus);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

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
              <Link
                href="/orders"
                className="text-muted-foreground hover:text-primary"
              >
                My Orders
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Track Order</span>
            </nav>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Track Your Order
            </h1>

            {/* Search Form */}
            <form onSubmit={handleTrackOrder} className="mb-8">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading || !orderId.trim()}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="ml-2">Track</span>
                </Button>
              </div>
            </form>

            {/* Error State */}
            {error && !loading && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                <XCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
                <h2 className="font-semibold text-foreground mb-1">
                  Order Not Found
                </h2>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            )}

            {/* Success - Show Status */}
            {status && !loading && (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="text-center">
                  <Badge
                    variant={
                      status === "DELIVERED"
                        ? "default"
                        : status === "CANCELLED"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-sm px-4 py-1"
                  >
                    {status}
                  </Badge>
                </div>

                {/* Cancelled State */}
                {status === "CANCELLED" ? (
                  <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <XCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
                    <h2 className="font-semibold text-foreground mb-1">
                      Order Cancelled
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This order has been cancelled. Contact support if you need
                      help.
                    </p>
                  </div>
                ) : (
                  /* Progress Steps */
                  <div className="rounded-lg border bg-card p-6">
                    <div className="space-y-4">
                      {ORDER_STEPS.map((step, index) => {
                        const state = getStepState(step.status);
                        const Icon = step.icon;
                        return (
                          <div key={step.status} className="flex items-center gap-4">
                            {/* Step indicator */}
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                state === "completed"
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : state === "current"
                                    ? "border-primary text-primary bg-primary/10"
                                    : "border-muted-foreground/30 text-muted-foreground"
                              }`}
                            >
                              {state === "completed" ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <Icon className="h-5 w-5" />
                              )}
                            </div>

                            {/* Step label */}
                            <span
                              className={`font-medium ${
                                state === "pending"
                                  ? "text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {step.label}
                            </span>

                            {/* Current indicator */}
                            {state === "current" && (
                              <span className="ml-auto text-xs text-primary font-medium">
                                Current
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order ID */}
                <p className="text-center text-sm text-muted-foreground">
                  Order ID: <span className="font-mono">{orderId}</span>
                </p>
              </div>
            )}

            {/* Initial State */}
            {!status && !error && !loading && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Enter your order ID to track your order.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
