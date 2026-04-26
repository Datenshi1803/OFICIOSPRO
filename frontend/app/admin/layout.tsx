import { ReactNode } from "react"
import { AdminOnly } from "@/components/protected-route"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminOnly>
      {children}
    </AdminOnly>
  )
}