import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productService } from "@/src/services/product.service";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { ProductQuantitySelector } from "./product-quantity-selector";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const { data: product, error } = await productService.getProductById(id);

  if (error || !product) {
    notFound();
  }

  const price = parseFloat(product.price);

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
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.status === "AVAILABLE" && product.stock > 0 && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      In Stock
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category */}
                {product.category && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-primary">
                      [{product.category.name}]
                    </span>
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
                    ${price.toFixed(2)}
                  </span>
                </div>

                {/* Stock Info */}
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0
                    ? `${product.stock} items in stock`
                    : "Currently out of stock"}
                </p>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity & Add to Cart */}
                <ProductQuantitySelector
                  productId={product.id}
                  stock={product.stock}
                />

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
                  {product.description}
                </p>
              </TabsContent>

              <TabsContent
                value="specifications"
                className="bg-card rounded-xl p-6"
              >
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-3 font-medium text-foreground w-1/3">
                        Category
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {product.category?.name || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 font-medium text-foreground w-1/3">
                        Manufacturer
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {product.manufacturer || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 font-medium text-foreground w-1/3">
                        Status
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {product.status}
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 font-medium text-foreground w-1/3">
                        Stock
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {product.stock} units
                      </td>
                    </tr>
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
      </main>
    </div>
  );
}
