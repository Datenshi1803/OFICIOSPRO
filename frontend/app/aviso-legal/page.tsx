import Link from "next/link"
import { Wrench } from "lucide-react"
import HeaderLegal from "@/components/HeaderLegal"

export const metadata = {
  title: "Aviso Legal | OficiosPro",
  description: "Aviso legal de OficiosPro conforme a la legislación vigente de la República de Panamá.",
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HEADER */}
      <HeaderLegal />

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Última actualización: enero 2026
          </span>
          <h1 className="text-4xl font-black text-slate-900 mt-4 mb-3">
            Aviso Legal
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            En cumplimiento de la legislación vigente de la República de Panamá, en particular la{" "}
            <strong>Ley 81 de 26 de marzo de 2019</strong> sobre Protección de Datos Personales,
            el <strong>Decreto Ejecutivo 285 de 2021</strong>, el{" "}
            <strong>Código de Comercio de Panamá</strong> y la{" "}
            <strong>Ley 51 de 2008</strong> sobre comercio electrónico, se pone a disposición del
            usuario la siguiente información legal.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. Datos identificativos del titular</h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm space-y-2">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Denominación</p>
                  <p className="font-semibold text-slate-800">OficiosPro</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">País</p>
                  <p className="font-semibold text-slate-800">República de Panamá</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Domicilio</p>
                  <p className="font-semibold text-slate-800">Ciudad de Panamá, Panamá</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sitio web</p>
                  <p className="font-semibold text-slate-800">https://oficios-pro.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Contacto</p>
                  <a href="mailto:legal@oficios-pro.com" className="font-semibold text-blue-600 hover:underline">
                    legal@oficios-pro.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Objeto y actividad</h2>
            <p>
              OficiosPro es una plataforma digital que conecta a clientes con técnicos especializados en
              instalación, mantenimiento y reparación de equipos de aire acondicionado en la República de
              Panamá. OficiosPro actúa como intermediario tecnológico y no es parte directa en los
              contratos de servicio celebrados entre clientes y técnicos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Condiciones de uso</h2>
            <p className="mb-4">
              El acceso y uso de esta plataforma implica la aceptación expresa de las presentes
              condiciones. El usuario se compromete a:
            </p>
            <ul className="space-y-2">
              {[
                "Hacer un uso lícito de la plataforma, conforme a la legislación panameña vigente.",
                "No realizar actividades fraudulentas, engañosas o que perjudiquen a terceros.",
                "No publicar contenido ilegal, ofensivo, discriminatorio o que vulnere derechos de terceros.",
                "Proporcionar información veraz al momento de registro y durante el uso de la plataforma.",
                "No intentar acceder de forma no autorizada a sistemas o datos de otros usuarios.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos de la plataforma —incluyendo textos, imágenes, logotipos, diseño gráfico,
              código fuente e interfaces— son titularidad de OficiosPro o de sus licenciantes, y están
              protegidos por las leyes panameñas de propiedad intelectual, en particular la{" "}
              <strong>Ley 35 de 1996</strong> sobre Derechos de Autor y la{" "}
              <strong>Ley 29 de 2006</strong> sobre Propiedad Industrial.
            </p>
            <p className="mt-4">
              Queda expresamente prohibida la reproducción, distribución, transformación o comunicación
              pública total o parcial de los contenidos sin autorización escrita previa de OficiosPro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Responsabilidad</h2>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <p className="font-bold text-amber-800 text-sm mb-2">Rol de intermediario</p>
                <p className="text-sm text-amber-700">
                  OficiosPro actúa únicamente como plataforma de intermediación tecnológica. No garantiza
                  la calidad, idoneidad ni resultado de los servicios prestados por los técnicos, quienes
                  son profesionales independientes y únicos responsables de su trabajo.
                </p>
              </div>
              <p>
                OficiosPro no será responsable de los daños o perjuicios que se deriven de interrupciones
                del servicio, errores técnicos, accesos no autorizados por terceros o del uso indebido
                de la plataforma por parte del usuario.
              </p>
              <p>
                La plataforma puede contener enlaces a sitios de terceros. OficiosPro no controla ni es
                responsable del contenido, políticas o prácticas de dichos sitios.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">6. Protección de datos personales</h2>
            <p>
              El tratamiento de los datos personales de los usuarios se realiza conforme a la{" "}
              <strong>Ley 81 de 26 de marzo de 2019</strong> sobre Protección de Datos Personales de
              la República de Panamá y su reglamento, el{" "}
              <strong>Decreto Ejecutivo 285 de 2021</strong>.
            </p>
            <p className="mt-4">
              OficiosPro actúa como <strong>responsable del tratamiento</strong> de los datos
              personales recabados a través de la plataforma. Para información detallada sobre cómo
              tratamos tus datos, consulta nuestra{" "}
              <Link href="/politica-privacidad" className="text-blue-600 hover:underline font-semibold">
                Política de Privacidad
              </Link>{" "}
              y nuestra{" "}
              <Link href="/cookies" className="text-blue-600 hover:underline font-semibold">
                Política de Cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">7. Comercio electrónico</h2>
            <p>
              Las transacciones económicas realizadas a través de OficiosPro se rigen por la{" "}
              <strong>Ley 51 de 23 de julio de 2008</strong> que define y regula los documentos y
              firmas electrónicas y las entidades de certificación en Panamá, así como por las
              disposiciones aplicables del Código de Comercio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">8. Legislación aplicable y jurisdicción</h2>
            <p>
              El presente Aviso Legal se rige e interpreta conforme a las leyes de la República de Panamá.
              Para la resolución de cualquier controversia derivada del uso de esta plataforma, las partes
              se someten a la jurisdicción de los Tribunales competentes de la Ciudad de Panamá, con
              renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">9. Modificaciones</h2>
            <p>
              OficiosPro se reserva el derecho a modificar el presente Aviso Legal en cualquier momento.
              Los cambios entrarán en vigor desde su publicación en la plataforma. El uso continuado
              del sitio tras dichas modificaciones implica la aceptación de las mismas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">10. Contacto</h2>
            <p>
              Para cualquier consulta legal o ejercicio de derechos, puedes contactarnos:
            </p>
            <div className="mt-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm space-y-2">
              <p><strong>OficiosPro — Departamento Legal</strong></p>
              <p>Ciudad de Panamá, República de Panamá</p>
              <p>
                Correo:{" "}
                <a href="mailto:legal@oficios-pro.com" className="text-blue-600 hover:underline">
                  legal@oficios-pro.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-100 py-8 px-6 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 OficiosPro. Panamá.</p>
          <div className="flex gap-6">
            <Link href="/cookies" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Política de Cookies
            </Link>
            <Link href="/politica-privacidad" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}