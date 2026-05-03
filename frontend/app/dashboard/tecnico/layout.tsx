import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Técnico | OficiosPro Panamá",
  description: "Gestiona tus trabajos, cotizaciones y ganancias como técnico de aire acondicionado verificado en OficiosPro Panamá.",
  keywords: [
    "panel técnico OficiosPro",
    "gestionar cotizaciones técnico Panamá",
    "trabajos aire acondicionado Panamá",
    "técnico verificado OficiosPro",
    "ganancias técnico Panamá",
  ],
  openGraph: {
    title: "Panel de Técnico | OficiosPro Panamá",
    description: "Encuentra trabajos disponibles, envía cotizaciones y gestiona tus servicios de aire acondicionado en Panamá.",
    locale: "es_PA",
    type: "website",
  },
}

import { TechnicianOnly } from "@/components/protected-route"

export default function TecnicoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TechnicianOnly>{children}</TechnicianOnly>
}