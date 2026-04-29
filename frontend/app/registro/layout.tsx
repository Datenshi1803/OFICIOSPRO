import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crear Cuenta | OficiosPro Panamá",
  description: "Regístrate en OficiosPro como cliente o técnico de aire acondicionado en Panamá. Gratis y sin complicaciones.",
  keywords: [
    "registrarse OficiosPro",
    "crear cuenta técnico Panamá",
    "registro cliente aire acondicionado",
    "técnicos verificados Panamá",
    "plataforma servicios Panamá",
  ],
  openGraph: {
    title: "Crear Cuenta | OficiosPro Panamá",
    description: "Únete a OficiosPro. Publica trabajos o encuentra clientes como técnico de aire acondicionado en Panamá.",
    locale: "es_PA",
    type: "website",
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}