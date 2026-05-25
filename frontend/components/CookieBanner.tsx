"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Solo muestra el banner si el usuario no ha decidido aún
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      // Pequeño delay para que no aparezca de golpe al cargar
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
    // Aquí podrías deshabilitar Analytics si implementas consent mode
  }

  if (!visible) return null

  return (
    <div
      className={`
        fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-xl
        bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60
        px-5 py-4 flex items-start gap-4
        animate-in slide-in-from-bottom-4 fade-in duration-300
      `}
    >
      {/* Icono */}
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Cookie className="w-4 h-4 text-blue-600" />
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900">Este sitio usa cookies</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          Usamos cookies para mejorar tu experiencia y analizar el tráfico.{" "}
          <Link
            href="/cookies"
            className="text-blue-600 hover:underline font-medium"
          >
            Ver política
          </Link>
        </p>

        {/* Botones */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={accept}
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={decline}
            className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            Rechazar
          </button>
        </div>
      </div>

      {/* Cerrar (equivale a rechazar) */}
      <button
        onClick={decline}
        className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
        aria-label="Cerrar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}