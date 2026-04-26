import { ReactNode } from "react"
import { ClientOnly } from "@/components/protected-route"

export default function ClienteLayout({ children }: { children: ReactNode }) {
  return (
    <ClientOnly>
      {children}
    </ClientOnly>
  )
}