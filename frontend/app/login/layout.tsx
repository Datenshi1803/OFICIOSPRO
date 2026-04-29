import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar sesión | OficiosPro Panamá",
  description: "Inicia sesión en OficiosPro como cliente o técnico de aire acondicionado en Panamá. Gratis y sin complicaciones.",
  keywords: [
    "iniciar sesión OficiosPro",
    "acceder cuenta OficiosPro",
    "login técnico Panamá",
    "login cliente Panamá",
    "plataforma servicios Panamá",
  ],
  openGraph: {
    title: "Iniciar sesion | OficiosPro Panamá",
    description: "Accede a tu cuenta en OficiosPro y gestiona tus servicios de aire acondicionado en Panamá.",
    locale: "es_PA",
    type: "website",
  },
}

export default function LoginLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}