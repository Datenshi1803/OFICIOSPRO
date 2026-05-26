
import Link from "next/link"
import Image from "next/image"

export default function HeaderLegal() {
  return (
    <header className="border-b border-slate-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center group justify-self-start">
                      <img
                        src="/Logo3.svg"
                        alt="OficiosPro"
                        className="h-16 w-auto object-contain"
                      />
                    </Link>
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </header>
  )
}