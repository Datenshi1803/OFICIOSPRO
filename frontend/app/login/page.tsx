"use client"

import { Suspense, useState,useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import { Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Loader2,
  CheckCircle,
  ShieldCheck,
  Star,
  Users, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { loginUser } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { validateEmail } from "@/lib/validations"

// ─── SEO METADATA ─────────────────────────────────────────────────────────────
// Nota: como este archivo es "use client", el metadata debe ir en un
// layout.tsx padre o en un archivo separado. Aquí lo dejamos documentado:
//
// export const metadata = {
//   title: "Iniciar Sesión | OficiosPro",
//   description: "Accede a tu cuenta en OficiosPro y conecta con técnicos verificados de aire acondicionado en Panamá.",
//   robots: { index: false, follow: false }, // no indexar páginas de auth
// }

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const registered = searchParams.get("registered")
  const email = searchParams.get("email") || ""

  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formErrors, setFormErrors] = useState({
    email: "",
  })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const redirectParam = searchParams.get("redirect")

  const [showSuccess, setShowSuccess] = useState(registered === "true")

useEffect(() => {
  if (registered === "true") {
    const timer = setTimeout(() => {
      setShowSuccess(false)
    }, 5000)

    return () => clearTimeout(timer)
  }
}, [registered])
 
  // Sincronizar email desde query params
  useEffect(() => {
    if (email) {

      setFormData((prev) => ({
        ...prev,
        email,
      }))
    }
  }, [email])

  // DEBUG estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      setFormErrors({ email: emailValidation.message })
      return
    }

    if (!formData.password) {
      setError("Por favor ingresa tu contraseña")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      })

      if (response.token && response.user) {
        login(response.token, response.user)
        if (redirectParam && redirectParam !== "/login") {
          router.push(redirectParam)
        }
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
      <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Iniciar Sesión
          </CardTitle>

          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* DEBUG VISUAL */}
          {showSuccess && (
          <div className="mb-4 flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
            <span>✓ Cuenta creada correctamente</span>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="ml-3 text-green-600 opacity-70 hover:opacity-100"
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Correo electrónico
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                    if (e.target.value.trim()) {
                      const validation = validateEmail(e.target.value)
                      setFormErrors({ email: validation.isValid ? "" : validation.message })
                    } else {
                      setFormErrors({ email: "" })
                    }
                  }}
                  required
                />
              </div>
              {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Contraseña
                </Label>

                <Link
                  href="/recuperar-password"
                  className="text-xs text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  required
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                checked={formData.remember}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    remember: e.target.checked,
                  })
                }
              />

              <Label
                htmlFor="remember"
                className="text-sm font-normal text-muted-foreground"
              >
                Recordarme por 30 días
              </Label>
            </div>

            <Button
  type="submit"
  className="w-full"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Iniciando sesión...
    </>
  ) : (
    "Iniciar Sesión"
  )}
</Button>

<div className="relative">
  <Separator />
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
    o continúa con
  </span>
</div>

<Button
  type="button"
  variant="outline"
  className="w-full gap-2"
>
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    {/* SVG de Google */}
  </svg>
  Continuar con Google
</Button>

<p className="mt-6 text-center text-sm text-muted-foreground">
  ¿No tienes cuenta?{" "}
  <Link
    href="/registro"
    className="font-medium text-primary hover:underline"
  >
    Regístrate aquí
  </Link>
</p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6fbff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.20),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.16),transparent_35%)]" />

      <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.20),transparent_35%)]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:26px_26px]" />

          <Link href="/" className="relative z-10 flex items-center">
            <img
              src="/Logo4.svg"
              alt="OficiosPro"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="relative z-10 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <Star className="h-4 w-4 text-yellow-300" />
              +500 técnicos verificados
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Servicios técnicos{" "}
              <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
                confiables
              </span>{" "}
              para tu hogar
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
              Encuentra profesionales verificados para mantenimiento,
              reparación e instalación de servicios en casa.
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
            <p>© 2026 OficiosPro</p>
            <div className="flex gap-5">
              <Link href="#">Términos</Link>
              <Link href="#">Privacidad</Link>
              <Link href="#">Ayuda</Link>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/70 p-4 backdrop-blur lg:hidden">
            <Link href="/" className="flex items-center">
              <img
                src="/Logo3.png"
                alt="OficiosPro"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <Link href="/" className="flex items-center gap-1 text-sm text-slate-500">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </section>
      </div>
    </main>
  )
}