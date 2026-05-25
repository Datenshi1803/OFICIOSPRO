import Link from "next/link"
import { Wrench } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad | OficiosPro",
  description: "Política de privacidad de OficiosPro conforme a la Ley 81 de 2019 sobre Protección de Datos Personales de Panamá.",
}

export default function PoliticaPrivacidadPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            En OficiosPro nos tomamos muy en serio la privacidad de tus datos. Esta política describe
            qué información recopilamos, cómo la usamos y cuáles son tus derechos, conforme a la{" "}
            <strong>Ley 81 de 26 de marzo de 2019</strong> sobre Protección de Datos Personales de
            la República de Panamá y su reglamento, el{" "}
            <strong>Decreto Ejecutivo 285 de 2021</strong>.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. Responsable del tratamiento</h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm space-y-2">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Titular</p>
                  <p className="font-semibold text-slate-800">OficiosPro</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">País</p>
                  <p className="font-semibold text-slate-800">República de Panamá</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Domicilio</p>
                  <p className="font-semibold text-slate-800">Ciudad de Panamá, Panamá</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Contacto de privacidad</p>
                  <a href="mailto:privacidad@oficios-pro.com" className="font-semibold text-blue-600 hover:underline">
                    privacidad@oficios-pro.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Datos que recopilamos</h2>
            <p className="mb-5">Recopilamos los siguientes datos según el tipo de usuario:</p>

            <div className="space-y-4">
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <div className="bg-blue-50 px-5 py-3 border-b border-slate-100">
                  <p className="font-black text-blue-800 text-sm">Todos los usuarios</p>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {["Nombre completo", "Correo electrónico", "Contraseña (cifrada)", "Número de teléfono", "Provincia / Distrito / Corregimiento", "Dirección IP", "Datos de navegación"].map((d) => (
                      <span key={d} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-slate-100">
                  <p className="font-black text-emerald-800 text-sm">Técnicos (datos adicionales)</p>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {["Número de cédula", "Especialidad técnica", "Años de experiencia", "Descripción profesional", "Tarifa por hora", "Historial de cotizaciones", "Calificaciones recibidas"].map((d) => (
                      <span key={d} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <div className="bg-violet-50 px-5 py-3 border-b border-slate-100">
                  <p className="font-black text-violet-800 text-sm">Datos de uso y analítica</p>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {["Páginas visitadas", "Tiempo en plataforma", "Dispositivo y navegador", "Cookies de sesión"].map((d) => (
                      <span key={d} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{d}</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">Recopilados mediante Google Analytics de forma anonimizada.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Finalidad del tratamiento</h2>
            <p className="mb-4">
              Conforme al artículo 7 de la Ley 81, tratamos tus datos para las siguientes finalidades:
            </p>
            <div className="space-y-3">
              {[
                { num: "01", title: "Gestión de la cuenta", desc: "Registro, autenticación y administración de tu perfil en la plataforma." },
                { num: "02", title: "Prestación del servicio", desc: "Conectar clientes con técnicos, gestionar cotizaciones y seguimiento de trabajos." },
                { num: "03", title: "Comunicaciones", desc: "Envío de notificaciones sobre tus solicitudes, cotizaciones y estado de trabajos." },
                { num: "04", title: "Pagos y créditos", desc: "Procesamiento de compras de créditos e historial de transacciones." },
                { num: "05", title: "Mejora del servicio", desc: "Análisis estadístico anonimizado del uso de la plataforma." },
                { num: "06", title: "Cumplimiento legal", desc: "Atender requerimientos de autoridades competentes conforme a la ley panameña." },
              ].map((item) => (
                <div key={item.num} className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="text-blue-600 font-black text-sm flex-shrink-0">{item.num}</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Base legal del tratamiento</h2>
            <p className="mb-4">
              El tratamiento de tus datos personales se realiza bajo las siguientes bases legales
              establecidas en el artículo 7 de la Ley 81 de 2019:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Consentimiento", desc: "Para el envío de comunicaciones de marketing y uso de cookies no esenciales." },
                { title: "Ejecución contractual", desc: "Para prestarte los servicios de la plataforma una vez registrado." },
                { title: "Interés legítimo", desc: "Para la seguridad de la plataforma y mejora del servicio." },
                { title: "Obligación legal", desc: "Para cumplir con requerimientos de autoridades panameñas competentes." },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-black text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Conservación de los datos</h2>
            <p>
              Conservamos tus datos personales durante el tiempo que mantengas tu cuenta activa y por
              un período adicional de <strong>5 años</strong> tras su cancelación, conforme a las
              obligaciones legales aplicables en Panamá. Los datos de analítica anonimizados pueden
              conservarse indefinidamente al no permitir identificación personal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">6. Compartición de datos con terceros</h2>
            <p className="mb-4">
              OficiosPro no vende ni cede tus datos a terceros con fines comerciales. Únicamente
              compartimos información en los siguientes casos:
            </p>
            <ul className="space-y-2">
              {[
                "Entre Clientes y Técnicos: la información necesaria para coordinar el servicio (nombre, zona, descripción del trabajo).",
                "Proveedores de servicios tecnológicos: Google Analytics, servicios de hosting y procesadores de pago, bajo acuerdos de confidencialidad.",
                "Autoridades competentes: cuando sea requerido por ley o mandato judicial panameño.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">7. Seguridad de los datos</h2>
            <p className="mb-4">
              Implementamos medidas técnicas y organizativas para proteger tus datos conforme al
              artículo 22 de la Ley 81:
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: "Cifrado", desc: "Contraseñas cifradas con bcrypt. Comunicaciones bajo HTTPS/TLS." },
                { title: "Acceso restringido", desc: "Solo personal autorizado accede a datos personales." },
                { title: "Tokens seguros", desc: "Autenticación mediante tokens JWT con expiración." },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <p className="font-black text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">8. Tus derechos (ARCOP)</h2>
            <p className="mb-4">
              Conforme al Capítulo III de la <strong>Ley 81 de 2019</strong>, tienes los siguientes
              derechos sobre tus datos personales, conocidos como derechos ARCOP:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { letra: "A", title: "Acceso", desc: "Conocer qué datos tuyos tratamos, con qué finalidad y durante cuánto tiempo." },
                { letra: "R", title: "Rectificación", desc: "Corregir datos inexactos, incompletos o desactualizados." },
                { letra: "C", title: "Cancelación", desc: "Solicitar la eliminación de tus datos cuando ya no sean necesarios." },
                { letra: "O", title: "Oposición", desc: "Oponerte al tratamiento de tus datos para finalidades específicas." },
                { letra: "P", title: "Portabilidad", desc: "Recibir tus datos en formato estructurado y legible por máquina." },
                { letra: "+", title: "Revocación", desc: "Retirar tu consentimiento en cualquier momento sin efecto retroactivo." },
              ].map((r) => (
                <div key={r.letra} className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                    {r.letra}
                  </span>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800">
                Para ejercer cualquiera de estos derechos, envía un correo a{" "}
                <a href="mailto:privacidad@oficios-pro.com" className="font-bold hover:underline">
                  privacidad@oficios-pro.com
                </a>{" "}
                indicando tu nombre, correo de registro y el derecho que deseas ejercer.
                Responderemos en un plazo máximo de <strong>30 días hábiles</strong> conforme al
                artículo 16 de la Ley 81.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">9. Menores de edad</h2>
            <p>
              OficiosPro no está dirigida a menores de 18 años. No recopilamos conscientemente datos
              de menores. Si detectamos que un menor se ha registrado, eliminaremos su cuenta y datos
              de forma inmediata. Si eres padre o tutor y crees que tu hijo se ha registrado,
              contáctanos en{" "}
              <a href="mailto:privacidad@oficios-pro.com" className="text-blue-600 hover:underline">
                privacidad@oficios-pro.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">10. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad para reflejar cambios legales o en
              nuestros servicios. Te notificaremos por correo electrónico con al menos{" "}
              <strong>15 días de antelación</strong> ante cambios sustanciales. La fecha de la
              última actualización siempre estará visible al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">11. Autoridad de control</h2>
            <p>
              Si consideras que el tratamiento de tus datos no es conforme a la Ley 81 de 2019,
              puedes presentar una reclamación ante la{" "}
              <strong>Autoridad Nacional de Transparencia y Acceso a la Información (ANTAI)</strong>,
              organismo competente en materia de protección de datos en la República de Panamá.
            </p>
          </section>

        </div>
      </main>

      {/* FOOTER MINIMALISTA */}
      <footer className="border-t border-slate-100 py-8 px-6 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 OficiosPro. Panamá.</p>
          <div className="flex gap-6">
            <Link href="/terminos-condiciones" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Términos y Condiciones
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