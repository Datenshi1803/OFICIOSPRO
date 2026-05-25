import { Fan } from "lucide-react"
import ServicePageLayout from "@/components/ServicePageLayout"

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata = {
  title: "Mantenimiento de Aire Acondicionado en Panamá | OficiosPro",
  description:
    "Servicio de mantenimiento preventivo de aire acondicionado en Panamá. Limpieza profunda, revisión de gas y filtros. Ahorra hasta 30% en electricidad. Cotización gratis.",
  keywords: [
    "mantenimiento aire acondicionado Panamá",
    "limpieza aire acondicionado Panamá",
    "mantenimiento preventivo aire acondicionado",
    "limpieza split Panamá",
    "técnico mantenimiento aire acondicionado Ciudad de Panamá",
    "mantenimiento aire acondicionado precio Panamá",
    "cada cuánto limpiar aire acondicionado",
  ],
  openGraph: {
    title: "Mantenimiento de Aire Acondicionado en Panamá | OficiosPro",
    description:
      "Mantenimiento preventivo de aire acondicionado en Panamá. Limpieza profunda y revisión completa. Ahorra en electricidad y evita fallas costosas.",
    url: "https://oficios-pro.com/servicios/mantenimiento",
    siteName: "OficiosPro",
    locale: "es_PA",
    type: "website",
  },
  alternates: {
    canonical: "https://oficios-pro.com/servicios/mantenimiento",
  },
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mantenimiento de Aire Acondicionado en Panamá",
  description:
    "Servicio de mantenimiento preventivo y limpieza profunda de equipos de aire acondicionado en la República de Panamá. Mejora el rendimiento y reduce el consumo eléctrico.",
  provider: {
    "@type": "Organization",
    name: "OficiosPro",
    url: "https://oficios-pro.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Panamá",
  },
  serviceType: "Mantenimiento de aire acondicionado",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "40",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "40",
      priceCurrency: "USD",
      description: "Precio base por mantenimiento de equipo split residencial",
    },
  },
}

export default function MantenimientoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        icon={Fan}
        iconColor="bg-gradient-to-br from-cyan-500 to-emerald-500"
        hero={{
          badge: "✦ Mantenimiento preventivo certificado",
          title: "Mantenimiento de Aire Acondicionado en",
          highlight: "Panamá",
          description:
            "El mantenimiento regular de tu aire acondicionado puede reducir tu consumo eléctrico hasta un 30% y extender la vida útil del equipo varios años. Técnicos verificados en toda Panamá.",
          cta: "Solicitar mantenimiento gratis",
        }}
        price={{
          from: "$40 USD",
          note: "Precio base para un equipo split residencial. Descuentos por varios equipos.",
        }}
        features={[
          {
            title: "Limpieza de filtros",
            desc: "Desmontaje y limpieza profunda de filtros internos que acumulan polvo y reducen el rendimiento.",
          },
          {
            title: "Limpieza del evaporador",
            desc: "Lavado del serpentín evaporador con productos especializados para eliminar hongos y bacterias.",
          },
          {
            title: "Limpieza del condensador",
            desc: "Lavado a presión de la unidad exterior para mejorar la disipación de calor.",
          },
          {
            title: "Revisión del nivel de gas",
            desc: "Verificación del nivel de refrigerante y detección de posibles fugas antes de que generen daños mayores.",
          },
          {
            title: "Revisión eléctrica",
            desc: "Inspección de capacitores, conexiones y protecciones eléctricas para prevenir fallas imprevistas.",
          },
          {
            title: "Revisión del drenaje",
            desc: "Limpieza y verificación del sistema de drenaje para prevenir goteras y humedad.",
          },
        ]}
        process={[
          {
            step: "01",
            title: "Apagado seguro del equipo",
            desc: "El técnico apaga y desconecta el equipo de forma segura antes de iniciar el trabajo.",
          },
          {
            step: "02",
            title: "Desmontaje de filtros y carcasa",
            desc: "Se retiran los filtros y la cubierta interior para acceder al evaporador y componentes internos.",
          },
          {
            step: "03",
            title: "Limpieza profunda",
            desc: "Lavado del evaporador, condensador y bandejas de drenaje con productos especializados antibacteriales.",
          },
          {
            step: "04",
            title: "Revisión general y prueba",
            desc: "Verificación de presiones de gas, conexiones eléctricas y prueba de funcionamiento para confirmar la mejora.",
          },
        ]}
        faqs={[
          {
            q: "¿Cada cuánto tiempo debo hacer mantenimiento al aire acondicionado?",
            a: "En Panamá, con el clima tropical y el polvo, se recomienda mantenimiento cada 3-4 meses para equipos de uso frecuente. Si el equipo se usa ocasionalmente, puede ser suficiente cada 6 meses.",
          },
          {
            q: "¿Cuánto cuesta el mantenimiento de un aire acondicionado en Panamá?",
            a: "El mantenimiento básico de un equipo split residencial parte desde $40 USD. Algunos técnicos ofrecen paquetes con descuento para mantenimientos periódicos o múltiples equipos.",
          },
          {
            q: "¿Cuánto tarda un mantenimiento?",
            a: "El mantenimiento completo de un equipo split toma entre 1 y 2 horas. Sistemas centrales pueden requerir más tiempo.",
          },
          {
            q: "¿El mantenimiento realmente reduce la factura eléctrica?",
            a: "Sí. Un equipo con filtros y serpentines sucios puede consumir hasta 30% más de electricidad para enfriar el mismo espacio. La limpieza regular restaura la eficiencia original del equipo.",
          },
          {
            q: "¿Qué señales indican que mi equipo necesita mantenimiento?",
            a: "Señales comunes: el aire no enfría como antes, el equipo hace ruidos inusuales, hay malos olores al encenderlo, gotea agua o la factura eléctrica ha subido sin razón aparente.",
          },
        ]}
        relatedServices={[
          {
            href: "/servicios/instalacion",
            label: "Instalación de Aire Acondicionado",
            desc: "Instalación de equipos nuevos",
          },
          {
            href: "/servicios/reparacion",
            label: "Reparación de Aire Acondicionado",
            desc: "Diagnóstico y reparación de fallas",
          },
          {
            href: "/como-funciona",
            label: "Cómo funciona OficiosPro",
            desc: "Conoce nuestra plataforma",
          },
        ]}
      />
    </>
  )
}