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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Customer Details</h2>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="size-10">
            <AvatarFallback className="bg-slate-200 text-slate-600">
              {customer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{customer.name}</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="size-4" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="size-4" />
            <span>{customer.phone}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Order</h2>
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-medium">{order.id}</span>
            <Badge variant="outline" className="gap-1.5">
              <Package className="size-3" />
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          <div className="divide-y">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">{formatCurrency(item.price)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-slate-50">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-semibold">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
