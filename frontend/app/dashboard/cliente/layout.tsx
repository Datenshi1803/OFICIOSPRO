import { ReactNode } from "react"
import { ClientOnly } from "@/components/protected-route"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Cliente | OficiosPro Panamá",
  description: "Gestiona tus solicitudes de servicio, revisa cotizaciones y encuentra técnicos de aire acondicionado verificados en Panamá.",
  keywords: [
    "panel cliente OficiosPro",
    "publicar trabajo aire acondicionado Panamá",
    "solicitar técnico Panamá",
    "gestionar cotizaciones Panamá",
    "servicios aire acondicionado Panamá",
  ],
  openGraph: {
    title: "Panel de Cliente | OficiosPro Panamá",
    description: "Publica trabajos, recibe cotizaciones y contrata técnicos de aire acondicionado verificados en Panamá.",
    locale: "es_PA",
    type: "website",
  },
}

export default function ClienteLayout({ children }: { children: ReactNode }) {
  return (
    <ClientOnly>
      {children}
    </ClientOnly>
  )
}