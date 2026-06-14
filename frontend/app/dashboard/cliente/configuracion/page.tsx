"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Palette, Save, User } from "lucide-react"
import { useAuth } from "../../../../hooks/use-auth"
import { changeMyPassword, updateMyProfile } from "../../../../lib/api"
import { PasswordStrengthIndicator } from "../../../../components/PasswordStrengthIndicator"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import { Input } from "../../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import {
  isPasswordValid,
  validateEmail,
  validateNombre,
  validatePasswordConfirm,
} from "../../../../lib/validations"

type StatusModal = {
  open: boolean
  type: "success" | "error"
  title: string
  description: string
}

export default function ClienteConfiguracion() {
  const { user, checkAuth } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [statusModal, setStatusModal] = useState<StatusModal>({
    open: false,
    type: "success",
    title: "",
    description: "",
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const avatar = null

  const showStatusModal = (
    type: StatusModal["type"],
    title: string,
    description: string,
  ) => {
    setStatusModal({ open: true, type, title, description })
  }

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  const handleSaveProfile = async () => {
    const nameValidation = validateNombre(formData.name.trim())
    const emailValidation = validateEmail(formData.email.trim())

    if (!nameValidation.isValid || !emailValidation.isValid) {
      showStatusModal(
        "error",
        "Revisa los datos ingresados",
        "El nombre o el correo electronico no cumplen con el formato requerido.",
      )
      return
    }

    try {
      setIsSavingProfile(true)
      const result = await updateMyProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
      })

      localStorage.setItem("user", JSON.stringify(result.data))
      await checkAuth()
      showStatusModal(
        "success",
        "Usuario actualizado correctamente",
        "Tus datos de perfil fueron guardados.",
      )
    } catch {
      showStatusModal(
        "error",
        "Error en el servidor",
        "No se pudo completar la operacion. Intenta nuevamente.",
      )
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      showStatusModal(
        "error",
        "Revisa los datos ingresados",
        "Completa todos los campos de contrasena.",
      )
      return
    }

    const confirmValidation = validatePasswordConfirm(formData.newPassword, formData.confirmPassword)

    if (!isPasswordValid(formData.newPassword) || !confirmValidation.isValid) {
      showStatusModal(
        "error",
        "Revisa los datos ingresados",
        "La nueva contrasena debe cumplir todos los requisitos indicados.",
      )
      return
    }

    try {
      setIsSavingPassword(true)
      const result = await changeMyPassword({
        current_password: formData.currentPassword,
        password: formData.newPassword,
        password_confirmation: formData.confirmPassword,
      })

      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      showStatusModal(
        "success",
        "Usuario actualizado correctamente",
        "Tu contrasena fue actualizada.",
      )
    } catch {
      showStatusModal(
        "error",
        "Error en el servidor",
        "No se pudo completar la operacion. Intenta nuevamente.",
      )
    } finally {
      setIsSavingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Dialog
        open={statusModal.open}
        onOpenChange={(open) => setStatusModal(prev => ({ ...prev, open }))}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-2 flex justify-center sm:justify-start">
              <div
                className={
                  statusModal.type === "success"
                    ? "flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                    : "flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-700"
                }
              >
                {statusModal.type === "success" ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <AlertCircle className="h-6 w-6" />
                )}
              </div>
            </div>
            <DialogTitle>{statusModal.title}</DialogTitle>
            <DialogDescription>{statusModal.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setStatusModal(prev => ({ ...prev, open: false }))}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/dashboard/cliente">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configuracion de Cuenta</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus preferencias como cliente</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="apariencia">Apariencia</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informacion del Perfil
                </CardTitle>
                <CardDescription>Actualiza tu informacion personal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    {avatar ? (
                      <AvatarImage src={avatar} alt={user?.name || "Cliente"} />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {formData.name?.slice(0, 2).toUpperCase() || "CL"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button variant="outline" type="button">Cambiar avatar</Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nombre completo</label>
                  <Input
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Correo electronico</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                    }}
                    placeholder="tu@email.com"
                  />
                </div>

                <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
                  {isSavingProfile ? "Guardando..." : <><Save className="mr-2 h-4 w-4" />Guardar cambios</>}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguridad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Cambiar Contrasena
                </CardTitle>
                <CardDescription>Actualiza tu contrasena de forma segura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Contrasena actual</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData(prev => ({ ...prev, currentPassword: e.target.value }))
                    }}
                    placeholder="********"
                    autoComplete="current-password"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nueva contrasena</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData(prev => ({ ...prev, newPassword: e.target.value }))
                    }}
                    placeholder="********"
                    autoComplete="new-password"
                  />
                  {formData.newPassword ? (
                    <PasswordStrengthIndicator password={formData.newPassword} showDetails={true} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Usa minimo 8 caracteres, mayuscula, minuscula, numero y simbolo.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirmar contrasena</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))
                      }}
                      placeholder="********"
                      autoComplete="new-password"
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

                <Button onClick={handleChangePassword} disabled={isSavingPassword}>
                  {isSavingPassword ? "Actualizando..." : <><Save className="mr-2 h-4 w-4" />Actualizar contrasena</>}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
