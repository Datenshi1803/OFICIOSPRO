import Link from "next/link"
import type { ReactNode } from "react"
import {
  Scale,
  Building2,
  Wrench,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CreditCard,
  Mail,
  Globe,
} from "lucide-react"
import HeaderLegal from "@/components/HeaderLegal"

export const metadata = {
  title: "Aviso Legal | OficiosPro",
  description:
    "Aviso legal de OficiosPro conforme a la legislación vigente de la República de Panamá.",
}

const sections = [
  "Datos identificativos",
  "Objeto y actividad",
  "Condiciones de uso",
  "Propiedad intelectual",
  "Responsabilidad",
  "Protección de datos",
  "Comercio electrónico",
  "Legislación aplicable",
  "Modificaciones",
  "Contacto",
]

export default function AvisoLegalPage() {
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
              <Scale size={16} />
              Última actualización: enero 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Aviso Legal
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed">
              Información legal, responsabilidades, condiciones de uso y normativa
              aplicable para los usuarios de OficiosPro en la República de Panamá.
            </p>
          </div>
        </section>

        {/* LEYES DESTACADAS */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <InfoBadge title="Ley 81 de 2019" text="Protección de Datos Personales" />
          <InfoBadge title="Decreto 285 de 2021" text="Reglamento de Datos Personales" />
          <InfoBadge title="Ley 51 de 2008" text="Comercio y firma electrónica" />
          <InfoBadge title="Código de Comercio" text="Normativa comercial aplicable" />
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
              title="1. Datos identificativos del titular"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <DataItem label="Denominación" value="OficiosPro" />
                <DataItem label="País" value="República de Panamá" />
                <DataItem label="Domicilio" value="Ciudad de Panamá, Panamá" />
                <DataItem label="Sitio web" value="Sitio web oficial de OficiosPro" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    Contacto
                  </p>
                  <a
                    href="mailto:legal@oficios-pro.com"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    legal@oficios-pro.com
                  </a>
                </div>
              </div>
            </LegalCard>

            <LegalCard
              id="section-2"
              icon={<Wrench />}
              title="2. Objeto y actividad"
            >
              <p>
                OficiosPro es una plataforma digital que conecta a clientes con
                técnicos especializados en instalación, mantenimiento y reparación
                de equipos de aire acondicionado en la República de Panamá.
              </p>
              <p>
                OficiosPro actúa como intermediario tecnológico y no es parte
                directa en los contratos de servicio celebrados entre clientes y
                técnicos independientes.
              </p>
            </LegalCard>

            <LegalCard
              id="section-3"
              icon={<FileText />}
              title="3. Condiciones de uso"
            >
              <p>
                El acceso y uso de esta plataforma implica la aceptación de las
                presentes condiciones. El usuario se compromete a:
              </p>

              <ul className="space-y-3">
                {[
                  "Hacer un uso lícito de la plataforma conforme a la legislación panameña vigente.",
                  "No realizar actividades fraudulentas, engañosas o que perjudiquen a terceros.",
                  "No publicar contenido ilegal, ofensivo, discriminatorio o que vulnere derechos de terceros.",
                  "Proporcionar información veraz al momento de registro y durante el uso de la plataforma.",
                  "No intentar acceder de forma no autorizada a sistemas o datos de otros usuarios.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalCard>

            <LegalCard
              id="section-4"
              icon={<Globe />}
              title="4. Propiedad intelectual e industrial"
            >
              <p>
                Todos los contenidos de la plataforma, incluyendo textos,
                imágenes, logotipos, diseño gráfico, código fuente e interfaces,
                son titularidad de OficiosPro o de sus licenciantes.
              </p>
              <p>
                Dichos contenidos se encuentran protegidos por las normas
                aplicables de propiedad intelectual e industrial de la República
                de Panamá.
              </p>
              <p>
                Queda prohibida la reproducción, distribución, transformación o
                comunicación pública total o parcial de los contenidos sin
                autorización escrita previa de OficiosPro.
              </p>
            </LegalCard>

            <LegalCard
              id="section-5"
              icon={<AlertTriangle />}
              title="5. Responsabilidad"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-amber-800 mb-2">
                  Rol de intermediario tecnológico
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  OficiosPro facilita el contacto entre clientes y técnicos,
                  pero no garantiza la calidad, idoneidad ni resultado final de
                  los servicios realizados por profesionales independientes.
                </p>
              </div>

              <p>
                OficiosPro no será responsable por daños o perjuicios derivados
                de interrupciones del servicio, errores técnicos, accesos no
                autorizados, fallas de terceros o uso indebido de la plataforma.
              </p>

              <p>
                La plataforma podrá suspender temporalmente sus servicios por
                mantenimiento, actualizaciones, fallas técnicas o causas de fuerza
                mayor.
              </p>

              <p>
                OficiosPro puede contener enlaces a sitios de terceros. La
                plataforma no controla ni se responsabiliza por el contenido,
                políticas o prácticas de dichos sitios externos.
              </p>
            </LegalCard>

            <LegalCard
              id="section-6"
              icon={<ShieldCheck />}
              title="6. Protección de datos personales"
            >
              <p>
                El tratamiento de los datos personales de los usuarios se realiza
                conforme a la Ley 81 de 26 de marzo de 2019 sobre Protección de
                Datos Personales de la República de Panamá y su reglamento, el
                Decreto Ejecutivo 285 de 2021.
              </p>

              <p>
                OficiosPro actúa como responsable del tratamiento de los datos
                personales recabados a través de la plataforma.
              </p>

              <p>
                Los usuarios podrán ejercer sus derechos de acceso, rectificación,
                cancelación, oposición y portabilidad conforme a la normativa
                aplicable.
              </p>

              <p>
                Para más información, consulta nuestra{" "}
                <Link
                  href="/politica-privacidad"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Política de Privacidad
                </Link>{" "}
                y nuestra{" "}
                <Link
                  href="/cookies"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </LegalCard>

            <LegalCard
              id="section-7"
              icon={<CreditCard />}
              title="7. Comercio electrónico"
            >
              <p>
                Las transacciones económicas realizadas a través de OficiosPro se
                rigen por la Ley 51 de 23 de julio de 2008, relacionada con
                documentos electrónicos, firmas electrónicas y entidades de
                certificación en Panamá.
              </p>
              <p>
                También serán aplicables las disposiciones correspondientes del
                Código de Comercio y demás normas vigentes de la República de
                Panamá.
              </p>
            </LegalCard>

            <LegalCard
              id="section-8"
              icon={<Scale />}
              title="8. Legislación aplicable y jurisdicción"
            >
              <p>
                El presente Aviso Legal se rige e interpreta conforme a las leyes
                de la República de Panamá.
              </p>
              <p>
                Para la resolución de cualquier controversia derivada del uso de
                esta plataforma, las partes se someten a la jurisdicción de los
                tribunales competentes de la República de Panamá.
              </p>
            </LegalCard>

            <LegalCard
              id="section-9"
              icon={<FileText />}
              title="9. Modificaciones"
            >
              <p>
                OficiosPro se reserva el derecho de modificar el presente Aviso
                Legal en cualquier momento.
              </p>
              <p>
                Los cambios entrarán en vigor desde su publicación en la
                plataforma. El uso continuado del sitio después de dichas
                modificaciones implica la aceptación de las mismas.
              </p>
            </LegalCard>

            <section
              id="section-10"
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black mb-2">
                    10. Contacto legal
                  </h2>

                  <p className="text-slate-300 mb-5 leading-relaxed">
                    Para consultas relacionadas con este aviso legal, protección
                    de datos, privacidad o ejercicio de derechos, puedes
                    contactarnos al siguiente correo:
                  </p>

                  <a
                    href="mailto:legal@oficios-pro.com"
                    className="inline-flex items-center justify-center bg-white text-slate-900 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition"
                  >
                    legal@oficios-pro.com
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
              href="/politica-privacidad"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Política de Privacidad
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