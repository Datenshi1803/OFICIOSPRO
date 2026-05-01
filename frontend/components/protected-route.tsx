"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: ("client" | "technician" | "admin")[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return
    // SOLO proteger rutas privadas
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if (!isAuthenticated && isProtectedRoute) {
      router.replace(`/`)
=======
    // Si no está autenticado y no estamos en login, redirigir al login
    if (!isAuthenticated && pathname !== "/login") {
      router.push(`/login?redirect=${pathname}`)
>>>>>>> 09edeb1 (LOGOUT FUNCIONANDO falta redirigir al landing)
=======
    if (!isAuthenticated && isProtectedRoute) {
      router.replace(`/`)
>>>>>>> 7a8113c (Logout Funcionando 100%)
=======
    if (!isAuthenticated && isProtectedRoute) {
      router.replace(`/`)
>>>>>>> 7a8113c (Logout Funcionando 100%)
      return
    }

    // Si el rol no está permitido, redirigir al dashboard correcto
    if (user && !allowedRoles.includes(user.role)) {
      const redirectMap = {
        technician: "/dashboard/tecnico",
        admin: "/admin",
        client: "/dashboard/cliente",
      }
      router.push(redirectMap[user.role])
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router, pathname])

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }
  console.log("User:", user, "Path:", pathname)

  // Si no tiene acceso, no mostrar nada (esperando redirección)
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null
  }

  return <>{children}</>
}

// Componente para páginas que solo pueden ver técnicos
export function TechnicianOnly({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["technician"]}>{children}</ProtectedRoute>
}

// Componente para páginas que solo pueden ver clientes
export function ClientOnly({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["client"]}>{children}</ProtectedRoute>
}

// Componente para páginas que solo pueden ver administradores
export function AdminOnly({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
}

// Componente para páginas que pueden ver técnicos y administradores
export function TechnicianOrAdmin({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["technician", "admin"]}>{children}</ProtectedRoute>
}