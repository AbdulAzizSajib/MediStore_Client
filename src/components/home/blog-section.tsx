import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "How to Stay Healthy During Flu Season",
    excerpt: "Essential tips and products to keep you and your family protected during the flu season.",
    image: "/images/blog/flu-season.jpg",
    date: "December 27, 2025",
    category: "Health Tips"
  },
  {
    id: 2,
    title: "The Importance of First Aid Kits at Home",
    excerpt: "Every household should have a well-stocked first aid kit. Learn what essentials to include.",
    image: "/images/blog/first-aid.jpg",
    date: "December 20, 2025",
    category: "Safety"
  },
  {
    id: 3,
    title: "Understanding Your Blood Pressure Monitor",
    excerpt: "A guide to using and understanding your home blood pressure monitoring device.",
    image: "/images/blog/blood-pressure.jpg",
    date: "December 15, 2025",
    category: "Medical Devices"
  }
]

export function BlogSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">From Our Blog</h2>
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
