"use client"

import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Wrench, Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Building, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { registerUser } from "@/lib/api"

// Datos de ubicaciones de Panamá
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
    "punta-pacifica": [
      { id: "punta-pacifica", nombre: "Punta Pacífica" },
    ],
    "costa-del-este": [
      { id: "costa-del-este", nombre: "Costa del Este" },
    ],
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
  const defaultTab = searchParams.get("tipo") === "tecnico" ? "tecnico" : "cliente"
  
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)

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

  // Estados para los selects de ubicación
  const [clienteProvincia, setClienteProvincia] = useState("")
  const [clienteDistrito, setClienteDistrito] = useState("")
  const [clienteCorregimiento, setClienteCorregimiento] = useState("")

  // Obtener distritos según la provincia seleccionada
  const distritosOptions = clienteProvincia 
    ? ubicacionesPanama.distritos[clienteProvincia as keyof typeof ubicacionesPanama.distritos] || []
    : []
  
  const corregimientosOptions = clienteDistrito
    ? ubicacionesPanama.corregimientos[clienteDistrito as keyof typeof ubicacionesPanama.corregimientos] || []
    : []

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

  // Estados para los selects de ubicación del técnico
  const [tecnicoProvincia, setTecnicoProvincia] = useState("")
  const [tecnicoDistrito, setTecnicoDistrito] = useState("")
  const [tecnicoCorregimiento, setTecnicoCorregimiento] = useState("")

  // Obtener distritos según la provincia seleccionada para técnico
  const tecnicoDistritosOptions = tecnicoProvincia
    ? ubicacionesPanama.distritos[tecnicoProvincia as keyof typeof ubicacionesPanama.distritos] || []
    : []

  const tecnicoCorregimientosOptions = tecnicoDistrito
    ? ubicacionesPanama.corregimientos[tecnicoDistrito as keyof typeof ubicacionesPanama.corregimientos] || []
    : []

  const handleClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await registerUser({
        name: clienteData.nombre,
        email: clienteData.email,
        password: clienteData.password,
        phone: clienteData.telefono,
        role: 'client',
        provincia: clienteProvincia,
        distrito: clienteDistrito,
        corregimiento: clienteCorregimiento,
      })
      
      console.log('Registro exitoso:', response)
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
      // Aquí podrías redirigir al login
    } catch (error: any) {
      console.error('Error en registro:', error)
      alert(error.message || 'Error al registrar usuario')
    }
  }

  const handleTecnicoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      try {
        const response = await registerUser({
          name: tecnicoData.nombre,
          email: tecnicoData.email,
          password: tecnicoData.password,
          phone: tecnicoData.telefono,
          role: 'technician',
          provincia: tecnicoProvincia,
          distrito: tecnicoDistrito,
          corregimiento: tecnicoCorregimiento,
          cedula: tecnicoData.cedula,
          specialty: tecnicoData.specialty,
          description: tecnicoData.descripcion,
          experience_years: parseInt(tecnicoData.experiencia) || 0,
        })
        
        console.log('Registro exitoso:', response)
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
      } catch (error: any) {
        console.error('Error en registro:', error)
        alert(error.message || 'Error al registrar usuario')
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Branding (hidden on mobile) */}
      <div className="relative hidden w-1/2 bg-sidebar lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Wrench className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-sidebar-foreground">OficiosPro</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-sidebar-foreground">
              {activeTab === "cliente" 
                ? "Encuentra al técnico perfecto para tu hogar"
                : "Únete a nuestra red de profesionales"
              }
            </h1>
            <p className="text-lg text-sidebar-foreground/70">
              {activeTab === "cliente"
                ? "Publica tu trabajo, recibe cotizaciones y elige la mejor opción. Sin complicaciones."
                : "Accede a más clientes, construye tu reputación digital y aumenta tus ingresos."
              }
            </p>
          </div>

          <p className="text-sm text-sidebar-foreground/50">
            &copy; 2025 OficiosPro. Panamá.
          </p>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">OficiosPro</span>
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
              <CardDescription>
                Selecciona el tipo de cuenta que deseas crear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setStep(1); }}>
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

                {/* Cliente Form */}
                <TabsContent value="cliente">
                  <form onSubmit={handleClienteSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cliente-nombre">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-nombre"
                          placeholder="Tu nombre completo"
                          className="pl-10"
                          autoComplete="name"
                          value={clienteData.nombre}
                          onChange={(e) => setClienteData({ ...clienteData, nombre: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-email"
                          type="email"
                          placeholder="tu@correo.com"
                          className="pl-10"
                          autoComplete="email"
                          value={clienteData.email}
                          onChange={(e) => setClienteData({ ...clienteData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-telefono">Teléfono móvil</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="cliente-telefono"
                          type="tel"
                          placeholder="+507 6000-0000"
                          className="pl-10"
                          autoComplete="tel"
                          value={clienteData.telefono}
                          onChange={(e) => setClienteData({ ...clienteData, telefono: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Campos de ubicación - Cliente */}
                    <div className="space-y-2">
                      <Label htmlFor="cliente-provincia">Provincia</Label>
                      <Select value={clienteProvincia} onValueChange={(v) => { setClienteProvincia(v); setClienteDistrito(""); setClienteCorregimiento(""); setClienteData({ ...clienteData, provincia: v, distrito: "", corregimiento: "" }) }}>
                        <SelectTrigger id="cliente-provincia">
                          <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {ubicacionesPanama.provincias.map((provincia) => (
                            <SelectItem key={provincia.id} value={provincia.id}>{provincia.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-distrito">Distrito</Label>
                      <Select value={clienteDistrito} onValueChange={(v) => { setClienteDistrito(v); setClienteCorregimiento(""); setClienteData({ ...clienteData, distrito: v, corregimiento: "" }) }} disabled={!clienteProvincia}>
                        <SelectTrigger id="cliente-distrito">
                          <SelectValue placeholder="Selecciona tu distrito" />
                        </SelectTrigger>
                        <SelectContent>
                          {distritosOptions.map((distrito: any) => (
                            <SelectItem key={distrito.id} value={distrito.id}>{distrito.nombre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cliente-corregimiento">Corregimiento</Label>
                      <Select value={clienteCorregimiento} onValueChange={(v) => { setClienteCorregimiento(v); setClienteData({ ...clienteData, corregimiento: v }) }} disabled={!clienteDistrito}>
                        <SelectTrigger id="cliente-corregimiento">
                          <SelectValue placeholder="Selecciona tu corregimiento" />
                        </SelectTrigger>
                        <SelectContent>
                          {corregimientosOptions.map((corregimiento: any) => (
                            <SelectItem key={corregimiento.id} value={corregimiento.id}>{corregimiento.nombre}</SelectItem>
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
                          className="pl-10 pr-10"
                          autoComplete="new-password"
                          value={clienteData.password}
                          onChange={(e) => setClienteData({ ...clienteData, password: e.target.value })}
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
                      <p className="text-xs text-muted-foreground">
                        Mínimo 8 caracteres, una mayúscula y un número
                      </p>
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

                    <Button type="submit" className="w-full">
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

                {/* Técnico Form */}
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
                              className="pl-10"
                              autoComplete="name"
                              value={tecnicoData.nombre}
                              onChange={(e) => setTecnicoData({ ...tecnicoData, nombre: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-email">Correo electrónico</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-email"
                              type="email"
                              placeholder="tu@correo.com"
                              className="pl-10"
                              autoComplete="email"
                              value={tecnicoData.email}
                              onChange={(e) => setTecnicoData({ ...tecnicoData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-telefono">Teléfono móvil</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-telefono"
                              type="tel"
                              placeholder="+507 6000-0000"
                              className="pl-10"
                              autoComplete="tel"
                              value={tecnicoData.telefono}
                              onChange={(e) => setTecnicoData({ ...tecnicoData, telefono: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-cedula">Cédula panameña</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-cedula"
                              placeholder="8-888-8888"
                              className="pl-10"
                              autoComplete="off"
                              value={tecnicoData.cedula}
                              onChange={(e) => setTecnicoData({ ...tecnicoData, cedula: e.target.value })}
                              required
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Requerida para verificación de identidad
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-password">Contraseña</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="tecnico-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Mínimo 8 caracteres"
                              className="pl-10 pr-10"
                              autoComplete="new-password"
                              value={tecnicoData.password}
                              onChange={(e) => setTecnicoData({ ...tecnicoData, password: e.target.value })}
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

                        {/* Campos de ubicación - Técnico */}
                        <div className="space-y-2">
                          <Label htmlFor="tecnico-provincia">Provincia</Label>
                          <Select value={tecnicoProvincia} onValueChange={(v) => { setTecnicoProvincia(v); setTecnicoDistrito(""); setTecnicoCorregimiento(""); setTecnicoData({ ...tecnicoData, provincia: v, distrito: "", corregimiento: "" }) }}>
                            <SelectTrigger id="tecnico-provincia">
                              <SelectValue placeholder="Selecciona tu provincia" />
                            </SelectTrigger>
                            <SelectContent>
                              {ubicacionesPanama.provincias.map((provincia) => (
                                <SelectItem key={provincia.id} value={provincia.id}>{provincia.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-distrito">Distrito</Label>
                          <Select value={tecnicoDistrito} onValueChange={(v) => { setTecnicoDistrito(v); setTecnicoCorregimiento(""); setTecnicoData({ ...tecnicoData, distrito: v, corregimiento: "" }) }} disabled={!tecnicoProvincia}>
                            <SelectTrigger id="tecnico-distrito">
                              <SelectValue placeholder="Selecciona tu distrito" />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnicoDistritosOptions.map((distrito: any) => (
                                <SelectItem key={distrito.id} value={distrito.id}>{distrito.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-corregimiento">Corregimiento</Label>
                          <Select value={tecnicoCorregimiento} onValueChange={(v) => { setTecnicoCorregimiento(v); setTecnicoData({ ...tecnicoData, corregimiento: v }) }} disabled={!tecnicoDistrito}>
                            <SelectTrigger id="tecnico-corregimiento">
                              <SelectValue placeholder="Selecciona tu corregimiento" />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnicoCorregimientosOptions.map((corregimiento: any) => (
                                <SelectItem key={corregimiento.id} value={corregimiento.id}>{corregimiento.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tecnico-experiencia">Años de experiencia</Label>
                          <Select value={tecnicoData.experiencia} onValueChange={(v) => setTecnicoData({ ...tecnicoData, experiencia: v })}>
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
                          <Select value={tecnicoData.specialty || ""} onValueChange={(v) => setTecnicoData({ ...tecnicoData, specialty: v })}>
                            <SelectTrigger id="tecnico-specialty">
                              <SelectValue placeholder="Selecciona tu especialidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Refrigeracion">Refrigeracion</SelectItem>
                              {/* <SelectItem value="plomero">Plomero</SelectItem>
                              <SelectItem value="aire-acondicionado">Aire Acondicionado</SelectItem>
                              <SelectItem value="carpintero">Carpintero</SelectItem>
                              <SelectItem value="pintor">Pintor</SelectItem>
                              <SelectItem value="albañil">Albañil</SelectItem>
                              <SelectItem value="soldador">Soldador</SelectItem>
                              <SelectItem value="mecanico">Mecánico</SelectItem>
                              <SelectItem value="cerrajero">Cerrajero</SelectItem>
                              <SelectItem value="jardinero">Jardinero</SelectItem>
                              <SelectItem value="limpieza">Limpieza Industrial</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem> */}
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
                          <p className="text-xs text-muted-foreground">
                            {tecnicoData.descripcion.length}/500 caracteres
                          </p>
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

                        <div className="flex gap-3">
                          <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                            Atrás
                          </Button>
                          <Button type="submit" className="flex-1">
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
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <RegisterContent />
    </Suspense>
  )
}
