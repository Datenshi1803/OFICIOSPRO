"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
// Rutas relativas corregidas a 3 niveles para llegar a la raíz de frontend
import { useAuth } from "../../../hooks/use-auth"
import {
  ArrowLeft,
  Save,
  Bell,
  Lock,
  User,
  Palette,
  Mail,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"

export default function AdminConfiguracion() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Marcamos un avatar por defecto ya que no existe el estado global avatar
  const avatar = null 

  const handleSaveProfile = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus preferences y configuración de cuenta</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="apariencia">Apariencia</TabsTrigger>
          </TabsList>

          {/* Tab: Perfil */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información del Perfil
                </CardTitle>
                <CardDescription>Actualiza tu información personal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    {avatar ? (
                      <AvatarImage src={avatar} alt={user?.name} />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {user?.name?.slice(0, 2).toUpperCase() || "AD"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button variant="outline">Cambiar avatar</Button>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nombre completo</label>
                  <Input
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Correo electrónico</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                  />
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Guardando..." : <><Save className="mr-2 h-4 w-4" />Guardar cambios</>}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Seguridad */}
          <TabsContent value="seguridad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Cambiar Contraseña
                </CardTitle>
                <CardDescription>Actualiza tu contraseña de forma segura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Contraseña actual</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nueva contraseña</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirmar contraseña</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button onClick={handleChangePassword} disabled={isSaving}>
                  {isSaving ? "Actualizando..." : <><Save className="mr-2 h-4 w-4" />Actualizar contraseña</>}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Autenticación de dos factores
                </CardTitle>
                <CardDescription>Aumenta la seguridad de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  La autenticación de dos factores añade una capa extra de seguridad a tu cuenta.
                </p>
                <Button variant="outline">Habilitar 2FA</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Apariencia */}
          <TabsContent value="apariencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Tema
                </CardTitle>
                <CardDescription>Personaliza la apariencia de la interfaz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Selecciona tu tema</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className="justify-start"
                    >
                      <div className="mr-2 h-5 w-5 rounded border bg-white" />
                      Claro
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className="justify-start"
                    >
                      <div className="mr-2 h-5 w-5 rounded border bg-slate-900" />
                      Oscuro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Idioma
                </CardTitle>
                <CardDescription>Elige tu idioma preferido</CardDescription>
              </CardHeader>
              <CardContent>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
                  <option>Español (Panamá)</option>
                  <option>English</option>
                </select>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}