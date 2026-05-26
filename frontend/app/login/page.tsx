"use client"

import { Suspense, useState,useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* LEFT PANEL — Branding (oculto en mobile) */}
      <div className="relative hidden w-1/2 bg-sidebar lg:block">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2),transparent_50%)] pointer-events-none" />
        <div className="flex h-full flex-col justify-between p-12">
 
          {/* Logo modo oscuro */}
          <Link href="/" className="flex items-center gap-0" aria-label="Volver al inicio de OficiosPro">
            <Image
              src="/engranaje.svg"
              alt="Logo OficiosPro"
              width={36}
              height={36}
              className="-mr-1"
            />
            <span className="text-2xl font-black tracking-tight text-white">
              ficios<span className="text-blue-400">Pro</span>
            </span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-sidebar-foreground">
              Encuentra técnicos confiables para tu hogar
            </h1>
            <p className="text-lg text-sidebar-foreground/70">
              Más de 500 técnicos verificados listos para ayudarte con el mantenimiento
              y reparación de tu aire acondicionado.
            </p>
          </div>

          <p className="text-sm text-sidebar-foreground/50">
            &copy; 2026 OficiosPro. Panamá.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Formulario */}
      <div className="flex w-full flex-col lg:w-1/2">

        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
          <Link href="/" className="flex items-center gap-0" aria-label="Volver al inicio de OficiosPro">
            <Image
              src="/engranaje.svg"
              alt="Logo OficiosPro"
              width={28}
              height={28}
              className="-mr-1"
            />
            <span className="text-xl font-black tracking-tight text-foreground">
              Oficios<span className="text-blue-500">Pro</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        {/* Suspense requerido por useSearchParams */}
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}