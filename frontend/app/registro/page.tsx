"use client"

import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Wrench, Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Building, CreditCard, Star, ShieldCheck, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from "@marsidev/react-turnstile"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { registerUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import {
  validateNombre,
  validateEmail,
  validateTelefono,
  validatePassword,
  validateCedula,
  filterNombre,
  filterTelefono,
  filterCedula,
  isPasswordValid,
  getPasswordRequirements,
} from "@/lib/validations"
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator"

const ubicacionesPanama = {
  provincias: [
    { id: "panama", nombre: "Panamá" },
    { id: "colon", nombre: "Colón" },
    { id: "chiriqui", nombre: "Chiriquí" },
    { id: "cocle", nombre: "Coclé" },
    { id: "herrera", nombre: "Herrera" },
    { id: "los-santos", nombre: "Los Santos" },
    { id: "veraguas", nombre: "Veraguas" },
    { id: "darien", nombre: "Darién" },
  ],
  distritos: {
    panama: [
      { id: "panama-centro", nombre: "Panamá Centro" },
      { id: "san-francisco", nombre: "San Francisco" },
      { id: "bella-vista", nombre: "Bella Vista" },
      { id: "punta-pacifica", nombre: "Punta Pacífica" },
      { id: "costa-del-este", nombre: "Costa del Este" },
      { id: "san-miguelito", nombre: "San Miguelito" },
      { id: "parque-lehmann", nombre: "Parque Lhmann" },
      { id: "24-de-diciembre", nombre: "24 de Diciembre" },
    ],
    colon: [
      { id: "colon", nombre: "Colón" },
      { id: "coco-sole", nombre: "Coco Sole" },
      { id: "sabanitas", nombre: "Sabanitas" },
      { id: "chagres", nombre: "Chagres" },
    ],
    chiriqui: [
      { id: "david", nombre: "David" },
      { id: "boquete", nombre: "Boquete" },
      { id: "volcan", nombre: "Volcán" },
      { id: "bugaba", nombre: "Bugaba" },
    ],
    cocle: [
      { id: "penonome", nombre: "Penonomé" },
      { id: "antón", nombre: "Antón" },
      { id: "capellania", nombre: "Capellanía" },
    ],
    herrera: [
      { id: "chitre", nombre: "Chitré" },
      { id: "parita", nombre: "Parita" },
      { id: "pesé", nombre: "Pesé" },
    ],
    "los-santos": [
      { id: "las-tablas", nombre: "Las Tablas" },
      { id: "macaracas", nombre: "Macaracas" },
      { id: "pedasi", nombre: "Pedasí" },
    ],
    veraguas: [
      { id: "santiago", nombre: "Santiago" },
      { id: "calobre", nombre: "Calobre" },
      { id: "cazales", nombre: "Cazales" },
    ],
    darien: [
      { id: "yaviza", nombre: "Yaviza" },
      { id: "pinogana", nombre: "Pinogana" },
    ],
  },
  corregimientos: {
    "panama-centro": [
      { id: "casco-antiguo", nombre: "Casco Antiguo" },
      { id: "santa-ana", nombre: "Santa Ana" },
      { id: "calle-12", nombre: "Calle 12" },
      { id: "el-cangrejo", nombre: "El Cangrejo" },
      { id: "obarrio", nombre: "Obarrio" },
    ],
    "san-francisco": [
      { id: "san-francisco", nombre: "San Francisco" },
      { id: "jose-domingo", nombre: "José Domingo" },
    ],
    "bella-vista": [
      { id: "bella-vista", nombre: "Bella Vista" },
      { id: "marbella", nombre: "Marbella" },
    ],
    "punta-pacifica": [{ id: "punta-pacifica", nombre: "Punta Pacífica" }],
    "costa-del-este": [{ id: "costa-del-este", nombre: "Costa del Este" }],
    "san-miguelito": [
      { id: "san-miguelito", nombre: "San Miguelito" },
      { id: "victoria", nombre: "Victoria" },
    ],
    colon: [
      { id: "colon-centro", nombre: "Colón Centro" },
      { id: "nueva-colon", nombre: "Nueva Colón" },
    ],
    david: [
      { id: "david-centro", nombre: "David Centro" },
      { id: "bajo-boquete", nombre: "Bajo Boquete" },
    ],
    penonome: [
      { id: "penonome-centro", nombre: "Penonomé Centro" },
      { id: "cabuya", nombre: "Cabuya" },
    ],
    chitre: [
      { id: "chitre-centro", nombre: "Chitré Centro" },
      { id: "llano-bonito", nombre: "Llano Bonito" },
    ],
    santiago: [
      { id: "santiago-centro", nombre: "Santiago Centro" },
      { id: "canto-del-llano", nombre: "Canto del Llano" },
    ],
  },
}

function RegisterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const defaultTab = searchParams.get("tipo") === "tecnico" ? "tecnico" : "cliente"

  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)

  // ── Turnstile — tokens separados por formulario ────────────────────────────
  const [clienteCaptcha, setClienteCaptcha] = useState<string | null>(null)
  const [tecnicoCaptcha, setTecnicoCaptcha] = useState<string | null>(null)
  const clienteTurnstileRef = useRef<TurnstileInstance>(null)
  const tecnicoTurnstileRef = useRef<TurnstileInstance>(null)

  // ── Estado cliente ─────────────────────────────────────────────────────────
  const [clienteData, setClienteData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    zona: "",
    provincia: "",
    distrito: "",
    corregimiento: "",
  })
  const [clienteErrors, setClienteErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  })
  const [clienteProvincia, setClienteProvincia] = useState("")
  const [clienteDistrito, setClienteDistrito] = useState("")
  const [clienteCorregimiento, setClienteCorregimiento] = useState("")

  const distritosOptions = clienteProvincia
    ? ubicacionesPanama.distritos[clienteProvincia as keyof typeof ubicacionesPanama.distritos] || []
    : []
  const corregimientosOptions = clienteDistrito
    ? ubicacionesPanama.corregimientos[clienteDistrito as keyof typeof ubicacionesPanama.corregimientos] || []
    : []

  // ── Estado técnico ─────────────────────────────────────────────────────────
  const [tecnicoData, setTecnicoData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    cedula: "",
    zonas: [] as string[],
    descripcion: "",
    experiencia: "",
    specialty: "",
    provincia: "",
    distrito: "",
    corregimiento: "",
  })
  const [tecnicoErrors, setTecnicoErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    cedula: "",
  })
  const [tecnicoProvincia, setTecnicoProvincia] = useState("")
  const [tecnicoDistrito, setTecnicoDistrito] = useState("")
  const [tecnicoCorregimiento, setTecnicoCorregimiento] = useState("")

  const tecnicoDistritosOptions = tecnicoProvincia
    ? ubicacionesPanama.distritos[tecnicoProvincia as keyof typeof ubicacionesPanama.distritos] || []
    : []
  const tecnicoCorregimientosOptions = tecnicoDistrito
    ? ubicacionesPanama.corregimientos[tecnicoDistrito as keyof typeof ubicacionesPanama.corregimientos] || []
    : []

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleClienteSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Validar todos los campos antes de enviar
  const nombreValidation = validateNombre(clienteData.nombre)
  const emailValidation = validateEmail(clienteData.email)
  const telefonoValidation = validateTelefono(clienteData.telefono)
  const passwordValid = isPasswordValid(clienteData.password)

  if (!nombreValidation.isValid || !emailValidation.isValid || !telefonoValidation.isValid || !passwordValid) {
    setClienteErrors({
      nombre: nombreValidation.isValid ? "" : nombreValidation.message,
      email: emailValidation.isValid ? "" : emailValidation.message,
      telefono: telefonoValidation.isValid ? "" : telefonoValidation.message,
      password: !passwordValid ? "La contraseña no cumple todos los requisitos" : "",
    })
    toast.error("Por favor, completa los campos requeridos correctamente")
    return
  }

  if (!clienteCaptcha) {
    alert("Por favor completa la verificación de seguridad")
    return
  }

  try {
    await registerUser({
      name: clienteData.nombre,
      email: clienteData.email,
      password: clienteData.password,
      phone: clienteData.telefono,
      role: "client",
      provincia: clienteProvincia,
      distrito: clienteDistrito,
      corregimiento: clienteCorregimiento,
      captchaToken: clienteCaptcha,
    })

    toast.success("Cuenta creada correctamente")

    router.push(
      `/login?registered=true&email=${encodeURIComponent(clienteData.email)}`
    )
  } catch (error: any) {
    console.error("Error en registro:", error)
    alert(error.message || "Error al registrar usuario")
    clienteTurnstileRef.current?.reset()
    setClienteCaptcha(null)
  }
}

  const handleTecnicoSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Validar campos del paso 1
  const nombreValidation = validateNombre(tecnicoData.nombre)
  const emailValidation = validateEmail(tecnicoData.email)
  const telefonoValidation = validateTelefono(tecnicoData.telefono)
  const passwordValid = isPasswordValid(tecnicoData.password)
  const cedulaValidation = validateCedula(tecnicoData.cedula)

  if (!nombreValidation.isValid || !emailValidation.isValid || !telefonoValidation.isValid || !passwordValid || !cedulaValidation.isValid) {
    setTecnicoErrors({
      nombre: nombreValidation.isValid ? "" : nombreValidation.message,
      email: emailValidation.isValid ? "" : emailValidation.message,
      telefono: telefonoValidation.isValid ? "" : telefonoValidation.message,
      password: !passwordValid ? "La contraseña no cumple todos los requisitos" : "",
      cedula: cedulaValidation.isValid ? "" : cedulaValidation.message,
    })
    toast.error("Por favor, completa los campos requeridos correctamente")
    return
  }

  if (step === 1) {
    setStep(2)
    setTecnicoCaptcha(null)
    return
  }

  if (!tecnicoCaptcha) {
    alert("Por favor completa la verificación de seguridad")
    return
  }

  try {
    await registerUser({
      name: tecnicoData.nombre,
      email: tecnicoData.email,
      password: tecnicoData.password,
      phone: tecnicoData.telefono,
      role: "technician",
      provincia: tecnicoProvincia,
      distrito: tecnicoDistrito,
      corregimiento: tecnicoCorregimiento,
      cedula: tecnicoData.cedula,
      specialty: tecnicoData.specialty,
      description: tecnicoData.descripcion,
      experience_years: parseInt(tecnicoData.experiencia) || 0,
      captchaToken: tecnicoCaptcha,
    })

    toast.success("Cuenta creada correctamente")

    router.push(
      `/login?registered=true&email=${encodeURIComponent(tecnicoData.email)}`
    )
  } catch (error: any) {
    console.error("Error en registro:", error)
    alert(error.message || "Error al registrar usuario")
    tecnicoTurnstileRef.current?.reset()
    setTecnicoCaptcha(null)
  }
}

  // ── Pantalla de éxito ──────────────────────────────────────────────────────
  

  return (
    <main className="relative bg-background">
      {/* Gradient de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.10),transparent_50%)]" />

      <div className="relative grid h-screen overflow-hidden lg:grid-cols-2">

        {/* ── LEFT PANEL — Branding (fijo, no scrollea) ───────────────── */}

      <section className="relative hidden sticky top-0 h-screen overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.20),transparent_35%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:26px_26px]" />

        <Link href="/" className="relative z-10 flex items-center">
          <img src="/Logo4.svg" alt="OficiosPro" className="h-16 w-auto object-contain" />
        </Link>

        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
            <Star className="h-4 w-4 text-yellow-300" />
            +500 técnicos verificados
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tight">
            {activeTab === "cliente"
              ? "Encuentra al técnico perfecto para tu hogar"
              : "Únete a nuestra red de profesionales"}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
            {activeTab === "cliente"
              ? "Publica tu trabajo, recibe cotizaciones y elige la mejor opción. Sin complicaciones."
              : "Accede a más clientes, construye tu reputación digital y aumenta tus ingresos."}
          </p>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ShieldCheck className="mb-3 h-6 w-6 text-emerald-300" />
              <p className="text-sm font-semibold">Seguro</p>
              <p className="mt-1 text-xs text-slate-400">Servicios verificados</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <Users className="mb-3 h-6 w-6 text-sky-300" />
              <p className="text-sm font-semibold">Expertos</p>
              <p className="mt-1 text-xs text-slate-400">Técnicos certificados</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <CheckCircle className="mb-3 h-6 w-6 text-cyan-300" />
              <p className="text-sm font-semibold">Rápido</p>
              <p className="mt-1 text-xs text-slate-400">Atención eficiente</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-slate-500">
          <p>© 2025 OficiosPro</p>
          <div className="flex gap-5">
            <Link href="/terminos" className="hover:text-slate-300 transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-slate-300 transition-colors">Privacidad</Link>
            <Link href="/ayuda" className="hover:text-slate-300 transition-colors">Ayuda</Link>
          </div>
        </div>
      </section>


       {/* ── RIGHT PANEL — Formulario (este es el que scrollea) ───────── */}
        <section className="relative flex flex-col overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
            <Link href="/" className="relative z-10 flex items-center">
          <img src="/Logo3.svg" alt="OficiosPro" className="h-16 w-auto object-contain" />
        </Link>
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
            <Card className="w-full max-w-lg border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
              <CardDescription>Selecciona el tipo de cuenta que deseas crear</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => {
                  setActiveTab(v)
                  setStep(1)
                  setClienteCaptcha(null)
                  setTecnicoCaptcha(null)
                }}
              >
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="cliente" className="gap-2">
                    <User className="h-4 w-4" />
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger value="tecnico" className="gap-2">
                    <Building className="h-4 w-4" />
                    Técnico
                  </TabsTrigger>
                </TabsList>

                {/* ── Cliente Form ─────────────────────────────────────────── */}
                <TabsContent value="cliente">
                  <form onSubmit={handleClienteSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cliente-nombre">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-nombre"
                          placeholder="Tu nombre completo"
                          className={`pl-10 ${clienteErrors.nombre ? "border-red-500" : ""}`}
                          autoComplete="name"
                          value={clienteData.nombre}
                          onChange={(e) => {
                            const filtered = filterNombre(e.target.value)
                            setClienteData({ ...clienteData, nombre: filtered })
                            if (filtered.trim()) {
                              const validation = validateNombre(filtered)
                              setClienteErrors({ ...clienteErrors, nombre: validation.isValid ? "" : validation.message })
                            } else {
                              setClienteErrors({ ...clienteErrors, nombre: "" })
                            }
                          }}
                          required
                        />
                      </div>
                      {clienteErrors.nombre && <p className="text-xs text-red-500">{clienteErrors.nombre}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-email"
                          type="email"
                          placeholder="tu@correo.com"
                          className={`pl-10 ${clienteErrors.email ? "border-red-500" : ""}`}
                          autoComplete="email"
                          value={clienteData.email}
                          onChange={(e) => {
                            setClienteData({ ...clienteData, email: e.target.value })
                            if (e.target.value.trim()) {
                              const validation = validateEmail(e.target.value)
                              setClienteErrors({ ...clienteErrors, email: validation.isValid ? "" : validation.message })
                            } else {
                              setClienteErrors({ ...clienteErrors, email: "" })
                            }
                          }}
                          required
                        />
                      </div>
                      {clienteErrors.email && <p className="text-xs text-red-500">{clienteErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-telefono">Teléfono móvil</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-telefono"
                          type="tel"
                          placeholder="6000-0000"
                          className={`pl-10 ${clienteErrors.telefono ? "border-red-500" : ""}`}
                          autoComplete="tel"
                          value={clienteData.telefono}
                          onChange={(e) => {
                            const filtered = filterTelefono(e.target.value)
                            setClienteData({ ...clienteData, telefono: filtered })
                            if (filtered.trim()) {
                              const validation = validateTelefono(filtered)
                              setClienteErrors({ ...clienteErrors, telefono: validation.isValid ? "" : validation.message })
                            } else {
                              setClienteErrors({ ...clienteErrors, telefono: "" })
                            }
                          }}
                          required
                        />
                      </div>
                      {clienteErrors.telefono && <p className="text-xs text-red-500">{clienteErrors.telefono}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-provincia">Provincia</Label>
                      <Select
                        value={clienteProvincia}
                        onValueChange={(v) => {
                          setClienteProvincia(v)
                          setClienteDistrito("")
                          setClienteCorregimiento("")
                          setClienteData({ ...clienteData, provincia: v, distrito: "", corregimiento: "" })
                        }}
                      >
                        <SelectTrigger id="cliente-provincia">
                          <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {ubicacionesPanama.provincias.map((p) => (
                            <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-distrito">Distrito</Label>
                      <Select
                        value={clienteDistrito}
                        onValueChange={(v) => {
                          setClienteDistrito(v)
                          setClienteCorregimiento("")
                          setClienteData({ ...clienteData, distrito: v, corregimiento: "" })
                        }}
                        disabled={!clienteProvincia}
                      >
                        <SelectTrigger id="cliente-distrito">
                          <SelectValue placeholder="Selecciona tu distrito" />
                        </SelectTrigger>
                        <SelectContent>
                          {distritosOptions.map((d: any) => (
                            <SelectItem key={d.id} value={d.id}>{d.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-corregimiento">Corregimiento</Label>
                      <Select
                        value={clienteCorregimiento}
                        onValueChange={(v) => {
                          setClienteCorregimiento(v)
                          setClienteData({ ...clienteData, corregimiento: v })
                        }}
                        disabled={!clienteDistrito}
                      >
                        <SelectTrigger id="cliente-corregimiento">
                          <SelectValue placeholder="Selecciona tu corregimiento" />
                        </SelectTrigger>
                        <SelectContent>
                          {corregimientosOptions.map((c: any) => (
                            <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          className={`pl-10 pr-10 ${clienteErrors.password ? "border-red-500" : ""}`}
                          autoComplete="new-password"
                          value={clienteData.password}
                          onChange={(e) => {
                            setClienteData({ ...clienteData, password: e.target.value })
                            if (!e.target.value.trim()) {
                              setClienteErrors({ ...clienteErrors, password: "" })
                            }
                          }}
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {clienteData.password ? (
                        <PasswordStrengthIndicator password={clienteData.password} showDetails={true} />
                      ) : (
                        <p className="text-xs text-muted-foreground">Ingresa una contraseña fuerte</p>
                      )}
                      {clienteErrors.password && <p className="text-xs text-red-500 font-medium">{clienteErrors.password}</p>}
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="cliente-terms"
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        required
                      />
                      <Label htmlFor="cliente-terms" className="text-sm font-normal text-muted-foreground">
                        Acepto los{" "}
                        <Link href="/terminos" className="text-primary hover:underline">Términos de uso</Link>
                        {" "}y la{" "}
                        <Link href="/privacidad" className="text-primary hover:underline">Política de privacidad</Link>
                      </Label>
                    </div>

                    <Turnstile
                      ref={clienteTurnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                      onSuccess={setClienteCaptcha}
                      onError={() => setClienteCaptcha(null)}
                      onExpire={() => setClienteCaptcha(null)}
                    />

                    <Button type="submit" className="w-full" disabled={!clienteCaptcha}>
                      Crear Cuenta de Cliente
                    </Button>

                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        o continúa con
                      </span>
                    </div>

                    <Button type="button" variant="outline" className="w-full gap-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continuar con Google
                    </Button>
                  </form>
                </TabsContent>

                {/* ── Técnico Form ─────────────────────────────────────────── */}
                <TabsContent value="tecnico">
                  <form onSubmit={handleTecnicoSubmit} className="space-y-4">
                    {step === 1 ? (
                      <>
                        <div className="mb-4 rounded-lg bg-primary/10 p-3">
                          <p className="text-sm text-primary">
                            <strong>Paso 1 de 2:</strong> Información personal
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-nombre">Nombre completo</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-nombre"
                              placeholder="Tu nombre completo"
                              className={`pl-10 ${tecnicoErrors.nombre ? "border-red-500" : ""}`}
                              autoComplete="name"
                              value={tecnicoData.nombre}
                              onChange={(e) => {
                                const filtered = filterNombre(e.target.value)
                                setTecnicoData({ ...tecnicoData, nombre: filtered })
                                if (filtered.trim()) {
                                  const validation = validateNombre(filtered)
                                  setTecnicoErrors({ ...tecnicoErrors, nombre: validation.isValid ? "" : validation.message })
                                } else {
                                  setTecnicoErrors({ ...tecnicoErrors, nombre: "" })
                                }
                              }}
                              required
                            />
                          </div>
                          {tecnicoErrors.nombre && <p className="text-xs text-red-500">{tecnicoErrors.nombre}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-email">Correo electrónico</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-email"
                              type="email"
                              placeholder="tu@correo.com"
                              className={`pl-10 ${tecnicoErrors.email ? "border-red-500" : ""}`}
                              autoComplete="email"
                              value={tecnicoData.email}
                              onChange={(e) => {
                                setTecnicoData({ ...tecnicoData, email: e.target.value })
                                if (e.target.value.trim()) {
                                  const validation = validateEmail(e.target.value)
                                  setTecnicoErrors({ ...tecnicoErrors, email: validation.isValid ? "" : validation.message })
                                } else {
                                  setTecnicoErrors({ ...tecnicoErrors, email: "" })
                                }
                              }}
                              required
                            />
                          </div>
                          {tecnicoErrors.email && <p className="text-xs text-red-500">{tecnicoErrors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-telefono">Teléfono móvil</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-telefono"
                              type="tel"
                              placeholder="6000-0000"
                              className={`pl-10 ${tecnicoErrors.telefono ? "border-red-500" : ""}`}
                              autoComplete="tel"
                              value={tecnicoData.telefono}
                              onChange={(e) => {
                                const filtered = filterTelefono(e.target.value)
                                setTecnicoData({ ...tecnicoData, telefono: filtered })
                                if (filtered.trim()) {
                                  const validation = validateTelefono(filtered)
                                  setTecnicoErrors({ ...tecnicoErrors, telefono: validation.isValid ? "" : validation.message })
                                } else {
                                  setTecnicoErrors({ ...tecnicoErrors, telefono: "" })
                                }
                              }}
                              required
                            />
                          </div>
                          {tecnicoErrors.telefono && <p className="text-xs text-red-500">{tecnicoErrors.telefono}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-cedula">Cédula panameña</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-cedula"
                              placeholder="8-888-8888"
                              className={`pl-10 ${tecnicoErrors.cedula ? "border-red-500" : ""}`}
                              autoComplete="off"
                              value={tecnicoData.cedula}
                              onChange={(e) => {
                                const filtered = filterCedula(e.target.value)
                                setTecnicoData({ ...tecnicoData, cedula: filtered })
                                if (filtered.trim()) {
                                  const validation = validateCedula(filtered)
                                  setTecnicoErrors({ ...tecnicoErrors, cedula: validation.isValid ? "" : validation.message })
                                } else {
                                  setTecnicoErrors({ ...tecnicoErrors, cedula: "" })
                                }
                              }}
                              required
                            />
                          </div>
                          {tecnicoErrors.cedula ? (
                            <p className="text-xs text-red-500">{tecnicoErrors.cedula}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">Requerida para verificación de identidad</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-password">Contraseña</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Mínimo 8 caracteres"
                              className={`pl-10 pr-10 ${tecnicoErrors.password ? "border-red-500" : ""}`}
                              autoComplete="new-password"
                              value={tecnicoData.password}
                              onChange={(e) => {
                                setTecnicoData({ ...tecnicoData, password: e.target.value })
                                if (!e.target.value.trim()) {
                                  setTecnicoErrors({ ...tecnicoErrors, password: "" })
                                }
                              }}
                              required
                              minLength={8}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {tecnicoData.password ? (
                            <PasswordStrengthIndicator password={tecnicoData.password} showDetails={true} />
                          ) : (
                            <p className="text-xs text-muted-foreground">Ingresa una contraseña fuerte</p>
                          )}
                          {tecnicoErrors.password && <p className="text-xs text-red-500 font-medium">{tecnicoErrors.password}</p>}
                        </div>

                        <Button type="submit" className="w-full">
                          Continuar
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 rounded-lg bg-primary/10 p-3">
                          <p className="text-sm text-primary">
                            <strong>Paso 2 de 2:</strong> Información profesional
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-provincia">Provincia</Label>
                          <Select
                            value={tecnicoProvincia}
                            onValueChange={(v) => {
                              setTecnicoProvincia(v)
                              setTecnicoDistrito("")
                              setTecnicoCorregimiento("")
                              setTecnicoData({ ...tecnicoData, provincia: v, distrito: "", corregimiento: "" })
                            }}
                          >
                            <SelectTrigger id="tecnico-provincia">
                              <SelectValue placeholder="Selecciona tu provincia" />
                            </SelectTrigger>
                            <SelectContent>
                              {ubicacionesPanama.provincias.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-distrito">Distrito</Label>
                          <Select
                            value={tecnicoDistrito}
                            onValueChange={(v) => {
                              setTecnicoDistrito(v)
                              setTecnicoCorregimiento("")
                              setTecnicoData({ ...tecnicoData, distrito: v, corregimiento: "" })
                            }}
                            disabled={!tecnicoProvincia}
                          >
                            <SelectTrigger id="tecnico-distrito">
                              <SelectValue placeholder="Selecciona tu distrito" />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnicoDistritosOptions.map((d: any) => (
                                <SelectItem key={d.id} value={d.id}>{d.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-corregimiento">Corregimiento</Label>
                          <Select
                            value={tecnicoCorregimiento}
                            onValueChange={(v) => {
                              setTecnicoCorregimiento(v)
                              setTecnicoData({ ...tecnicoData, corregimiento: v })
                            }}
                            disabled={!tecnicoDistrito}
                          >
                            <SelectTrigger id="tecnico-corregimiento">
                              <SelectValue placeholder="Selecciona tu corregimiento" />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnicoCorregimientosOptions.map((c: any) => (
                                <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-experiencia">Años de experiencia</Label>
                          <Select
                            value={tecnicoData.experiencia}
                            onValueChange={(v) => setTecnicoData({ ...tecnicoData, experiencia: v })}
                          >
                            <SelectTrigger id="tecnico-experiencia">
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Menos de 1 año</SelectItem>
                              <SelectItem value="1">1-3 años</SelectItem>
                              <SelectItem value="3">3-5 años</SelectItem>
                              <SelectItem value="5">5-10 años</SelectItem>
                              <SelectItem value="10">Más de 10 años</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-specialty">Especialidad principal</Label>
                          <Select
                            value={tecnicoData.specialty || ""}
                            onValueChange={(v) => setTecnicoData({ ...tecnicoData, specialty: v })}
                          >
                            <SelectTrigger id="tecnico-specialty">
                              <SelectValue placeholder="Selecciona tu especialidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Refrigeracion">Refrigeración</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-descripcion">Descripción de servicios</Label>
                          <Textarea
                            id="tecnico-descripcion"
                            placeholder="Describe los servicios que ofreces, tus especialidades y cualquier certificación relevante..."
                            className="min-h-[100px]"
                            value={tecnicoData.descripcion}
                            onChange={(e) => setTecnicoData({ ...tecnicoData, descripcion: e.target.value })}
                            maxLength={500}
                          />
                          <p className="text-xs text-muted-foreground">{tecnicoData.descripcion.length}/500 caracteres</p>
                        </div>

                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            id="tecnico-terms"
                            className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                            required
                          />
                          <Label htmlFor="tecnico-terms" className="text-sm font-normal text-muted-foreground">
                            Acepto los{" "}
                            <Link href="/terminos" className="text-primary hover:underline">Términos de uso</Link>
                            , la{" "}
                            <Link href="/privacidad" className="text-primary hover:underline">Política de privacidad</Link>
                            {" "}y la comisión del 10% por trabajo cerrado
                          </Label>
                        </div>

                        <Turnstile
                          ref={tecnicoTurnstileRef}
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                          onSuccess={setTecnicoCaptcha}
                          onError={() => setTecnicoCaptcha(null)}
                          onExpire={() => setTecnicoCaptcha(null)}
                        />

                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setStep(1)
                              setTecnicoCaptcha(null)
                            }}
                          >
                            Atrás
                          </Button>
                          <Button type="submit" className="flex-1" disabled={!tecnicoCaptcha}>
                            Crear Cuenta
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                </TabsContent>
              </Tabs>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardContent>
          </Card>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <RegisterContent />
    </Suspense>
  )
}