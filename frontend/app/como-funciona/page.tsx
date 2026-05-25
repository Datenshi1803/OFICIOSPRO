import Link from "next/link"
import Header from "@/components/Header"
import { Wrench, MessageSquare, CalendarCheck, CheckCircle2, ArrowRight, Shield, Zap, Star, Users, Clock, ChevronRight, PhoneCall } from "lucide-react"

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata = {
  title: "Cómo funciona OficiosPro | Técnicos de Aire Acondicionado en Panamá",
  description:
    "Descubre cómo conectamos clientes con técnicos verificados de aire acondicionado en Panamá. Publica tu solicitud gratis, recibe cotizaciones y agenda en minutos.",
  keywords: [
    "técnicos aire acondicionado Panamá",
    "cómo funciona OficiosPro",
    "solicitar técnico aire acondicionado",
    "instalación aire acondicionado Panamá",
    "reparación aire acondicionado Panamá",
    "mantenimiento aire acondicionado Panamá",
  ],
  openGraph: {
    title: "Cómo funciona OficiosPro | Técnicos de Aire Acondicionado en Panamá",
    description:
      "Publica tu solicitud gratis, recibe cotizaciones de técnicos verificados y agenda el servicio. Todo en un solo lugar.",
    url: "https://oficios-pro.com/como-funciona",
    siteName: "OficiosPro",
    locale: "es_PA",
    type: "website",
  },
  alternates: {
    canonical: "https://oficios-pro.com/como-funciona",
  },
}

// ─── JSON-LD STRUCTURED DATA ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo contratar un técnico de aire acondicionado en Panamá con OficiosPro",
  description:
    "Guía paso a paso para publicar tu solicitud, recibir cotizaciones de técnicos verificados y agendar el servicio.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Publica tu problema",
      text: "Describe qué necesitas: instalación, reparación o mantenimiento. Es completamente gratis.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Recibe cotizaciones",
      text: "Técnicos verificados cercanos a tu zona te contactan con precios y disponibilidad.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Elige y agenda",
      text: "Selecciona al técnico con mejor calificación y precio, y coordina la fecha del servicio.",
    },
  ],
  totalTime: "PT10M",
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ComoFuncionaPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white text-slate-900 font-sans">

        {/* HEADER */}
        <Header />


    <main className="pt-28">

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-20 px-6">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-4xl mx-auto text-center relative">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6">
                <Zap className="w-4 h-4" />
                Servicio en menos de 1 hora
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
                ¿Cómo funciona{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  OficiosPro?
                </span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
                Conectamos clientes con los mejores técnicos de aire acondicionado en Panamá.
                Rápido, seguro y completamente gratis para publicar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/registro?tipo=cliente"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-xl hover:shadow-blue-300/40 transition-all group"
                >
                  Publicar trabajo gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/registro?tipo=tecnico"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-blue-300 transition-all"
                >
                  Soy técnico
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="py-12 px-6 border-y border-slate-100">
            <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { icon: Users, val: "500+", label: "Técnicos verificados" },
                { icon: CheckCircle2, val: "2,500+", label: "Trabajos completados" },
                { icon: Star, val: "4.9/5", label: "Calificación promedio" },
                { icon: Clock, val: "<1h", label: "Tiempo de respuesta" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.val}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PASOS PARA CLIENTES */}
          <section className="py-24 px-6" aria-label="Pasos para clientes">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  Para clientes
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-5 mb-4">
                  Consigue un técnico en 3 pasos
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Publicar tu solicitud es completamente gratis. Solo pagas el servicio al técnico directamente.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* línea conectora desktop */}
                <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

                {[
                  {
                    icon: MessageSquare,
                    step: "01",
                    title: "Publica tu problema",
                    desc: "Describe qué necesitas — instalación, reparación o mantenimiento — e indica tu zona en Panamá. Es gratis y toma menos de 2 minutos.",
                    color: "from-blue-600 to-blue-500",
                  },
                  {
                    icon: CalendarCheck,
                    step: "02",
                    title: "Recibe cotizaciones",
                    desc: "Técnicos verificados cercanos a tu zona te envían cotizaciones con precio, disponibilidad y su calificación. Compara y elige.",
                    color: "from-cyan-500 to-blue-500",
                  },
                  {
                    icon: CheckCircle2,
                    step: "03",
                    title: "Agenda y listo",
                    desc: "Acepta la cotización que más te convenga, coordina la fecha con el técnico y recibe el servicio en tu domicilio.",
                    color: "from-emerald-500 to-cyan-500",
                  },
                ].map((step, i) => (
                  <div key={i} className="relative text-center group">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-105 transition-transform duration-300 relative z-10`}>
                      <step.icon className="w-9 h-9 text-white" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-100 text-slate-700 text-xs font-black flex items-center justify-center shadow-sm">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/registro?tipo=cliente"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-xl hover:shadow-blue-300/40 transition-all group"
                >
                  Publicar trabajo gratis ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* PASOS PARA TÉCNICOS */}
          <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800" aria-label="Pasos para técnicos">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full">
                  Para técnicos
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 mb-4">
                  Consigue más clientes con OficiosPro
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                  Regístrate, accede a trabajos disponibles en tu zona y haz crecer tu negocio.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    title: "Crea tu perfil",
                    desc: "Regístrate gratis, añade tu especialidad, experiencia y zona de cobertura en Panamá.",
                  },
                  {
                    step: "02",
                    title: "Cotiza trabajos",
                    desc: "Revisa las solicitudes disponibles cerca de ti y envía tus cotizaciones usando tus créditos.",
                  },
                  {
                    step: "03",
                    title: "Gana más clientes",
                    desc: "Completa trabajos, recibe calificaciones positivas y escala tu reputación en la plataforma.",
                  },
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all">
                    <span className="text-4xl font-black text-blue-400/30">{step.step}</span>
                    <h3 className="text-lg font-black text-white mt-2 mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/registro?tipo=tecnico"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-cyan-50 transition-all group"
                >
                  Registrarme como técnico
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* GARANTÍAS */}
          <section className="py-24 px-6" aria-label="Garantías y seguridad">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                  Tu seguridad es nuestra prioridad
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Todos los técnicos en OficiosPro pasan por un proceso de verificación antes de poder operar.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Técnicos verificados",
                    desc: "Revisamos cédula, certificaciones y antecedentes antes de aprobar cada técnico.",
                  },
                  {
                    icon: Star,
                    title: "Sistema de calificaciones",
                    desc: "Cada trabajo es calificado por el cliente. Solo los mejores mantienen su posición.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Comunicación segura",
                    desc: "Toda la comunicación entre cliente y técnico queda registrada en la plataforma.",
                  },
                  {
                    icon: Zap,
                    title: "Respuesta rápida",
                    desc: "Recibes cotizaciones en menos de 1 hora en la mayoría de zonas de Panamá.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Publicación gratuita",
                    desc: "Publicar tu solicitud como cliente es completamente gratis. Sin compromisos.",
                  },
                  {
                    icon: PhoneCall,
                    title: "Soporte disponible",
                    desc: "Nuestro equipo está disponible para ayudarte en cualquier paso del proceso.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all group">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 px-6 bg-slate-50" aria-label="Preguntas frecuentes">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-3">Preguntas frecuentes</h2>
                <p className="text-slate-500">Todo lo que necesitas saber antes de empezar.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "¿Es gratis publicar una solicitud?",
                    a: "Sí, publicar tu solicitud como cliente es completamente gratis. Solo pagas el servicio directamente al técnico que elijas.",
                  },
                  {
                    q: "¿Cuánto tiempo tarda en llegar una cotización?",
                    a: "En la mayoría de zonas de Panamá recibes tu primera cotización en menos de 1 hora.",
                  },
                  {
                    q: "¿Cómo sé si el técnico es confiable?",
                    a: "Todos los técnicos pasan un proceso de verificación de identidad y certificaciones. Además puedes ver sus calificaciones y reseñas de otros clientes antes de contratar.",
                  },
                  {
                    q: "¿En qué zonas de Panamá operan?",
                    a: "Operamos en toda la República de Panamá, con mayor cobertura en Ciudad de Panamá, Panamá Oeste, Colón, Chiriquí y Azuero.",
                  },
                  {
                    q: "¿Puedo cancelar una solicitud?",
                    a: "Sí, puedes cancelar tu solicitud en cualquier momento antes de aceptar una cotización, sin ningún costo.",
                  },
                ].map((faq, i) => (
                  <details key={i} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-bold text-slate-900 text-sm list-none">
                      {faq.q}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                ¿Listo para empezar?
              </h2>
              <p className="text-slate-500 mb-8 text-lg">
                Únete a miles de panameños que ya usan OficiosPro para resolver sus problemas de aire acondicionado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/registro?tipo=cliente"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-xl hover:shadow-blue-300/40 transition-all group"
                >
                  Solicitar servicio gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/servicios/instalacion"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-blue-300 transition-all"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </section>

        </main>

        {/* FOOTER MINIMALISTA */}
        <footer className="border-t border-slate-100 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">© 2026 OficiosPro. Panamá.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                ["/servicios/instalacion", "Instalación"],
                ["/servicios/reparacion", "Reparación"],
                ["/servicios/mantenimiento", "Mantenimiento"],
                ["/terminos-condiciones", "Términos"],
                ["/politica-privacidad", "Privacidad"],
              ].map(([href, label]) => (
                <Link key={label} href={href} className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}