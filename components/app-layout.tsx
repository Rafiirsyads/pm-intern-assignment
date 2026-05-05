import { AppSidebar } from "./app-sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
