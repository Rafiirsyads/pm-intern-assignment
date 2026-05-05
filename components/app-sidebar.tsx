"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Ticket,
  FileText,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/", icon: LayoutGrid },
  { label: "Ticket", href: "/tickets", icon: Ticket },
  { label: "Reports", href: "/reports", icon: FileText },
]

const bottomItems = [
  { label: "Account", href: "/account", icon: User },
  { label: "Logout", href: "/logout", icon: LogOut },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex flex-col w-56 min-h-screen border-r border-border bg-card">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-base tracking-tight">
            Paragon<span className="text-muted-foreground font-normal">Corp</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Menu</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-3 pb-6">
        <div className="border-t border-border pt-4 mb-2" />
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
