"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Wrench,
  Search,
  Bell,
  User,
  LogOut,
  Home,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  MoreVertical,
  TrendingUp,
  Users,
  Briefcase,
  Eye,
  Send,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const trabajosDisponibles = [
  {
    id: "OFP-2025-00045",
    titulo: "Mantenimiento de 3 aires acondicionados",
    descripcion: "Necesito mantenimiento preventivo para 3 equipos split en apartamento. Marcas: LG y Samsung.",
    zona: "Costa del Este",
    urgencia: "normal",
    presupuesto: 200,
    fechaPublicacion: "Hace 2 horas",
    cliente: {
      nombre: "María G.",
      trabajos: 5,
    },
    cotizaciones: 2,
  },
  {
    id: "OFP-2025-00044",
    titulo: "Instalación de aire acondicionado inverter",
    descripcion: "Instalación de equipo nuevo 12,000 BTU en habitación. Ya tengo el equipo, solo necesito instalación.",
    zona: "San Francisco",
    urgencia: "urgente",
    presupuesto: 150,
    fechaPublicacion: "Hace 5 horas",
    cliente: {
      nombre: "Carlos R.",
      trabajos: 12,
    },
    cotizaciones: 4,
  },
  {
    id: "OFP-2025-00043",
    titulo: "Reparación - Aire no enfría",
    descripcion: "Mi aire acondicionado enciende pero no enfría. Es un equipo Carrier de 18,000 BTU, tiene 3 años de uso.",
    zona: "Bella Vista",
    urgencia: "emergencia",
    presupuesto: null,
    fechaPublicacion: "Hace 1 hora",
    cliente: {
      nombre: "Ana M.",
      trabajos: 3,
    },
    cotizaciones: 6,
  },
]

const misCotizaciones = [
  {
    id: "COT-001",
    trabajoId: "OFP-2025-00040",
    titulo: "Limpieza profunda de ductos",
    estado: "pendiente",
    monto: 120,
    fechaEnvio: "2025-04-14",
    cliente: "Pedro L.",
  },
  {
    id: "COT-002",
    trabajoId: "OFP-2025-00038",
    titulo: "Instalación de aire acondicionado nuevo",
    estado: "aceptada",
    monto: 180,
    fechaEnvio: "2025-04-12",
    cliente: "Juan D.",
  },
]

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgente: { label: "Urgente", className: "bg-warning/20 text-warning-foreground" },
  emergencia: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

export default function TecnicoDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("disponibles")
  const isVerified = true

  const navigation = [
    { name: "Inicio", href: "/dashboard/tecnico", icon: Home, current: true },
    { name: "Trabajos", href: "/dashboard/tecnico/trabajos", icon: Briefcase, current: false },
    { name: "Mis Cotizaciones", href: "/dashboard/tecnico/cotizaciones", icon: FileText, current: false },
    { name: "Mensajes", href: "/dashboard/tecnico/mensajes", icon: MessageSquare, current: false, badge: 3 },
    { name: "Mi Perfil", href: "/dashboard/tecnico/perfil", icon: User, current: false },
    { name: "Configuración", href: "/dashboard/tecnico/configuracion", icon: Settings, current: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <Wrench className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">OficiosPro</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-sidebar-foreground" />
            </button>
          </div>

          {/* Verification Banner */}
          {!isVerified && (
            <div className="mx-4 mt-4 rounded-lg bg-warning/20 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-warning-foreground">
                <AlertCircle className="h-4 w-4" />
                Verificación pendiente
              </div>
              <p className="mt-1 text-xs text-sidebar-foreground/70">
                Completa la verificación para poder cotizar trabajos
              </p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary text-xs text-sidebar-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">CM</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-medium text-sidebar-foreground">Carlos Mendoza</p>
                  {isVerified && <Shield className="h-4 w-4 text-sidebar-primary" />}
                </div>
                <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  4.9 · 127 trabajos
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Perfil público
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Panel de Técnico</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar trabajos..." className="w-64 pl-10" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                5
              </span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Trabajos este mes", value: "12", icon: Briefcase, color: "text-primary", change: "+3" },
              { label: "Cotizaciones enviadas", value: "28", icon: Send, color: "text-accent", change: "+8" },
              { label: "Tasa de aceptación", value: "43%", icon: TrendingUp, color: "text-warning", change: "+5%" },
              { label: "Ganancias del mes", value: "$1,850", icon: DollarSign, color: "text-accent", change: "+$420" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reputation Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                    <Star className="h-8 w-8 fill-warning text-warning" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">4.9</span>
                      <span className="text-muted-foreground">/ 5.0</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Basado en 127 reseñas</p>
                  </div>
                </div>

                <div className="flex-1 max-w-md space-y-2">
                  {[
                    { stars: 5, count: 98, percentage: 77 },
                    { stars: 4, count: 22, percentage: 17 },
                    { stars: 3, count: 5, percentage: 4 },
                    { stars: 2, count: 2, percentage: 2 },
                    { stars: 1, count: 0, percentage: 0 },
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-2">
                      <span className="w-3 text-xs text-muted-foreground">{rating.stars}</span>
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <Progress value={rating.percentage} className="h-2 flex-1" />
                      <span className="w-8 text-xs text-muted-foreground">{rating.count}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1 border-accent text-accent">
                    <Shield className="h-3 w-3" />
                    Verificado
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Top 10%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Tabs */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Trabajos</CardTitle>
                  <CardDescription>Explora trabajos disponibles y gestiona tus cotizaciones</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="disponibles" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Disponibles
                    <Badge variant="secondary" className="ml-1">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="cotizaciones" className="gap-2">
                    <Send className="h-4 w-4" />
                    Mis Cotizaciones
                  </TabsTrigger>
                  <TabsTrigger value="asignados" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Asignados
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="disponibles" className="mt-0">
                  <div className="space-y-4">
                    {trabajosDisponibles.map((trabajo) => {
                      const urgencia = urgenciaConfig[trabajo.urgencia]
                      return (
                        <div
                          key={trabajo.id}
                          className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground">{trabajo.id}</span>
                                <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                                  {urgencia.label}
                                </span>
                                <span className="text-xs text-muted-foreground">{trabajo.fechaPublicacion}</span>
                              </div>
                              <h3 className="font-medium text-foreground">{trabajo.titulo}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{trabajo.descripcion}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {trabajo.zona}
                                </span>
                                {trabajo.presupuesto && (
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    Presupuesto: ${trabajo.presupuesto}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {trabajo.cotizaciones} cotizaciones
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">{trabajo.cliente.nombre.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">
                                  {trabajo.cliente.nombre} · {trabajo.cliente.trabajos} trabajos publicados
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/tecnico/trabajos/${trabajo.id}`}>
                                  Ver Detalle
                                </Link>
                              </Button>
                              <Button size="sm" className="gap-1" asChild>
                                <Link href={`/dashboard/tecnico/trabajos/${trabajo.id}/cotizar`}>
                                  <Send className="h-4 w-4" />
                                  Cotizar
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="cotizaciones" className="mt-0">
                  <div className="space-y-4">
                    {misCotizaciones.map((cotizacion) => (
                      <div
                        key={cotizacion.id}
                        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{cotizacion.trabajoId}</span>
                            <Badge variant={cotizacion.estado === "aceptada" ? "default" : "secondary"}>
                              {cotizacion.estado === "aceptada" ? "Aceptada" : "Pendiente"}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-foreground">{cotizacion.titulo}</h3>
                          <p className="text-sm text-muted-foreground">
                            Cliente: {cotizacion.cliente} · Enviada: {cotizacion.fechaEnvio}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold text-foreground">${cotizacion.monto}</p>
                            <p className="text-xs text-muted-foreground">Tu cotización</p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1">
                            Ver
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="asignados" className="mt-0">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">Sin trabajos asignados</h3>
                    <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                      Cuando un cliente acepte tu cotización, el trabajo aparecerá aquí
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("disponibles")}>
                      Ver trabajos disponibles
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
