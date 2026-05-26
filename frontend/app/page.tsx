"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import {
  Wrench, Shield, Star, Users, ArrowRight, Clock, Briefcase,
  Snowflake, Settings, Fan, CheckCircle2, MapPin, Zap, PiggyBank,
  CalendarCheck, MessageSquare, Sparkles, PhoneCall, ThumbsUp,
  Award, ChevronRight, Facebook, Instagram, Twitter, Linkedin,
  Menu, X,
} from "lucide-react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* HEADER FLOTANTE */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-br from-blue-50/70 via-cyan-50/40 to-transparent rounded-bl-[220px]" />
          <div className="absolute top-1/4 left-[-5%] w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-cyan-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[47%_53%] gap-10 lg:gap-16 items-center">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 mb-7 shadow-md shadow-slate-200/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-700">Disponible en todo Panamá</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[72px] xl:text-[78px] font-black leading-[1.08] tracking-tight text-slate-950">
                Técnicos de aire{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  confiables
                </span>
                <br />
                <span className="relative inline-block">
                  en minutos.
                  <span className="absolute left-2 right-2 -bottom-3 h-[6px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full -rotate-1 opacity-90" />
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 mt-11 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Publica tu trabajo gratis, recibe cotizaciones de técnicos
                verificados y elige la mejor opción para instalación, reparación o
                mantenimiento.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-10">
                <Link
                  href="/registro?tipo=cliente"
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-blue-400/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Publicar trabajo gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/registro?tipo=tecnico"
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-base hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Soy técnico
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Verificado</p>
                    <p className="text-xs text-slate-500">Técnicos certificados</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Respuesta en &lt;1h</p>
                    <p className="text-xs text-slate-500">Atención rápida</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50">
                  <Star className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">4.9/5 estrellas</p>
                    <p className="text-xs text-slate-500">Calificación de clientes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
<div className="relative mt-8 lg:mt-0">

  <div className="relative flex items-center justify-end h-[520px] lg:h-[640px]">

    {/* Glow decorativo suave */}
    <div className="absolute right-10 bottom-20 w-[420px] h-[420px] bg-cyan-200/30 blur-3xl rounded-full" />
    <div className="absolute top-16 right-36 w-[220px] h-[220px] bg-blue-200/20 blur-3xl rounded-full" />

    {/* Imagen principal */}
    <Image
  src="/fondoTec.png"
  alt="Técnico profesional de aire acondicionado"
  width={1100}
  height={900}
  priority
  className="relative z-10 w-[115%] lg:w-[128%] max-w-[980px] lg:max-w-[1100px] 
             h-auto object-contain -translate-y-20 lg:-translate-y-28 
             drop-shadow-[0_40px_60px_rgba(0,0,0,0.20)] transition-all 
             duration-500 hover:scale-[1.02]"
/>

    {/* Tarjeta flotante superior */}
    <div className="absolute top-8 left-0 z-20 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl px-5 py-4">
      <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
        <Award className="w-5 h-5 text-emerald-600" />
      </div>

      <div>
        <p className="text-sm font-black text-slate-900">Técnico certificado</p>
        <p className="text-xs text-slate-500">Seguro y confiable</p>
      </div>
    </div>

  </div>

</div>
            
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-6 lg:px-12 relative z-20 mt-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-slate-300/40 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />

            {[
              { icon: Users, val: "500+", lab: "Técnicos activos", col: "from-cyan-400 to-blue-400" },
              { icon: Briefcase, val: "2,500+", lab: "Proyectos realizados", col: "from-emerald-400 to-teal-400" },
              { icon: Star, val: "4.9", lab: "Calificación promedio", col: "from-amber-400 to-orange-400" },
              { icon: Clock, val: "<1h", lab: "Tiempo de respuesta", col: "from-violet-400 to-purple-400" },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative p-5 flex flex-col items-center text-center ${
                  i !== 3 ? "lg:border-r border-white/10" : ""
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.col} flex items-center justify-center mb-4 shadow-lg`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl lg:text-4xl font-black text-white">{s.val}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">
                  {s.lab}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-28 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full inline-block">
              Servicios principales
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 tracking-tight">
              Soluciones expertas para tu aire
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mt-4 mx-auto" />
            <p className="text-slate-500 max-w-2xl mx-auto mt-6 text-lg">
              Encuentra técnicos preparados para resolver cualquier problema de
              climatización de forma rápida y segura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Snowflake,
                title: "Instalación",
                desc: "Instalación profesional de equipos split, inverter y centrales con garantía.",
                color: "from-blue-600 to-cyan-500",
                features: ["Garantía incluida", "Instalación en 24h"],
              },
              {
                icon: Settings,
                title: "Reparación",
                desc: "Diagnóstico y solución de fallas, fugas, tarjetas electrónicas y compresores.",
                color: "from-slate-800 to-blue-700",
                features: ["Diagnóstico gratis", "Piezas originales"],
              },
              {
                icon: Fan,
                title: "Mantenimiento",
                desc: "Limpieza profunda para mejorar el rendimiento y ahorrar hasta un 30% de energía.",
                color: "from-cyan-500 to-emerald-500",
                features: ["Ahorro garantizado", "Limpieza profunda"],
              },
            ].map((svc, i) => (
              <div
                key={i}
                className="group relative bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500"
              >
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}
                >
                  <svc.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="relative text-2xl font-black text-slate-900 mb-3">
                  {svc.title}
                </h3>
                <p className="relative text-slate-500 leading-relaxed mb-6">
                  {svc.desc}
                </p>

                <div className="relative flex flex-wrap gap-2 mb-8">
                  {svc.features.map((feature, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href="/registro?tipo=cliente"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all duration-300"
                >
                  Solicitar ahora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-28 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full inline-block">
                Cómo funciona
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 mb-6 leading-tight">
                Resolver tu problema <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  nunca fue tan fácil
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6" />
              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
                En pocos pasos puedes publicar tu solicitud y recibir respuestas
                de técnicos disponibles cerca de ti.
              </p>

              <Link
                href="/registro?tipo=cliente"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold hover:from-blue-600 hover:to-cyan-500 shadow-xl hover:shadow-blue-200 transition-all duration-300"
              >
                Empezar ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid gap-5">
              {[
                {
                  icon: MessageSquare,
                  title: "Publica tu problema",
                  desc: "Describe qué necesitas: instalación, reparación o mantenimiento en minutos.",
                  step: "01",
                },
                {
                  icon: CalendarCheck,
                  title: "Recibe cotizaciones",
                  desc: "Técnicos verificados te contactan con precios y disponibilidad real.",
                  step: "02",
                },
                {
                  icon: CheckCircle2,
                  title: "Elige y agenda",
                  desc: "Selecciona al mejor técnico según su calificación y coordina el servicio.",
                  step: "03",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="group flex gap-5 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs font-black flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARA TÉCNICOS */}
      <section id="tecnicos" className="py-28 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 lg:p-16 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05]" />

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300 text-sm font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4" />
                Para profesionales
              </span>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
                Convierte tu oficio en un{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  negocio rentable
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6" />

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                Recibe solicitudes de clientes reales, organiza tu agenda y gana
                más visibilidad en tu zona sin depender solo de recomendaciones.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Clientes verificados y reales",
                  "Tú defines tu precio y horario",
                  "Más trabajos sin depender solo de recomendaciones",
                  "Soporte dedicado 24/7",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-semibold">
                    <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/registro?tipo=tecnico"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-gradient-to-r hover:from-cyan-300 hover:to-blue-300 hover:text-slate-900 transition-all duration-300 shadow-xl shadow-black/20 group"
              >
                Registrarme como técnico
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid gap-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                  <PiggyBank className="w-7 h-7 text-white" />
                </div>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-2">
                  Potencial de ingresos mensuales
                </p>
                <h3 className="text-5xl font-black text-white mb-2">$2,500+</h3>
                <p className="text-cyan-300 font-semibold">
                  Trabajando a tu ritmo, sin horarios fijos
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl shadow-blue-900/30">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-6">
                  “OficiosPro me ayudó a conseguir más clientes y llenar mi
                  agenda semanal. En 3 meses dupliqué mis ingresos.”
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-lg">
                    JM
                  </div>
                  <div>
                    <p className="font-bold text-sm">Juan Méndez</p>
                    <p className="text-xs text-cyan-100">
                      Técnico de aire · Ciudad de Panamá
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 lg:px-12 pb-28">
        <div className="max-w-[1400px] mx-auto text-center bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl p-12 lg:p-20 shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-40" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              <PhoneCall className="w-4 h-4" />
              Atención inmediata
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5">
              ¿Necesitas un técnico hoy?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
              Publica tu solicitud gratis y conecta con técnicos de aire disponibles
              en Panamá en menos de 1 hora.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/registro?tipo=cliente"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-400/40 transition-all duration-300 group"
              >
                Solicitar servicio ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/registro?tipo=tecnico"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-800 font-bold text-lg hover:border-blue-400 transition-all"
              >
                Soy técnico
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-14">
            <div className="sm:col-span-2 md:col-span-1">
               <div className="mb-6">
                <img
                  src="/Logo4.svg"
                  alt="OficiosPro"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Plataforma líder en Panamá para conectar clientes con técnicos de aire acondicionado verificados.
              </p>
              <div className="flex gap-3">
                <Link href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {[
  {
    title: "Plataforma",
    links: [
      ["#servicios", "Servicios"],
      ["#como-funciona", "Cómo funciona"],
      ["#", "Precios"],
      ["#", "Soporte técnico"],
    ],
  },
  {
    title: "Para técnicos",
    links: [
      ["/registro?tipo=tecnico", "Registrarse"],
      ["#tecnicos", "Beneficios"],
      ["#", "Requisitos"],
      ["#", "Centro de ayuda"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["/terminos-condiciones", "Términos y condiciones"],
      ["/politica-privacidad", "Política de privacidad"],
      ["/aviso-legal", "Aviso legal"],
      ["/cookies", "Cookies"],
    ],
  },
].map((col, i) => (
  <div key={i}>
    <h4 className="font-bold text-white mb-5 uppercase text-xs tracking-wider">
      {col.title}
    </h4>
    <ul className="space-y-3">
      {col.links.map(([href, label]) => (
        <li key={label}>
          <Link
            href={href}
            className="text-slate-400 text-sm hover:text-cyan-300 transition-colors"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-slate-500 text-sm">
              © 2026 OficiosPro.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-slate-500 text-xs hover:text-cyan-300 transition-colors">
                Mapa del sitio
              </Link>
              <Link href="#" className="text-slate-500 text-xs hover:text-cyan-300 transition-colors">
                Accesibilidad
              </Link>
              <Link href="#" className="text-slate-500 text-xs hover:text-cyan-300 transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}