import Link from "next/link"
import type { ReactNode } from "react"
import {
  ShieldCheck,
  UserCheck,
  Database,
  FileText,
  Scale,
  Lock,
  Share2,
  Cloud,
  Baby,
  Mail,
  RefreshCcw,
  Building2,
  Eye,
} from "lucide-react"
import HeaderLegal from "@/components/HeaderLegal"

export const metadata = {
  title: "Política de Privacidad | OficiosPro",
  description:
    "Política de privacidad de OficiosPro conforme a la Ley 81 de 2019 sobre Protección de Datos Personales de Panamá.",
}

const sections = [
  "Responsable del tratamiento",
  "Datos que recopilamos",
  "Finalidad del tratamiento",
  "Base legal",
  "Conservación de datos",
  "Compartición de datos",
  "Turnstile",
  "Seguridad",
  "Derechos ARCOP",
  "Menores de edad",
  "Cambios",
  "Autoridad de control",
  "Contacto",
]

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <HeaderLegal />

      <main className="max-w-6xl mx-auto px-6 py-14">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 md:p-12 mb-10 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <ShieldCheck size={16} />
              Última actualización: enero 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Política de Privacidad
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed">
              En OficiosPro protegemos tu información personal y explicamos de
              forma clara qué datos recopilamos, para qué los usamos y cuáles son
              tus derechos según la legislación panameña.
            </p>
          </div>
        </section>

        {/* BADGES */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <InfoBadge title="Ley 81 de 2019" text="Protección de Datos Personales" />
          <InfoBadge title="Decreto 285 de 2021" text="Reglamento de protección de datos" />
          <InfoBadge title="Derechos ARCOP" text="Acceso, rectificación, cancelación, oposición y portabilidad" />
          <InfoBadge title="Seguridad" text="Protección técnica y organizativa de la información" />
        </section>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* ÍNDICE */}
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

          {/* CONTENIDO */}
          <div className="space-y-6">
            <LegalCard
              id="section-1"
              icon={<Building2 />}
              title="1. Responsable del tratamiento"
            >
              <p>
                OficiosPro actúa como responsable del tratamiento de los datos
                personales recopilados a través de la plataforma.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <DataItem label="Titular" value="OficiosPro" />
                <DataItem label="País" value="República de Panamá" />
                <DataItem label="Domicilio" value="Ciudad de Panamá, Panamá" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    Contacto de privacidad
                  </p>
                  <a
                    href="mailto:privacidad@oficios-pro.com"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    privacidad@oficios-pro.com
                  </a>
                </div>
              </div>
            </LegalCard>

            <LegalCard
              id="section-2"
              icon={<Database />}
              title="2. Datos que recopilamos"
            >
              <p>
                Recopilamos datos personales según el tipo de usuario y el uso
                que haga de la plataforma.
              </p>

              <DataGroup
                title="Todos los usuarios"
                color="blue"
                items={[
                  "Nombre completo",
                  "Correo electrónico",
                  "Contraseña cifrada",
                  "Número de teléfono",
                  "Provincia, distrito o corregimiento",
                  "Dirección IP",
                  "Datos de navegación",
                ]}
              />

              <DataGroup
                title="Técnicos"
                color="emerald"
                items={[
                  "Número de cédula",
                  "Especialidad técnica",
                  "Años de experiencia",
                  "Descripción profesional",
                  "Tarifa por hora",
                  "Historial de cotizaciones",
                  "Calificaciones recibidas",
                ]}
              />

            </LegalCard>

            <LegalCard
              id="section-3"
              icon={<FileText />}
              title="3. Finalidad del tratamiento"
            >
              <p>
                Tratamos los datos personales para permitir el funcionamiento de
                OficiosPro y mejorar la experiencia de clientes y técnicos.
              </p>

              <div className="space-y-3">
                {[
                  {
                    num: "01",
                    title: "Gestión de la cuenta",
                    desc: "Registro, autenticación y administración del perfil del usuario.",
                  },
                  {
                    num: "02",
                    title: "Prestación del servicio",
                    desc: "Conectar clientes con técnicos y gestionar solicitudes, cotizaciones y trabajos.",
                  },
                  {
                    num: "03",
                    title: "Comunicaciones",
                    desc: "Enviar notificaciones relacionadas con solicitudes, cotizaciones, pagos o cambios importantes.",
                  },
                  {
                    num: "04",
                    title: "Pagos y créditos",
                    desc: "Procesar compras, créditos, transacciones e historial de pagos dentro de la plataforma.",
                  },
                  {
                    num: "05",
                    title: "Mejora del servicio",
                    desc: "Analizar el uso de la plataforma para mejorar funciones, seguridad y experiencia.",
                  },
                  {
                    num: "06",
                    title: "Cumplimiento legal",
                    desc: "Atender obligaciones legales o requerimientos de autoridades competentes.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="flex gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200"
                  >
                    <span className="text-blue-600 font-black text-sm flex-shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </LegalCard>

            <LegalCard
              id="section-4"
              icon={<Scale />}
              title="4. Base legal del tratamiento"
            >
              <p>
                El tratamiento de los datos personales se realiza conforme a la
                Ley 81 de 2019 sobre Protección de Datos Personales de Panamá y
                su reglamento, el Decreto Ejecutivo 285 de 2021.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <MiniCard
                  title="Consentimiento"
                  text="Para comunicaciones, cookies no esenciales o tratamientos que lo requieran."
                />
                <MiniCard
                  title="Ejecución contractual"
                  text="Para prestar los servicios solicitados dentro de la plataforma."
                />
                <MiniCard
                  title="Interés legítimo"
                  text="Para seguridad, prevención de fraude y mejora del servicio."
                />
                <MiniCard
                  title="Obligación legal"
                  text="Para cumplir con requerimientos de autoridades competentes."
                />
              </div>
            </LegalCard>

            <LegalCard
              id="section-5"
              icon={<RefreshCcw />}
              title="5. Conservación de los datos"
            >
              <p>
                Conservamos los datos personales durante el tiempo necesario para
                cumplir las finalidades descritas en esta política, mientras la
                cuenta permanezca activa o mientras existan obligaciones legales
                aplicables.
              </p>

              <p>
                Cuando la cuenta sea cancelada, algunos datos podrán conservarse
                por el tiempo necesario para atender responsabilidades legales,
                contables, contractuales o de seguridad.
              </p>

              <p>
                Los datos anonimizados o estadísticos podrán conservarse por más
                tiempo, siempre que no permitan identificar directamente al
                usuario.
              </p>
            </LegalCard>

            <LegalCard
              id="section-6"
              icon={<Share2 />}
              title="6. Compartición de datos con terceros"
            >
              <p>
                OficiosPro no vende datos personales a terceros. Solo compartimos
                información cuando sea necesario para prestar el servicio,
                cumplir obligaciones legales o proteger la seguridad de la
                plataforma.
              </p>

              <ul className="space-y-3">
                {[
                  "Entre clientes y técnicos, únicamente la información necesaria para coordinar el servicio.",
                  "Con proveedores tecnológicos, hosting, servicios de seguridad o procesadores de pago.",
                  "Con autoridades competentes cuando exista requerimiento legal o mandato judicial.",
                  "Con herramientas de análisis o monitoreo cuando estén implementadas y conforme a la política aplicable.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalCard>

            <LegalCard
              id="section-7"
              icon={<Cloud />}
              title="7. Verificación de seguridad con Turnstile"
            >
              <p>
                Para proteger formularios contra bots, spam o uso automatizado,
                OficiosPro puede utilizar Cloudflare Turnstile, una herramienta
                de verificación de seguridad.
              </p>

              <p>
                Turnstile puede procesar información técnica del dispositivo,
                navegador, sesión e interacción del usuario con la finalidad de
                comprobar que el acceso corresponde a una persona real y no a un
                sistema automatizado.
              </p>

              <p>
                Puedes consultar más información directamente en la documentación
                y políticas de privacidad de Cloudflare.
              </p>
            </LegalCard>

            <LegalCard
              id="section-8"
              icon={<Lock />}
              title="8. Seguridad de los datos"
            >
              <p>
                Implementamos medidas técnicas y organizativas razonables para
                proteger los datos personales contra accesos no autorizados,
                pérdida, alteración, uso indebido o divulgación no autorizada.
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <MiniCard
                  title="Cifrado"
                  text="Contraseñas protegidas y comunicaciones seguras cuando aplique."
                />
                <MiniCard
                  title="Acceso restringido"
                  text="Acceso limitado únicamente a personal o sistemas autorizados."
                />
                <MiniCard
                  title="Tokens seguros"
                  text="Uso de mecanismos de autenticación para proteger sesiones."
                />
              </div>
            </LegalCard>

            <LegalCard
              id="section-9"
              icon={<UserCheck />}
              title="9. Tus derechos ARCOP"
            >
              <p>
                Conforme a la Ley 81 de 2019, los usuarios pueden ejercer sus
                derechos sobre los datos personales tratados por OficiosPro.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    letter: "A",
                    title: "Acceso",
                    text: "Conocer qué datos personales tratamos y con qué finalidad.",
                  },
                  {
                    letter: "R",
                    title: "Rectificación",
                    text: "Solicitar la corrección de datos inexactos o incompletos.",
                  },
                  {
                    letter: "C",
                    title: "Cancelación",
                    text: "Pedir la eliminación de datos cuando corresponda legalmente.",
                  },
                  {
                    letter: "O",
                    title: "Oposición",
                    text: "Oponerse a ciertos tratamientos de datos personales.",
                  },
                  {
                    letter: "P",
                    title: "Portabilidad",
                    text: "Solicitar los datos en formato estructurado cuando aplique.",
                  },
                  {
                    letter: "+",
                    title: "Revocación",
                    text: "Retirar el consentimiento otorgado sin efecto retroactivo.",
                  },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="flex gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200"
                  >
                    <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                      {right.letter}
                    </span>

                    <div>
                      <p className="font-black text-slate-900 text-sm">
                        {right.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {right.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  Para ejercer cualquiera de estos derechos, envía un correo a{" "}
                  <a
                    href="mailto:privacidad@oficios-pro.com"
                    className="font-bold hover:underline"
                  >
                    privacidad@oficios-pro.com
                  </a>{" "}
                  indicando tu nombre, correo de registro y el derecho que deseas
                  ejercer.
                </p>
              </div>
            </LegalCard>

            <LegalCard
              id="section-10"
              icon={<Baby />}
              title="10. Menores de edad"
            >
              <p>
                OficiosPro no está dirigida a menores de 18 años. No recopilamos
                conscientemente datos personales de menores.
              </p>

              <p>
                Si detectamos que un menor se ha registrado en la plataforma,
                podremos eliminar la cuenta y los datos asociados. Si eres padre,
                madre o tutor y consideras que un menor ha proporcionado datos,
                puedes contactarnos para revisar el caso.
              </p>
            </LegalCard>

            <LegalCard
              id="section-11"
              icon={<FileText />}
              title="11. Cambios en esta política"
            >
              <p>
                OficiosPro podrá actualizar esta Política de Privacidad cuando
                sea necesario por cambios legales, técnicos, operativos o por la
                incorporación de nuevas funcionalidades.
              </p>

              <p>
                La fecha de última actualización se mostrará al inicio de esta
                página. Se recomienda revisar esta política periódicamente.
              </p>
            </LegalCard>

            <LegalCard
              id="section-12"
              icon={<Scale />}
              title="12. Autoridad de control"
            >
              <p>
                Si consideras que el tratamiento de tus datos personales no se
                realiza conforme a la Ley 81 de 2019, puedes presentar una
                reclamación ante la Autoridad Nacional de Transparencia y Acceso
                a la Información, autoridad competente en materia de protección
                de datos personales en Panamá.
              </p>
            </LegalCard>

            <section
              id="section-13"
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg scroll-mt-24"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black mb-2">
                    13. Contacto de privacidad
                  </h2>

                  <p className="text-slate-300 mb-5 leading-relaxed">
                    Para consultas sobre privacidad, tratamiento de datos,
                    cookies o ejercicio de derechos, puedes escribirnos al
                    siguiente correo:
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
              href="/cookies"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Cookies
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

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
        {label}
      </p>
      <p className="font-bold text-slate-800">{value}</p>
    </div>
  )
}

function DataGroup({
  title,
  items,
  color,
}: {
  title: string
  items: string[]
  color: "blue" | "emerald" | "violet"
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-800",
    emerald: "bg-emerald-50 text-emerald-800",
    violet: "bg-violet-50 text-violet-800",
  }

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <div className={`${colorClasses[color]} px-5 py-3 border-b border-slate-200`}>
        <p className="font-black text-sm">{title}</p>
      </div>

      <div className="p-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
      <p className="font-black text-slate-900 text-sm">{title}</p>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{text}</p>
    </div>
  )
}