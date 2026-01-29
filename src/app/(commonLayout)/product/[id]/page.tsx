"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import {
  ProductCard,
  type Product,
} from "@/src/components/products/product-card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Heart,
  ShoppingCart,
  Share2,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

const products: Record<
  string,
  Product & {
    description: string;
    fullDescription: string;
    specifications: Record<string, string>;
  }
> = {
  "1": {
    id: "1",
    name: "Anti-septic Dry Hand Gel",
    price: 12.0,
    image: "/images/products/hand-gel.jpg",
    category: "medical",
    tags: ["Accessories", "Medical"],
    description:
      "Professional grade antiseptic hand gel for maximum protection.",
    fullDescription:
      "Our Anti-septic Dry Hand Gel provides hospital-grade protection against germs and bacteria. Formulated with 70% alcohol and moisturizing agents, it effectively sanitizes your hands while keeping them soft and hydrated. Perfect for healthcare professionals, office workers, and anyone concerned about hygiene.",
    specifications: {
      Volume: "500ml",
      "Alcohol Content": "70%",
      Fragrance: "Fresh Clean",
      "Skin Type": "All Skin Types",
      "Active Ingredient": "Ethyl Alcohol",
    },
  },
  "2": {
    id: "2",
    name: "Independent Living Aid",
    price: 2.0,
    originalPrice: 4.0,
    image: "/images/products/living-aid.jpg",
    category: "supplies",
    tags: ["Baby Care", "Medical"],
    discount: 22,
    description: "Essential daily living aid for increased independence.",
    fullDescription:
      "This comprehensive Independent Living Aid is designed to help individuals maintain their independence and dignity in daily activities. Ergonomically designed for comfort and ease of use, this product is perfect for elderly individuals or anyone recovering from injury.",
    specifications: {
      Material: "Medical Grade Plastic",
      Weight: "250g",
      Color: "White/Blue",
      Usage: "Daily Living Support",
      Warranty: "1 Year",
    },
  },
};

const relatedProducts: Product[] = [
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
    id: "8",
    name: "N95 Face Mask Pack",
    price: 24.0,
    image: "/images/products/mask.jpg",
    category: "medical",
    tags: ["Medical", "Pharmacy"],
    isNew: true,
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
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get product or default to first one
  const product = products[productId] || products["1"];

  const images = [
    product.image,
    "/images/products/hand-gel-2.jpg",
    "/images/products/living-kit.jpg",
  ];

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
                href="/shop"
                className="text-muted-foreground hover:text-primary"
              >
                Shop
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Tags */}
                {product.tags && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-sm text-primary">
                        [{tag}]
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (24 reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
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

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Free Shipping
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Secure Payment
                      </p>
                      <p className="text-xs text-muted-foreground">
                        100% Protected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Easy Returns
                      </p>
                      <p className="text-xs text-muted-foreground">
                        30 Day Policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 mb-6">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Reviews (24)
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="bg-card rounded-xl p-6"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {product.fullDescription}
                </p>
              </TabsContent>

              <TabsContent
                value="specifications"
                className="bg-card rounded-xl p-6"
              >
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <tr
                          key={key}
                          className={
                            index !== 0 ? "border-t border-border" : ""
                          }
                        >
                          <td className="py-3 font-medium text-foreground w-1/3">
                            {key}
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {value}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="reviews" className="bg-card rounded-xl p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <span className="font-semibold text-foreground">
                            JD
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">
                              John Doe
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              2 days ago
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">
                            Excellent product! Works exactly as described. Fast
                            delivery and great packaging. Highly recommend.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
