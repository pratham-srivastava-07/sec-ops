"use client"

const customers = [
  { name: "TechCorp", logo: "🏢" },
  { name: "DataFlow", logo: "📊" },
  { name: "CloudSync", logo: "☁️" },
  { name: "DevTools", logo: "🛠️" },
  { name: "SecureNet", logo: "🔒" },
  { name: "FastAPI", logo: "⚡" },
  { name: "ScaleUp", logo: "📈" },
  { name: "InnovateLab", logo: "🧪" },
]

export function CustomerLogosSection() {
  return (
    <section className="py-16 px-6 border-b">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-8">
            Trusted by innovative teams at leading companies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {customers.map((customer) => (
            <div
              key={customer.name}
              className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="text-3xl">{customer.logo}</div>
              <div className="text-sm font-medium text-muted-foreground">
                {customer.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
