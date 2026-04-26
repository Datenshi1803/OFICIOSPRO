import { ReactNode } from "react"
import { TechnicianOnly } from "@/components/protected-route"

export default function TechnicianLayout({ children }: { children: ReactNode }) {
  return (
    <TechnicianOnly>
      {children}
    </TechnicianOnly>
  )
}