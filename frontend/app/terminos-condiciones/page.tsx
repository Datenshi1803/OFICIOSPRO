import Link from "next/link"
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Wrench,
  CreditCard,
  AlertTriangle,
  Scale,
  Mail,
} from "lucide-react"
import HeaderLegal from "@/components/HeaderLegal"

export const metadata = {
  title: "Términos y Condiciones | OficiosPro",
  description:
    "Términos y condiciones de uso de la plataforma OficiosPro en la República de Panamá.",
}

const sections = [
  "Aceptación de los términos",
  "Objeto de la plataforma",
  "Registro de usuarios",
  "Uso permitido",
  "Servicios técnicos",
  "Pagos y transacciones",
  "Responsabilidades",
  "Protección de datos",
  "Suspensión de cuentas",
  "Legislación aplicable",
]

export default function TerminosCondicionesPage() {
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
              <FileText size={16} />
              Última actualización: enero 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Términos y Condiciones
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed">
              Estos términos regulan el acceso y uso de OficiosPro, una
              plataforma digital que conecta clientes con técnicos especializados
              en servicios de aire acondicionado en Panamá.
            </p>
          </div>
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
              icon={<UserCheck />}
              title="1. Aceptación de los términos"
            >
              <p>
                Al registrarse, acceder o utilizar OficiosPro, el usuario acepta
                estos Términos y Condiciones, así como las políticas vinculadas
                de privacidad, cookies y aviso legal.
              </p>
              <p>
                Si el usuario no está de acuerdo con estas condiciones, deberá
                abstenerse de utilizar la plataforma.
              </p>
            </LegalCard>

            <LegalCard
              id="section-2"
              icon={<Wrench />}
              title="2. Objeto de la plataforma"
            >
              <p>
                OficiosPro es una plataforma digital que permite a clientes
                solicitar servicios relacionados con instalación, mantenimiento,
                revisión y reparación de equipos de aire acondicionado.
              </p>
              <p>
                La plataforma actúa como intermediario tecnológico entre clientes
                y técnicos independientes. OficiosPro no presta directamente los
                servicios técnicos ofrecidos por los profesionales registrados.
              </p>
            </LegalCard>

            <LegalCard
              id="section-3"
              icon={<ShieldCheck />}
              title="3. Registro de usuarios"
            >
              <p>
                Para utilizar ciertas funciones de la plataforma, el usuario
                deberá crear una cuenta proporcionando información real,
                actualizada y completa.
              </p>

              <ul className="legal-list">
                <li>El usuario es responsable de proteger sus credenciales.</li>
                <li>No debe compartir su cuenta con terceros.</li>
                <li>
                  OficiosPro podrá solicitar verificación adicional cuando sea
                  necesario.
                </li>
                <li>
                  La información falsa o incompleta podrá ocasionar la suspensión
                  de la cuenta.
                </li>
              </ul>
            </LegalCard>

            <LegalCard
              id="section-4"
              icon={<AlertTriangle />}
              title="4. Uso permitido de la plataforma"
            >
              <p>
                El usuario se compromete a utilizar OficiosPro de forma legal,
                responsable y conforme a la legislación vigente de la República
                de Panamá.
              </p>

              <ul className="legal-list">
                <li>No realizar fraudes, engaños o suplantación de identidad.</li>
                <li>No publicar información falsa, ofensiva o ilegal.</li>
                <li>No intentar acceder a cuentas, sistemas o datos ajenos.</li>
                <li>No afectar el funcionamiento normal de la plataforma.</li>
                <li>No utilizar la plataforma para fines distintos a los permitidos.</li>
              </ul>
            </LegalCard>

            <LegalCard
              id="section-5"
              icon={<Wrench />}
              title="5. Servicios técnicos"
            >
              <p>
                Los servicios solicitados a través de OficiosPro serán realizados
                por técnicos independientes. Cada técnico es responsable de la
                calidad, puntualidad, seguridad y resultado del servicio que
                ofrece.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-amber-800 mb-2">
                  Importante
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  OficiosPro puede facilitar la comunicación, reserva y gestión
                  del servicio, pero no garantiza resultados específicos sobre el
                  trabajo realizado por terceros.
                </p>
              </div>
            </LegalCard>

            <LegalCard
              id="section-6"
              icon={<CreditCard />}
              title="6. Pagos y transacciones"
            >
              <p>
                Los pagos realizados dentro de la plataforma estarán sujetos a
                los métodos de pago disponibles y a las condiciones del proveedor
                de pagos correspondiente.
              </p>

              <ul className="legal-list">
                <li>El usuario deberá verificar los datos antes de confirmar un pago.</li>
                <li>
                  Las tarifas, cargos o comisiones serán mostradas antes de
                  finalizar la transacción.
                </li>
                <li>
                  OficiosPro podrá emitir comprobantes digitales cuando
                  corresponda.
                </li>
                <li>
                  Las devoluciones o reclamos dependerán del caso y de las
                  políticas internas aplicables.
                </li>
              </ul>
            </LegalCard>

            <LegalCard
              id="section-7"
              icon={<Scale />}
              title="7. Responsabilidades"
            >
              <p>
                OficiosPro realizará esfuerzos razonables para mantener la
                plataforma disponible, segura y funcional. Sin embargo, no
                garantiza que el servicio esté libre de errores, interrupciones o
                fallos técnicos.
              </p>

              <p>
                La plataforma no será responsable por daños ocasionados por mal
                uso del sistema, información incorrecta proporcionada por usuarios,
                fallas de terceros, problemas de conexión, mantenimientos,
                actualizaciones o causas de fuerza mayor.
              </p>
            </LegalCard>

            <LegalCard
              id="section-8"
              icon={<ShieldCheck />}
              title="8. Protección de datos personales"
            >
              <p>
                OficiosPro tratará los datos personales de los usuarios conforme
                a la Ley 81 de 2019 sobre Protección de Datos Personales de la
                República de Panamá y el Decreto Ejecutivo 285 de 2021.
              </p>

              <p>
                Para más información sobre el uso, almacenamiento y protección de
                datos personales, el usuario puede consultar la{" "}
                <Link
                  href="/politica-privacidad"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </LegalCard>

            <LegalCard
              id="section-9"
              icon={<AlertTriangle />}
              title="9. Suspensión o cancelación de cuentas"
            >
              <p>
                OficiosPro podrá suspender, limitar o cancelar cuentas cuando se
                detecte incumplimiento de estos términos, uso fraudulento,
                comportamiento abusivo, información falsa o actividades que puedan
                afectar a otros usuarios o a la plataforma.
              </p>
            </LegalCard>

            <LegalCard
              id="section-10"
              icon={<Scale />}
              title="10. Legislación aplicable y jurisdicción"
            >
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la
                República de Panamá. Cualquier controversia relacionada con el uso
                de la plataforma será sometida a los tribunales competentes de la
                República de Panamá.
              </p>
            </LegalCard>

            <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black mb-2">Contacto legal</h2>
                  <p className="text-slate-300 mb-4">
                    Para consultas relacionadas con estos términos, puedes
                    escribirnos al siguiente correo:
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

          <div className="flex gap-5">
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
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition"
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