"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Banner */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-secondary min-h-100">
            <Image
              src="/images/hero-thermometer.jpg"
              alt="Digital Thermometer"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-foreground/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <span className="text-primary-foreground/80 text-sm font-medium mb-2">
                Home Medical Supplies
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4 max-w-lg leading-tight text-balance">
                Fast Reading Digital Thermometer for Ear & Forehead
              </h1>
              <p className="text-background/80 mb-6 max-w-md">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain.
              </p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-fit">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex flex-col gap-4">
            {/* Top Side Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-primary/10 flex-1 min-h-47.5">
              <Image
                src="/images/hero-medicine.jpg"
                alt="Medicine Products"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-foreground/60 to-transparent " />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-background/80 text-xs font-medium mb-1">
                  Home Medical Supplies
                </span>
                <h3 className="text-xl font-bold text-background mb-1">
                  Medicine Product
                </h3>
                <p className="text-background/80 text-sm mb-3">
                  100 Taka - 500 Taka
                </p>
                <Link href="/shop?category=medicine">
                  <Button size="sm" variant="secondary" className="w-fit">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Side Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-accent/10 flex-1 min-h-47.5  ">
              <Image
                src="/images/hero-living.jpg"
                alt="Independent Living"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-foreground/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-background/80 text-xs font-medium mb-1">
                  Home Medical Supplies
                </span>
                <h3 className="text-xl font-bold text-background mb-1">
                  Independent Living
                </h3>
                <p className="text-background/80 text-sm mb-3">
                  1200 Taka - 1400 Taka
                </p>
                <Link href="/shop?category=living">
                  <Button size="sm" variant="secondary" className="w-fit">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
