import { Settings } from "lucide-react"
import ServicePageLayout from "@/components/ServicePageLayout"

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata = {
  title: "Reparación de Aire Acondicionado en Panamá | OficiosPro",
  description:
    "Técnicos especializados en reparación de aire acondicionado en Panamá. Diagnóstico de fallas, fugas de gas, tarjetas electrónicas y compresores. Cotización gratis.",
  keywords: [
    "reparación aire acondicionado Panamá",
    "reparar aire acondicionado Ciudad de Panamá",
    "técnico reparación aire acondicionado",
    "aire acondicionado no enfría Panamá",
    "fuga gas refrigerante Panamá",
    "compresor aire acondicionado Panamá",
    "reparación split Panamá",
  ],
  openGraph: {
    title: "Reparación de Aire Acondicionado en Panamá | OficiosPro",
    description:
      "Técnicos especializados en reparación de aires acondicionados en Panamá. Diagnóstico gratis y respuesta en menos de 1 hora.",
    url: "https://oficios-pro.com/servicios/reparacion",
    siteName: "OficiosPro",
    locale: "es_PA",
    type: "website",
  },
  alternates: {
    canonical: "https://oficios-pro.com/servicios/reparacion",
  },
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reparación de Aire Acondicionado en Panamá",
  description:
    "Servicio profesional de diagnóstico y reparación de equipos de aire acondicionado en la República de Panamá. Fallas eléctricas, fugas de gas, compresores y más.",
  provider: {
    "@type": "Organization",
    name: "OficiosPro",
    url: "https://oficios-pro.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Panamá",
  },
  serviceType: "Reparación de aire acondicionado",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "50",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "50",
      priceCurrency: "USD",
      description: "Precio base por diagnóstico y reparación de fallas menores",
    },
  },
}

export default function ReparacionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        icon={Settings}
        iconColor="bg-gradient-to-br from-slate-700 to-blue-700"
        hero={{
          badge: "✦ Diagnóstico y reparación certificada",
          title: "Reparación de Aire Acondicionado en",
          highlight: "Panamá",
          description:
            "¿Tu aire no enfría, hace ruidos o gotea? Conectamos contigo técnicos especializados en diagnóstico y reparación de equipos de aire acondicionado. Respuesta en menos de 1 hora.",
          cta: "Solicitar reparación gratis",
        }}
        price={{
          from: "$50 USD",
          note: "Precio base para fallas menores. Varía según diagnóstico y repuestos.",
        }}
        features={[
          {
            title: "No enfría correctamente",
            desc: "Diagnóstico de pérdida de capacidad de enfriamiento por falta de gas, filtros sucios o fallas del compresor.",
          },
          {
            title: "Fuga de gas refrigerante",
            desc: "Detección y reparación de fugas en líneas de cobre o conexiones, y recarga de gas R-410A o R-32.",
          },
          {
            title: "Fallas eléctricas",
            desc: "Reparación de tarjetas electrónicas, capacitores, sensores y protecciones del equipo.",
          },
          {
            title: "Compresor dañado",
            desc: "Diagnóstico y reemplazo de compresor para unidades que no arrancan o hacen ruidos anormales.",
          },
          {
            title: "Goteras y mal drenaje",
            desc: "Limpieza y reparación de sistemas de drenaje obstruidos que generan filtraciones de agua.",
          },
          {
            title: "Errores en el panel",
            desc: "Diagnóstico de códigos de error en sistemas inverter y centrales con herramientas especializadas.",
          },
        ]}
        process={[
          {
            step: "01",
            title: "Diagnóstico inicial",
            desc: "El técnico inspecciona el equipo para identificar la causa de la falla antes de cotizar la reparación.",
          },
          {
            step: "02",
            title: "Cotización de reparación",
            desc: "Se entrega un presupuesto claro con el costo de mano de obra y repuestos necesarios, sin sorpresas.",
          },
          {
            step: "03",
            title: "Reparación certificada",
            desc: "Con tu aprobación, el técnico realiza la reparación usando repuestos de calidad y herramientas especializadas.",
          },
          {
            step: "04",
            title: "Prueba de funcionamiento",
            desc: "Se verifica que el equipo opere correctamente durante 20-30 minutos antes de dar el trabajo por finalizado.",
          },
        ]}
        faqs={[
          {
            q: "¿Cuánto cuesta reparar un aire acondicionado en Panamá?",
            a: "El costo de reparación varía según la falla. Reparaciones menores (limpieza, sensor) parten desde $50 USD. Cambio de compresor puede costar entre $150-$300 USD según el modelo. El técnico ofrece diagnóstico antes de cotizar.",
          },
          {
            q: "¿Por qué mi aire acondicionado no enfría?",
            a: "Las causas más comunes son: falta de gas refrigerante, filtros sucios, compresor dañado o falla eléctrica. Un técnico puede diagnosticarlo en la primera visita.",
          },
          {
            q: "¿Cuánto tiempo dura la reparación?",
            a: "Fallas simples como recarga de gas o limpieza se resuelven en 1-2 horas. Reparaciones de tarjetas o compresores pueden tomar más tiempo dependiendo de la disponibilidad de repuestos.",
          },
          {
            q: "¿El diagnóstico tiene costo?",
            a: "Depende del técnico. Muchos incluyen el diagnóstico dentro del costo de la reparación. Esto se especifica claramente en la cotización que recibes.",
          },
          {
            q: "¿Reparan todas las marcas?",
            a: "Sí. Nuestros técnicos tienen experiencia con todas las marcas principales: LG, Samsung, Carrier, Daikin, Midea, Gree, Panasonic y más.",
          },
        ]}
        relatedServices={[
          {
            href: "/servicios/instalacion",
            label: "Instalación de Aire Acondicionado",
            desc: "Instalación de equipos nuevos",
          },
          {
            href: "/servicios/mantenimiento",
            label: "Mantenimiento Preventivo",
            desc: "Evita futuras reparaciones",
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