import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ClimbProvider } from "@/lib/climb-context"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClimbProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </SidebarProvider>
        </ClimbProvider>
      </body>
    </html>
  )
}

