"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: "client" | "technician" | "admin"
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  hasRole: (roles: string[]) => boolean
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario al iniciar
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    setIsLoading(true)
    
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        
        // Verificar que el usuario esté activo
        if (parsedUser.is_active === false) {
          logout()
          return
        }

        setUser(parsedUser)
      } catch {
        logout()
      }
    } else {
      setUser(null)
    }

    setIsLoading(false)
  }

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)

    // Redireccionar según el rol
    if (userData.role === "technician") {
      router.push("/dashboard/tecnico")
    } else if (userData.role === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard/cliente")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

// Hook para proteger rutas según rol
export function useRoleGuard(allowedRoles: string[]) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (user && !allowedRoles.includes(user.role)) {
        // Redireccionar al dashboard correcto según el rol
        if (user.role === "technician") {
          router.push("/dashboard/tecnico")
        } else if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard/cliente")
        }
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router])

  return { user, isLoading, isAuthenticated }
}