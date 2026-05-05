export type TicketStatus = "new" | "in-progress" | "closed"
export type TicketPriority = "high" | "medium" | "low"
export type TicketCategory = "refund" | "payment" | "delivery" | "general"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface OrderItem {
  name: string
  price: number
}

export interface Order {
  id: string
  status: "delivered" | "shipped" | "pending"
  items: OrderItem[]
  total: number
}

export interface Message {
  id: string
  content: string
  timestamp: string
  isCustomer: boolean
  attachments?: string[]
}

export interface AIResolution {
  issueSummary: string
  detectedIntent: string
  confidence: number
  policyMatch: {
    eligible: boolean
    reasons: string[]
  }
  recommendedAction: string
  similarCases: number
  satisfactionRate: number
  appliedPolicy: {
    name: string
    description: string
  }
  photoEvidence?: string[]
  timeline: {
    delivery: string
    report: string
    withinWindow: boolean
  }
}

export interface PreSendIntelligence {
  hasIssues: boolean
  issuesCount: number
  issueMessage?: string
  missingInfo?: {
    title: string
    description: string
    suggestion: string
  }
  passedChecks: string[]
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  customer: Customer
  order: Order
  messages: Message[]
  aiSuggestion: string
  createdAt: string
  aiResolution?: AIResolution
}

export const tickets: Ticket[] = [
  {
    id: "TKT-0505-04",
    title: "Damaged item",
    description: "Customer received damaged product, requesting refund and timeline information",
    status: "new",
    priority: "high",
    category: "refund",
    customer: {
      id: "cust-1",
      name: "John Wells",
      email: "john.wells@gmail.com",
      phone: "+(62) 81231231",
    },
    order: {
      id: "ORD-101",
      status: "delivered",
      items: [
        { name: "Item #1", price: 1000000 },
        { name: "Item #2", price: 3000000 },
      ],
      total: 4000000,
    },
    messages: [
      {
        id: "msg-1",
        content: "I received my order and the item arrived completely damaged. The packaging was broken and the product is cracked. I've attached photos of the damage. I'd like a full refund please. Can you also tell me how long the refund will take to process?.",
        timestamp: "13:34",
        isCustomer: true,
        attachments: ["item_1.png", "item_2.png"],
      },
    ],
    aiSuggestion: "Approve Refund",
    createdAt: "1 Hour Ago",
    aiResolution: {
      issueSummary: "Customer received damaged product, requesting refund and timeline information",
      detectedIntent: "Refund Request",
      confidence: 96,
      policyMatch: {
        eligible: true,
        reasons: [
          "Damage reported within 3-day window",
          "Photo proof attached",
        ],
      },
      recommendedAction: "Approve full refund + send apology voucher for inconvenience",
      similarCases: 847,
      satisfactionRate: 94,
      appliedPolicy: {
        name: "Damaged Item Refund Policy v2.3",
        description: "Full refund authorized for shipping damage within 72 hours of delivery",
      },
      photoEvidence: ["/evidence-1.jpg", "/evidence-2.jpg"],
      timeline: {
        delivery: "May 4, 10:23 AM",
        report: "May 5, 8:47 AM",
        withinWindow: true,
      },
    },
  },
  {
    id: "TKT-0505-03",
    title: "Charged twice for one order",
    description: "Customer was charged twice for a single order",
    status: "new",
    priority: "high",
    category: "payment",
    customer: {
      id: "cust-2",
      name: "John Well",
      email: "john.well@gmail.com",
      phone: "+(62) 81231232",
    },
    order: {
      id: "ORD-102",
      status: "delivered",
      items: [{ name: "Item #1", price: 500000 }],
      total: 500000,
    },
    messages: [
      {
        id: "msg-2",
        content: "I was charged twice for my order. Please help me get a refund for the duplicate charge.",
        timestamp: "11:20",
        isCustomer: true,
      },
    ],
    aiSuggestion: "Forward to billing team",
    createdAt: "2 Hour Ago",
  },
  {
    id: "TKT-0505-02",
    title: "Package has not arrive after 1 week",
    description: "Customer's package is delayed",
    status: "in-progress",
    priority: "medium",
    category: "delivery",
    customer: {
      id: "cust-3",
      name: "John Well",
      email: "john.well@gmail.com",
      phone: "+(62) 81231233",
    },
    order: {
      id: "ORD-103",
      status: "shipped",
      items: [{ name: "Item #1", price: 750000 }],
      total: 750000,
    },
    messages: [
      {
        id: "msg-3",
        content: "My package was supposed to arrive a week ago but I still haven't received it.",
        timestamp: "09:15",
        isCustomer: true,
      },
    ],
    aiSuggestion: "Provide tracking status",
    createdAt: "5 Hour Ago",
  },
]

export const ticketStats = {
  all: 10,
  highPriority: 2,
  inProgress: 2,
  closed: 3,
}

export function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export function getTicketById(id: string): Ticket | undefined {
  return tickets.find((t) => t.id === id)
}
