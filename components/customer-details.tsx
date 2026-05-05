import { Mail, Phone, Package } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Customer, Order } from "@/lib/data"
import { formatCurrency } from "@/lib/data"

interface CustomerDetailsProps {
  customer: Customer
  order: Order
}

export function CustomerDetails({ customer, order }: CustomerDetailsProps) {
  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-4">
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Customer</h2>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="size-10">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {customer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{customer.name}</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="size-4 shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="size-4 shrink-0" />
            <span>{customer.phone}</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Order</h2>
        </div>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-medium">{order.id}</span>
            <Badge variant="outline" className="gap-1.5 text-xs">
              <Package className="size-3" />
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <span className="text-sm truncate mr-2">{item.name}</span>
              <span className="text-sm font-medium shrink-0">{formatCurrency(item.price)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-secondary/50">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-semibold text-foreground">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
