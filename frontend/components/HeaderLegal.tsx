
import Link from "next/link"
import Image from "next/image"

export default function HeaderLegal() {
  return (
    <header className="border-b border-slate-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-0">
          <Image src="/engranaje.svg" alt="Logo OficiosPro" width={28} height={28} className="-mr-1" />
          <span className="text-xl font-black tracking-tight text-slate-900">
            ficios<span className="text-blue-500">Pro</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </header>
  )
}