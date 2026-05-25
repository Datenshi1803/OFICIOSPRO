import Link from "next/link"
import { Wrench } from "lucide-react"

export const metadata = {
  title: "Términos y Condiciones | OficiosPro",
  description: "Términos y condiciones de uso de OficiosPro conforme a la legislación vigente de la República de Panamá.",
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HEADER MINIMALISTA */}
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">
              Oficios<span className="text-blue-600">Pro</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Última actualización: enero 2026
          </span>
          <h1 className="text-4xl font-black text-slate-900 mt-4 mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Estos Términos y Condiciones regulan el acceso y uso de la plataforma OficiosPro,
            operada en la República de Panamá. Al registrarte o usar nuestros servicios,
            aceptas íntegramente estas condiciones conforme al{" "}
            <strong>Código de Comercio de Panamá</strong>, la{" "}
            <strong>Ley 51 de 2008</strong> sobre comercio electrónico y la{" "}
            <strong>Ley 81 de 2019</strong> sobre Protección de Datos Personales.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. Definiciones</h2>
            <div className="space-y-3">
              {[
                { term: "Plataforma", def: "El sitio web y servicios digitales de OficiosPro disponibles en https://oficios-pro.com." },
                { term: "Usuario", def: "Toda persona natural o jurídica que acceda, navegue o se registre en la plataforma." },
                { term: "Cliente", def: "Usuario que publica solicitudes de servicios técnicos." },
                { term: "Técnico", def: "Profesional independiente registrado que ofrece servicios a través de la plataforma." },
                { term: "Servicio", def: "Cualquier trabajo de instalación, reparación o mantenimiento de aire acondicionado publicado en la plataforma." },
                { term: "Cotización", def: "Propuesta económica enviada por un Técnico a un Cliente en respuesta a una solicitud." },
              ].map((item) => (
                <div key={item.term} className="flex gap-3">
                  <span className="font-black text-slate-900 flex-shrink-0">{item.term}:</span>
                  <span>{item.def}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Acceso y registro</h2>
            <p className="mb-4">
              El uso completo de la plataforma requiere registro previo. Al registrarte, garantizas que:
            </p>
            <ul className="space-y-2">
              {[
                "Eres mayor de 18 años o actúas con autorización legal.",
                "La información proporcionada es veraz, completa y actualizada.",
                "Eres el titular o estás autorizado para usar el correo electrónico registrado.",
                "Mantendrás la confidencialidad de tus credenciales de acceso.",
                "Notificarás inmediatamente a OficiosPro ante cualquier uso no autorizado de tu cuenta.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Rol de OficiosPro</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <p className="font-bold text-amber-800 mb-2">Intermediario tecnológico</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                OficiosPro es exclusivamente una plataforma de intermediación que facilita el contacto
                entre Clientes y Técnicos independientes. OficiosPro <strong>no es parte</strong> en
                los contratos de servicio celebrados entre ellos, no garantiza la calidad de los
                trabajos realizados y no asume responsabilidad por los resultados de dichos servicios.
              </p>
            </div>
            <p className="mt-4">
              Cada Técnico opera como profesional independiente. OficiosPro no es su empleador ni
              tiene relación laboral con ellos conforme al Código de Trabajo de la República de Panamá.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Condiciones para clientes</h2>
            <p className="mb-4">Como Cliente, al publicar una solicitud de servicio:</p>
            <ul className="space-y-2">
              {[
                "Describes el problema de forma honesta y completa.",
                "Aceptas las cotizaciones de forma voluntaria y sin presión.",
                "Te comprometes a cumplir con el pago acordado con el Técnico seleccionado.",
                "Eres responsable de proporcionar acceso al lugar donde se realizará el trabajo.",
                "Puedes cancelar una solicitud antes de aceptar una cotización sin penalización.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Condiciones para técnicos</h2>
            <p className="mb-4">Como Técnico registrado en la plataforma:</p>
            <ul className="space-y-2">
              {[
                "Garantizas que posees los conocimientos, herramientas y certificaciones necesarias para prestar los servicios ofrecidos.",
                "Eres el único responsable de la calidad, seguridad y resultado de tu trabajo.",
                "Te comprometes a cumplir con los servicios que aceptes en tiempo y forma.",
                "Aceptas el sistema de créditos para cotizar trabajos según las tarifas vigentes en la plataforma.",
                "No podrás contactar a clientes fuera de la plataforma para eludir el sistema de comisiones.",
                "Mantendrás actualizada tu información de perfil, especialidad y disponibilidad.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">6. Sistema de créditos y pagos</h2>
            <p className="mb-4">
              OficiosPro opera un sistema de créditos para que los Técnicos puedan enviar cotizaciones:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Créditos gratuitos", desc: "Cada técnico recibe créditos semanales gratuitos para cotizar trabajos sin costo." },
                { title: "Créditos de pago", desc: "Paquetes adicionales disponibles para mayor volumen de cotizaciones." },
                { title: "No reembolsables", desc: "Los créditos adquiridos no son reembolsables salvo fallo técnico imputable a OficiosPro." },
                { title: "Precios", desc: "OficiosPro se reserva el derecho de modificar los precios notificando con al menos 15 días de antelación." },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-black text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">7. Conductas prohibidas</h2>
            <p className="mb-4">Está expresamente prohibido en la plataforma:</p>
            <ul className="space-y-2">
              {[
                "Publicar información falsa, engañosa o fraudulenta.",
                "Suplantar la identidad de otra persona o empresa.",
                "Usar la plataforma para actividades ilegales conforme a la legislación panameña.",
                "Intentar eludir el sistema de pagos o créditos de la plataforma.",
                "Acosar, amenazar o discriminar a otros usuarios.",
                "Publicar contenido ofensivo, obsceno o que vulnere derechos de terceros.",
                "Usar sistemas automatizados para acceder a la plataforma sin autorización.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              El incumplimiento de estas prohibiciones podrá resultar en la suspensión o eliminación
              permanente de la cuenta, sin perjuicio de las acciones legales que correspondan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">8. Suspensión y cancelación de cuentas</h2>
            <p>
              OficiosPro se reserva el derecho de suspender o cancelar cuentas que incumplan estos
              Términos, sin previo aviso en casos graves. El usuario puede cancelar su cuenta en
              cualquier momento desde la configuración de su perfil o contactando a{" "}
              <a href="mailto:soporte@oficios-pro.com" className="text-blue-600 hover:underline">
                soporte@oficios-pro.com
              </a>
              . La cancelación no exime de obligaciones pendientes previas a la misma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">9. Limitación de responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley panameña, OficiosPro no será responsable por
              daños indirectos, incidentales o consecuentes derivados del uso de la plataforma,
              incluyendo pérdida de ingresos, daños a la propiedad durante un servicio técnico, o
              interrupciones del servicio por causas de fuerza mayor o fallos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">10. Modificaciones</h2>
            <p>
              OficiosPro podrá modificar estos Términos en cualquier momento. Los cambios serán
              notificados con al menos <strong>15 días de antelación</strong> mediante correo
              electrónico o aviso destacado en la plataforma. El uso continuado tras dicho plazo
              implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">11. Ley aplicable y jurisdicción</h2>
            <p>
              Estos Términos se rigen por las leyes de la <strong>República de Panamá</strong>.
              Cualquier disputa será sometida a los tribunales competentes de la Ciudad de Panamá,
              con renuncia expresa a cualquier otro fuero.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">12. Contacto</h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm space-y-2">
              <p><strong>OficiosPro</strong></p>
              <p>Ciudad de Panamá, República de Panamá</p>
              <p>
                Soporte:{" "}
                <a href="mailto:soporte@oficios-pro.com" className="text-blue-600 hover:underline">
                  soporte@oficios-pro.com
                </a>
              </p>
              <p>
                Legal:{" "}
                <a href="mailto:legal@oficios-pro.com" className="text-blue-600 hover:underline">
                  legal@oficios-pro.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER MINIMALISTA */}
      <footer className="border-t border-slate-100 py-8 px-6 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 OficiosPro. Panamá.</p>
          <div className="flex gap-6">
            <Link href="/politica-privacidad" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/aviso-legal" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Aviso Legal
            </Link>
            <Link href="/cookies" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}