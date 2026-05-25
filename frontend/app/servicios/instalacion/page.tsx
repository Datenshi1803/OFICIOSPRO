import { Snowflake } from "lucide-react"
import ServicePageLayout from "@/components/ServicePageLayout"

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata = {
  title: "Instalación de Aire Acondicionado en Panamá | OficiosPro",
  description:
    "Técnicos certificados para instalación de aire acondicionado en Panamá. Split, inverter y sistemas centrales. Cotización gratis en menos de 1 hora. Garantía incluida.",
  keywords: [
    "instalación aire acondicionado Panamá",
    "instalar aire acondicionado Ciudad de Panamá",
    "técnico instalación aire acondicionado",
    "instalación split Panamá",
    "instalación inverter Panamá",
    "instalación aire acondicionado precio Panamá",
  ],
  openGraph: {
    title: "Instalación de Aire Acondicionado en Panamá | OficiosPro",
    description:
      "Técnicos certificados para instalación de aire acondicionado en toda Panamá. Cotización gratis en menos de 1 hora.",
    url: "https://oficios-pro.com/servicios/instalacion",
    siteName: "OficiosPro",
    locale: "es_PA",
    type: "website",
  },
  alternates: {
    canonical: "https://oficios-pro.com/servicios/instalacion",
  },
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Aire Acondicionado en Panamá",
  description:
    "Servicio profesional de instalación de equipos de aire acondicionado split, inverter y sistemas centrales en la República de Panamá.",
  provider: {
    "@type": "Organization",
    name: "OficiosPro",
    url: "https://oficios-pro.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Panamá",
  },
  serviceType: "Instalación de aire acondicionado",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "80",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "80",
      priceCurrency: "USD",
      description: "Precio base por instalación de equipo split residencial",
    },
  },
}

export default function InstalacionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        icon={Snowflake}
        iconColor="bg-gradient-to-br from-blue-600 to-cyan-500"
        hero={{
          badge: "✦ Instalación profesional certificada",
          title: "Instalación de Aire Acondicionado en",
          highlight: "Panamá",
          description:
            "Conectamos contigo técnicos certificados para instalar tu equipo de aire acondicionado split, inverter o sistema central. Garantía de trabajo incluida y respuesta en menos de 1 hora.",
          cta: "Solicitar instalación gratis",
        }}
        price={{
          from: "$80 USD",
          note: "Precio base para split residencial. Varía según equipo y zona.",
        }}
        features={[
          {
            title: "Instalación de split",
            desc: "Unidades split de pared para habitaciones y oficinas de todos los tamaños.",
          },
          {
            title: "Sistemas inverter",
            desc: "Instalación de equipos inverter de alta eficiencia energética que reducen tu factura eléctrica.",
          },
          {
            title: "Sistemas centrales",
            desc: "Instalación de sistemas centrales para casas grandes, locales comerciales y oficinas.",
          },
          {
            title: "Tendido de tuberías",
            desc: "Instalación de líneas de cobre, desagüe y cableado eléctrico según normativa panameña.",
          },
          {
            title: "Carga de refrigerante",
            desc: "Carga inicial de gas refrigerante (R-410A, R-32) calibrada según las especificaciones del equipo.",
          },
          {
            title: "Prueba y configuración",
            desc: "Prueba de funcionamiento completa y configuración del control remoto y modos de operación.",
          },
        ]}
        process={[
          {
            step: "01",
            title: "Inspección del sitio",
            desc: "El técnico evalúa el espacio, las distancias entre unidades y la disponibilidad eléctrica antes de iniciar.",
          },
          {
            step: "02",
            title: "Perforación y anclaje",
            desc: "Se perforan los orificios necesarios para el paso de tuberías y se anclan las unidades interior y exterior.",
          },
          {
            step: "03",
            title: "Conexión de tuberías",
            desc: "Se instalan y conectan las líneas de cobre, drenaje y cableado eléctrico de forma segura.",
          },
          {
            step: "04",
            title: "Carga de gas y prueba",
            desc: "Se carga el refrigerante, se enciende el equipo y se verifica su correcto funcionamiento durante 15-20 minutos.",
          },
        ]}
        faqs={[
          {
            q: "¿Cuánto cuesta instalar un aire acondicionado en Panamá?",
            a: "El precio de instalación de un split residencial en Panamá parte desde $80 USD. El costo varía según el tipo de equipo (split, inverter, central), la distancia entre unidades y la zona. Solicita tu cotización gratis para un precio exacto.",
          },
          {
            q: "¿Cuánto tiempo tarda la instalación?",
            a: "Una instalación estándar de equipo split toma entre 3 y 5 horas. Sistemas más complejos o centrales pueden requerir un día completo.",
          },
          {
            q: "¿El precio incluye el equipo de aire acondicionado?",
            a: "No. El servicio cubre la mano de obra de instalación. El equipo puede ser tuyo o puedes solicitarle al técnico que te ayude a conseguirlo.",
          },
          {
            q: "¿Qué garantía ofrece la instalación?",
            a: "Los técnicos de OficiosPro ofrecen garantía sobre su trabajo de instalación. El período varía por técnico y se especifica en la cotización.",
          },
          {
            q: "¿Instalan en toda Panamá?",
            a: "Sí. Tenemos técnicos en Ciudad de Panamá, Panamá Oeste, Colón, Chiriquí, Azuero y otras provincias.",
          },
        ]}
        relatedServices={[
          {
            href: "/servicios/reparacion",
            label: "Reparación de Aire Acondicionado",
            desc: "Diagnóstico y reparación de fallas",
          },
          {
            href: "/servicios/mantenimiento",
            label: "Mantenimiento Preventivo",
            desc: "Limpieza y revisión periódica",
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