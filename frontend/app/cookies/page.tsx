import Link from "next/link"
import type { ReactNode } from "react"
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  Settings,
  Scale,
  Globe,
  AlertTriangle,
  Mail,
  FileText,
} from "lucide-react"
import HeaderLegal from "@/components/HeaderLegal"

export const metadata = {
  title: "Política de Cookies | OficiosPro",
  description:
    "Información sobre el uso de cookies en OficiosPro conforme a la Ley 81 de 2019 de Panamá.",
}

const sections = [
  "Qué son las cookies",
  "Tipos de cookies",
  "Base legal",
  "Cookies de terceros",
  "Gestionar cookies",
  "Derechos del usuario",
  "Actualizaciones",
  "Contacto",
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <HeaderLegal />

      <main className="max-w-6xl mx-auto px-6 py-14">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 md:p-12 mb-10 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <Cookie size={16} />
              Última actualización: enero 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Política de Cookies
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed">
              En OficiosPro utilizamos cookies y tecnologías similares para
              mejorar la navegación, mantener la seguridad y ofrecer una mejor
              experiencia dentro de la plataforma.
            </p>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <InfoBadge title="Ley 81 de 2019" text="Protección de Datos Personales" />
          <InfoBadge title="Decreto 285 de 2021" text="Reglamento de Datos Personales" />
          <InfoBadge title="Cookies necesarias" text="Funcionamiento básico y seguridad" />
          <InfoBadge title="Cookies opcionales" text="Preferencias, análisis y mejora del servicio" />
        </section>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">
                Contenido
              </p>

              <nav className="space-y-2">
                {sections.map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className="block text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl px-3 py-2 transition"
                  >
                    {index + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-6">
            <LegalCard
              id="section-1"
              icon={<Cookie />}
              title="1. ¿Qué son las cookies?"
            >
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu
                dispositivo cuando visitas un sitio web. Permiten recordar ciertas
                acciones, preferencias o información técnica para mejorar la
                experiencia del usuario.
              </p>

              <p>
                También pueden utilizarse tecnologías similares, como almacenamiento
                local, identificadores de sesión o herramientas de medición de uso.
              </p>
            </LegalCard>

            <LegalCard
              id="section-2"
              icon={<Settings />}
              title="2. Tipos de cookies que utilizamos"
            >
              <CookieType
                icon={<ShieldCheck />}
                title="Cookies estrictamente necesarias"
                text="Son indispensables para el funcionamiento básico de la plataforma. Permiten iniciar sesión, mantener la seguridad, recordar la sesión activa y proteger formularios o solicitudes."
                tags={["Sesión de usuario", "Autenticación", "Seguridad CSRF"]}
              />

              <CookieType
                icon={<BarChart3 />}
                title="Cookies de rendimiento y análisis"
                text="Permiten conocer de forma general cómo los usuarios interactúan con la plataforma, qué secciones se utilizan más y cómo podemos mejorar el servicio."
                tags={["Métricas de uso", "Estadísticas", "Mejoras del sitio"]}
              />

              <CookieType
                icon={<Settings />}
                title="Cookies de preferencias"
                text="Ayudan a recordar configuraciones seleccionadas por el usuario, como idioma, ubicación aproximada, opciones de visualización o preferencias de inicio de sesión."
                tags={["Preferencias", "Recordarme", "Configuración"]}
              />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-amber-800 mb-2">
                  Nota importante
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Las cookies necesarias permiten que la plataforma funcione
                  correctamente. Las cookies opcionales, como las de análisis o
                  preferencias, podrán depender del consentimiento del usuario
                  cuando corresponda.
                </p>
              </div>
            </LegalCard>

            <LegalCard
              id="section-3"
              icon={<Scale />}
              title="3. Base legal para el uso de cookies"
            >
              <p>
                El uso de cookies y tecnologías similares puede implicar el
                tratamiento de datos personales. Por ello, OficiosPro realiza
                dicho tratamiento conforme a la Ley 81 de 2019 sobre Protección
                de Datos Personales de la República de Panamá y el Decreto
                Ejecutivo 285 de 2021.
              </p>

              <ul className="space-y-3">
                {[
                  "Consentimiento del usuario para cookies opcionales o no esenciales.",
                  "Ejecución de la relación contractual o uso del servicio para cookies necesarias.",
                  "Interés legítimo de OficiosPro para mantener la seguridad y mejorar la plataforma.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalCard>

            <LegalCard
              id="section-4"
              icon={<Globe />}
              title="4. Cookies de terceros"
            >
              <p>
                Algunos servicios externos integrados en OficiosPro podrían
                utilizar sus propias cookies o tecnologías similares para análisis,
                seguridad, pagos, mapas, autenticación o mejora de experiencia.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <ThirdPartyCard
                  title="Herramientas de análisis"
                  text="Pueden utilizarse servicios como Google Analytics cuando sean implementados."
                />

                <ThirdPartyCard
                  title="Gestión de etiquetas"
                  text="Pueden utilizarse herramientas como Google Tag Manager si forman parte de la configuración del sitio."
                />

                <ThirdPartyCard
                  title="Servicios de pago"
                  text="Los proveedores de pago pueden usar cookies propias para seguridad y validación de transacciones."
                />

                <ThirdPartyCard
                  title="Servicios de seguridad"
                  text="Pueden emplearse tecnologías para prevenir fraude, abuso, bots o accesos no autorizados."
                />
              </div>
            </LegalCard>

            <LegalCard
              id="section-5"
              icon={<AlertTriangle />}
              title="5. Cómo gestionar o rechazar cookies"
            >
              <p>
                El usuario puede aceptar, rechazar o configurar el uso de cookies
                opcionales cuando la plataforma lo permita mediante un banner o
                panel de preferencias.
              </p>

              <div className="space-y-3">
                <InfoBox
                  color="amber"
                  title="Desde tu navegador"
                  text="Puedes bloquear, eliminar o configurar cookies desde las opciones de privacidad de tu navegador. Ten en cuenta que desactivar cookies necesarias puede afectar el funcionamiento de la plataforma."
                />

                <InfoBox
                  color="blue"
                  title="Desde la plataforma"
                  text="Cuando OficiosPro incorpore un panel de preferencias, podrás modificar tu consentimiento de cookies desde la propia plataforma."
                />
              </div>
            </LegalCard>

            <LegalCard
              id="section-6"
              icon={<ShieldCheck />}
              title="6. Tus derechos según la Ley 81"
            >
              <p>
                Conforme a la Ley 81 de 2019, los usuarios pueden ejercer derechos
                relacionados con sus datos personales tratados mediante cookies o
                tecnologías similares.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Acceso", desc: "Conocer qué datos personales se tratan." },
                  { title: "Rectificación", desc: "Corregir datos inexactos o incompletos." },
                  { title: "Cancelación", desc: "Solicitar la eliminación de datos cuando aplique." },
                  { title: "Oposición", desc: "Oponerse a ciertos tratamientos de datos." },
                  { title: "Portabilidad", desc: "Solicitar los datos en formato estructurado." },
                  { title: "Revocación", desc: "Retirar el consentimiento otorgado." },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                  >
                    <p className="font-black text-slate-900 text-sm">
                      {right.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {right.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p>
                Para ejercer estos derechos, puedes contactar a OficiosPro en{" "}
                <a
                  href="mailto:privacidad@oficios-pro.com"
                  className="text-blue-600 font-bold hover:underline"
                >
                  privacidad@oficios-pro.com
                </a>
                .
              </p>
            </LegalCard>

            <LegalCard
              id="section-7"
              icon={<FileText />}
              title="7. Actualizaciones a esta política"
            >
              <p>
                OficiosPro podrá actualizar esta Política de Cookies cuando sea
                necesario, especialmente por cambios legales, técnicos o por la
                incorporación de nuevas funcionalidades dentro de la plataforma.
              </p>

              <p>
                La fecha de última actualización se mostrará al inicio de esta
                página. Se recomienda revisar esta política periódicamente.
              </p>
            </LegalCard>

            <section
              id="section-8"
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black mb-2">
                    8. Contacto
                  </h2>

                  <p className="text-slate-300 mb-5 leading-relaxed">
                    Para consultas relacionadas con cookies, privacidad,
                    protección de datos o ejercicio de derechos, puedes
                    contactarnos al siguiente correo:
                  </p>

                  <a
                    href="mailto:privacidad@oficios-pro.com"
                    className="inline-flex items-center justify-center bg-white text-slate-900 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition"
                  >
                    privacidad@oficios-pro.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 px-6 mt-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 OficiosPro. República de Panamá.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/terminos-condiciones"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Términos y Condiciones
            </Link>

            <Link
              href="/aviso-legal"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Aviso Legal
            </Link>

            <Link
              href="/politica-privacidad"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LegalCard({
  id,
  title,
  icon,
  children,
}: {
  id: string
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition scroll-mt-24"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>

        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          {title}
        </h2>
      </div>

      <div className="space-y-4 text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function InfoBadge({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <p className="font-black text-blue-600 mb-1">{title}</p>
      <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
    </div>
  )
}

function CookieType({
  icon,
  title,
  text,
  tags,
}: {
  icon: ReactNode
  title: string
  text: string
  tags: string[]
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center border border-slate-200 flex-shrink-0">
          {icon}
        </div>

        <div>
          <h3 className="font-black text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {text}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ThirdPartyCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <p className="font-black text-slate-900 text-sm mb-2">{title}</p>
      <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
    </div>
  )
}

function InfoBox({
  title,
  text,
  color,
}: {
  title: string
  text: string
  color: "amber" | "blue"
}) {
  const styles =
    color === "amber"
      ? "bg-amber-50 border-amber-200 text-amber-700"
      : "bg-blue-50 border-blue-200 text-blue-700"

  const titleStyles =
    color === "amber" ? "text-amber-800" : "text-blue-800"

  return (
    <div className={`border rounded-2xl p-5 ${styles}`}>
      <p className={`font-bold text-sm mb-1 ${titleStyles}`}>{title}</p>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  )
}