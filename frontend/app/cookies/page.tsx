import Link from "next/link"
import { Wrench } from "lucide-react"

export const metadata = {
  title: "Política de Cookies | OficiosPro",
  description: "Información sobre el uso de cookies en OficiosPro conforme a la Ley 81 de 2019 de Panamá.",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HEADER */}
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
            Política de Cookies
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            En OficiosPro utilizamos cookies y tecnologías similares para mejorar tu experiencia en
            nuestra plataforma. Esta política explica qué son, cómo las usamos y cómo puedes controlarlas,
            conforme a la <strong>Ley 81 de 26 de marzo de 2019</strong> sobre Protección de Datos
            Personales de la República de Panamá y su reglamento, el{" "}
            <strong>Decreto Ejecutivo 285 de 2021</strong>.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
              un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un período
              de tiempo, para que no tengas que volver a configurarlas cada vez que regreses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Tipos de cookies que utilizamos</h2>

            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-2">Cookies estrictamente necesarias</h3>
                <p className="text-sm">
                  Son indispensables para el funcionamiento básico de la plataforma. Sin ellas, servicios
                  como el inicio de sesión o la navegación segura no estarían disponibles. No requieren
                  tu consentimiento previo conforme al artículo 9 de la Ley 81.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Sesión de usuario", "Token de autenticación", "Seguridad CSRF"].map((c) => (
                    <span key={c} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-2">Cookies de rendimiento y análisis</h3>
                <p className="text-sm">
                  Recopilan información anónima sobre cómo los visitantes usan nuestra plataforma, qué
                  páginas visitan con más frecuencia y si reciben mensajes de error. Usamos{" "}
                  <strong>Google Analytics</strong> para este fin. Los datos son anonimizados y no
                  permiten identificarte directamente.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Google Analytics (_ga)", "Google Analytics (_gid)", "Google Analytics (_gat)"].map((c) => (
                    <span key={c} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-2">Cookies de preferencias</h3>
                <p className="text-sm">
                  Permiten que la plataforma recuerde tus preferencias como el idioma, la ubicación
                  o si marcaste la opción "Recordarme" en el inicio de sesión.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Base legal para el uso de cookies</h2>
            <p>
              Conforme al artículo 7 de la <strong>Ley 81 de 2019</strong>, el tratamiento de tus datos
              personales a través de cookies se realiza bajo las siguientes bases legales:
            </p>
            <ul className="mt-4 space-y-2 list-none">
              {[
                "Tu consentimiento expreso, obtenido a través del banner de cookies al ingresar al sitio.",
                "Ejecución de la relación contractual para las cookies estrictamente necesarias.",
                "Interés legítimo de OficiosPro para mejorar sus servicios mediante análisis de uso anonimizado.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Cookies de terceros</h2>
            <p>
              Algunos servicios de terceros integrados en nuestra plataforma pueden instalar sus propias
              cookies. Estos servicios tienen sus propias políticas de privacidad:
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[
                { name: "Google Analytics", url: "https://policies.google.com/privacy", desc: "Análisis de tráfico web" },
                { name: "Google Tag Manager", url: "https://policies.google.com/privacy", desc: "Gestión de etiquetas" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 hover:border-blue-200 transition-colors group"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                  <span className="text-blue-600 text-xs font-semibold group-hover:underline">Ver política →</span>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Cómo gestionar o rechazar cookies</h2>
            <p className="mb-4">
              Conforme al artículo 10 de la Ley 81, tienes derecho a retirar tu consentimiento en
              cualquier momento. Puedes controlar las cookies de las siguientes formas:
            </p>
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <p className="font-bold text-amber-800 text-sm mb-1">Desde tu navegador</p>
                <p className="text-sm text-amber-700">
                  Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que
                  deshabilitar las cookies necesarias puede afectar el funcionamiento de la plataforma.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-bold text-blue-800 text-sm mb-1">Google Analytics</p>
                <p className="text-sm text-blue-700">
                  Puedes optar por no participar instalando el complemento de inhabilitación para
                  navegadores disponible en:{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline">
                    tools.google.com/dlpage/gaoptout
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">6. Tus derechos según la Ley 81</h2>
            <p className="mb-4">
              Conforme al Capítulo III de la Ley 81 de 2019, tienes los siguientes derechos sobre
              tus datos personales:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Acceso", desc: "Saber qué datos tuyos procesamos." },
                { title: "Rectificación", desc: "Corregir datos inexactos o incompletos." },
                { title: "Cancelación", desc: "Solicitar la eliminación de tus datos." },
                { title: "Oposición", desc: "Oponerte al tratamiento de tus datos." },
                { title: "Portabilidad", desc: "Recibir tus datos en formato estructurado." },
                { title: "Revocación", desc: "Retirar tu consentimiento en cualquier momento." },
              ].map((r) => (
                <div key={r.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-black text-slate-900 text-sm">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              Para ejercer cualquiera de estos derechos, contáctanos en:{" "}
              <a href="mailto:privacidad@oficios-pro.com" className="text-blue-600 hover:underline font-semibold">
                privacidad@oficios-pro.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">7. Actualizaciones a esta política</h2>
            <p>
              Podemos actualizar esta Política de Cookies periódicamente. Cuando lo hagamos,
              actualizaremos la fecha en la parte superior de esta página. Te recomendamos
              revisarla regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">8. Contacto</h2>
            <p>
              Si tienes preguntas sobre el uso de cookies o el tratamiento de tus datos personales,
              puedes contactarnos:
            </p>
            <div className="mt-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm space-y-2">
              <p><strong>OficiosPro</strong></p>
              <p>Ciudad de Panamá, República de Panamá</p>
              <p>
                Correo:{" "}
                <a href="mailto:privacidad@oficios-pro.com" className="text-blue-600 hover:underline">
                  privacidad@oficios-pro.com
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
            <Link href="/aviso-legal" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Aviso Legal
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