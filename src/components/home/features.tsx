import { CreditCard, Truck, Headphones, Percent } from "lucide-react"

const features = [
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "All Cards Accepted"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On All Orders"
  },
  {
    icon: Headphones,
    title: "Online Support",
    description: "Technical 24/7"
  },
  {
    icon: Percent,
    title: "Big Savings",
    description: "Weekend Sales"
  }
]

export function Features() {
  return (
    <section className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="p-3 bg-primary/10 rounded-full">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
