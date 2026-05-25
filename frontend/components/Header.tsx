"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Wrench, Snowflake, Settings, Fan, ChevronDown, Menu, X, ArrowRight } from "lucide-react"

const SERVICIOS = [
  {
    href: "/servicios/instalacion",
    icon: Snowflake,
    color: "bg-blue-50 text-blue-600",
    title: "Instalación",
    desc: "Equipos split, inverter y sistemas centrales con garantía.",
  },
  {
    href: "/servicios/reparacion",
    icon: Settings,
    color: "bg-slate-100 text-slate-700",
    title: "Reparación",
    desc: "Diagnóstico de fallas, fugas, tarjetas y compresores.",
  },
  {
    href: "/servicios/mantenimiento",
    icon: Fan,
    color: "bg-cyan-50 text-cyan-600",
    title: "Mantenimiento",
    desc: "Limpieza profunda y ahorro de hasta 30% en energía.",
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [serviciosOpen, setServiciosOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cierra el dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiciosOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      <div
        className={`w-full max-w-[1440px] transition-all duration-500 rounded-[22px] border border-white/70 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/60 py-4 px-7"
            : "bg-white/85 backdrop-blur-xl shadow-lg shadow-slate-200/40 py-4 px-7"
        }`}
      >
        <div className="grid grid-cols-3 items-center">

          {/* LOGO */}
            <Link href="/" className="flex items-center gap-0 justify-self-start">
            <Image 
                src="/engranaje.svg" 
                alt="Logo OficiosPro" 
                width={28} 
                height={28}
                className="-mr-1"  
            />
            <span className="text-2xl font-black tracking-tight text-slate-900">
                ficios<span className="text-blue-500">Pro</span>
            </span>
            </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center justify-center gap-8">

            {/* SERVICIOS con mega menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${
                  serviciosOpen ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Servicios
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${serviciosOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* DROPDOWN MEGA MENU */}
              {serviciosOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden">
                  
                  {/* Header del dropdown */}
                  <div className="px-5 pt-4 pb-3 border-b border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Servicios de aire acondicionado
                    </p>
                  </div>

                  {/* Items */}
                  <div className="p-3">
                    {SERVICIOS.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setServiciosOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-xl ${svc.color} flex items-center justify-center flex-shrink-0`}>
                          <svc.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900">{svc.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{svc.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>

                  {/* Footer del dropdown */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                    <Link
                      href="/registro?tipo=cliente"
                      onClick={() => setServiciosOpen(false)}
                      className="flex items-center justify-between text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                      Publicar trabajo gratis
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/como-funciona"
              className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              Cómo funciona
            </Link>

            <Link
              href="/#tecnicos"
              className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              Para técnicos
            </Link>

          </nav>

          {/* BOTONES DERECHA */}
          <div className="hidden md:flex items-center justify-end gap-7">
            <Link
              href="/login"
              className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[15px] font-bold hover:shadow-xl hover:shadow-blue-300/40 transition-all"
            >
              Registrarse
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden col-start-3 justify-self-end p-2 rounded-lg bg-slate-100 text-slate-700"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-1 border-t border-slate-100 mt-4">

            {/* Servicios expandido en mobile */}
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2 pt-2 pb-1">
              Servicios
            </p>
            {SERVICIOS.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg ${svc.color} flex items-center justify-center flex-shrink-0`}>
                  <svc.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{svc.title}</span>
              </Link>
            ))}

            <div className="border-t border-slate-100 mt-2 pt-2 flex flex-col gap-1">
              {[
                ["/como-funciona", "Cómo funciona"],
                ["/#tecnicos", "Para técnicos"],
                ["/login", "Iniciar sesión"],
                ["/registro", "Registrarse"],
              ].map(([href, label]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 px-2"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}