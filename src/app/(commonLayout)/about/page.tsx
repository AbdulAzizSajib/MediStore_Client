import Image from "next/image";
import Link from "next/link";
import { Features } from "@/src/components/home/features";
import { Button } from "@/src/components/ui/button";
import {
  ChevronRight,
  CheckCircle,
  Users,
  Award,
  Clock,
  Heart,
} from "lucide-react";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Available" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We prioritize our customers health and well-being above everything else.",
  },
  {
    icon: Award,
    title: "Quality Products",
    description:
      "We source only the highest quality medical supplies and healthcare products.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery to ensure you get your products when you need them.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our team of healthcare professionals is always ready to assist you.",
  },
];

const team = [
  {
    name: "Dr. Robert Wilson",
    role: "Chief Pharmacist",
    image: "/images/team-1.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    image: "/images/team-2.jpg",
  },
  {
    name: "Dr. Emily Chen",
    role: "Healthcare Advisor",
    image: "/images/team-3.jpg",
  },
];

export default function AboutPage() {
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
              <span className="text-foreground">About Us</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium mb-2 block">
                  About MediCare
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
                  Your Trusted Partner in Healthcare
                </h1>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Since 2010, MediCare has been dedicated to providing
                  high-quality medical supplies and healthcare products to
                  families across the nation. We believe everyone deserves
                  access to reliable healthcare products at affordable prices.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our mission is to make healthcare accessible and convenient
                  for everyone. With our extensive range of products and expert
                  team, we ensure that you and your loved ones have everything
                  you need to stay healthy and safe.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about-hero.jpg"
                    alt="MediCare Pharmacy"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium mb-2 block">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Sets Us Apart
              </h2>
              <p className="text-muted-foreground">
                We are committed to excellence in everything we do, from product
                quality to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-primary font-medium mb-2 block">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Built on Trust & Care
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  MediCare was founded with a simple vision: to make quality
                  healthcare products accessible to everyone. What started as a
                  small family pharmacy has grown into a trusted online
                  destination for medical supplies.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Over the years, we have expanded our product range, improved
                  our services, and built lasting relationships with our
                  customers. Today, we serve thousands of families, helping them
                  maintain their health and well-being.
                </p>
                <ul className="space-y-3">
                  {[
                    "FDA-approved products only",
                    "Licensed pharmacists on staff",
                    "Secure and encrypted transactions",
                    "Fast nationwide delivery",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src="/images/products/hand-gel.jpg"
                      alt="Healthcare products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8">
                    <Image
                      src="/images/products/mask.jpg"
                      alt="Medical supplies"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium mb-2 block">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the Experts
              </h2>
              <p className="text-muted-foreground">
                Our dedicated team of healthcare professionals is committed to
                providing you with the best service and advice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Browse our extensive collection of medical supplies and healthcare
              products. Quality products, competitive prices, and exceptional
              service await you.
            </p>
            <Link href="/shop">
              <Button size="lg" variant="secondary" className="font-semibold">
                Start Shopping
              </Button>
            </Link>
          </div>
        </section>

        <Features />
      </main>
    </div>
  );
}
