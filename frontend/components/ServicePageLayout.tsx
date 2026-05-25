import Link from "next/link"
import Header from "@/components/Header"
import { Wrench, ArrowRight, Shield, Star, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface ServicePageLayoutProps {
  hero: {
    badge: string
    title: string
    highlight: string
    titleEnd?: string
    description: string
    cta: string
  }
  icon: LucideIcon
  iconColor: string
  features: { title: string; desc: string }[]
  process: { step: string; title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  relatedServices: { href: string; label: string; desc: string }[]
  price?: { from: string; note: string }
}

export default function ServicePageLayout({
  hero,
  icon: Icon,
  iconColor,
  features,
  process,
  faqs,
  relatedServices,
  price,
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HEADER */}
      <Header />


        <main className="pt-28">

        {/* HERO */}
        <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/3 translate-x-1/3" />
          <div className="max-w-5xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6">
                  {hero.badge}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-950 leading-tight mb-5">
                  {hero.title}{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {hero.highlight}
                  </span>
                  {hero.titleEnd && ` ${hero.titleEnd}`}
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">{hero.description}</p>

                {price && (
                  <div className="inline-flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-md mb-8">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Precio desde</p>
                      <p className="text-2xl font-black text-slate-900">{price.from}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <p className="text-xs text-slate-500 max-w-[140px] leading-relaxed">{price.note}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/registro?tipo=cliente"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-xl hover:shadow-blue-300/40 transition-all group"
                  >
                    {hero.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/como-funciona"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-blue-300 transition-all"
                  >
                    Ver cómo funciona
                  </Link>
                </div>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, val: "100%", label: "Técnicos verificados", color: "bg-emerald-50 text-emerald-600" },
                  { icon: Clock, val: "<1h", label: "Tiempo de respuesta", color: "bg-blue-50 text-blue-600" },
                  { icon: Star, val: "4.9/5", label: "Calificación promedio", color: "bg-amber-50 text-amber-600" },
                  { icon: CheckCircle2, val: "Gratis", label: "Publicar solicitud", color: "bg-violet-50 text-violet-600" },
                ].map((s, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xl font-black text-slate-900">{s.val}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QUÉ INCLUYE */}
        <section className="py-20 px-6" aria-labelledby="features-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-black text-slate-900 mb-3">
                ¿Qué incluye el servicio?
              </h2>
              <p className="text-slate-500">Todo lo que realizan nuestros técnicos certificados.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/80 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm mb-1">{f.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white" aria-labelledby="process-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="process-heading" className="text-3xl font-black text-slate-900 mb-3">
                ¿Cómo se realiza el servicio?
              </h2>
              <p className="text-slate-500">El proceso que sigue el técnico en tu domicilio.</p>
            </div>
            <div className="space-y-5">
              {process.map((p, i) => (
                <div key={i} className="flex gap-5 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    {p.step}
                  </span>
                  <div>
                    <p className="font-black text-slate-900 mb-1">{p.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl font-black text-slate-900 mb-3">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
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

        {/* SERVICIOS RELACIONADOS */}
        <section className="py-16 px-6 bg-slate-50" aria-labelledby="related-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="related-heading" className="text-2xl font-black text-slate-900 mb-8 text-center">
              Otros servicios disponibles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-6 py-5 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div>
                    <p className="font-black text-slate-900 text-sm">{s.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">¿Necesitas este servicio hoy?</h2>
            <p className="text-slate-500 mb-8">
              Publica tu solicitud gratis y recibe cotizaciones de técnicos verificados en menos de 1 hora.
            </p>
            <Link
              href="/registro?tipo=cliente"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-300/40 transition-all group"
            >
              Solicitar servicio gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 OficiosPro. Panamá.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              ["/como-funciona", "Cómo funciona"],
              ["/servicios/instalacion", "Instalación"],
              ["/servicios/reparacion", "Reparación"],
              ["/servicios/mantenimiento", "Mantenimiento"],
              ["/terminos-condiciones", "Términos"],
            ].map(([href, label]) => (
              <Link key={label} href={href} className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}