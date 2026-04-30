"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Wrench,
  Plus,
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

const trabajos = [
  {
    id: "OFP-2025-00042",
    titulo: "Mantenimiento de aire acondicionado split",
    estado: "PUBLICADO",
    zona: "Costa del Este",
    urgencia: "normal",
    presupuesto: 150,
    fechaPublicacion: "2025-04-15",
    cotizaciones: 4,
  },
  {
    id: "OFP-2025-00038",
    titulo: "Instalación de aire acondicionado nuevo",
    estado: "EN_PROGRESO",
    zona: "San Francisco",
    urgencia: "urgente",
    presupuesto: 350,
    fechaPublicacion: "2025-04-12",
    cotizaciones: 6,
    tecnicoAsignado: {
      nombre: "Carlos Mendoza",
      avatar: "",
      rating: 4.9,
    },
  },
  {
    id: "OFP-2025-00031",
    titulo: "Reparación de unidad exterior",
    estado: "COMPLETADO",
    zona: "Bella Vista",
    urgencia: "emergencia",
    presupuesto: 200,
    fechaPublicacion: "2025-04-08",
    cotizaciones: 3,
    tecnicoAsignado: {
      nombre: "Roberto Santos",
      avatar: "",
      rating: 4.7,
    },
  },
]

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  PUBLICADO: { label: "Publicado", variant: "default", icon: Clock },
  EN_PROGRESO: { label: "En Progreso", variant: "secondary", icon: AlertCircle },
  COMPLETADO: { label: "Completado", variant: "outline", icon: CheckCircle2 },
  CANCELADO: { label: "Cancelado", variant: "destructive", icon: X },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgente: { label: "Urgente", className: "bg-warning/20 text-warning-foreground" },
  emergencia: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

export default function ClienteDashboard() {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")

  const handleLogout = async () => {
    await logout()
  }

  const navigation = [
    { name: "Inicio", href: "/dashboard/cliente", icon: Home, current: true },
    { name: "Mis Trabajos", href: "/dashboard/cliente/trabajos", icon: FileText, current: false },
    { name: "Mensajes", href: "/dashboard/cliente/mensajes", icon: MessageSquare, current: false, badge: 2 },
    { name: "Configuración", href: "/dashboard/cliente/configuracion", icon: Settings, current: false },
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
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">Juan Domínguez</p>
                <p className="truncate text-xs text-sidebar-foreground/60">Cliente</p>
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
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
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
              <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar..." className="w-64 pl-10" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                3
              </span>
            </Button>

            <Button size="sm" className="hidden gap-2 sm:flex" asChild>
              <Link href="/dashboard/cliente/nuevo-trabajo">
                <Plus className="h-4 w-4" />
                Nuevo Trabajo
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Trabajos Activos", value: "2", icon: FileText, color: "text-primary" },
              { label: "Cotizaciones Pendientes", value: "10", icon: Clock, color: "text-warning" },
              { label: "Trabajos Completados", value: "8", icon: CheckCircle2, color: "text-accent" },
              { label: "Total Gastado", value: "$1,250", icon: DollarSign, color: "text-muted-foreground" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-4 sm:p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Jobs */}
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Mis Trabajos</CardTitle>
                <CardDescription>Gestiona tus trabajos publicados y en progreso</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
                <Button size="sm" className="gap-2 sm:hidden" asChild>
                  <Link href="/dashboard/cliente/nuevo-trabajo">
                    <Plus className="h-4 w-4" />
                    Nuevo
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="activos">Activos</TabsTrigger>
                  <TabsTrigger value="completados">Completados</TabsTrigger>
                </TabsList>

                <TabsContent value="todos" className="mt-0">
                  <div className="space-y-4">
                    {trabajos.map((trabajo) => {
                      const estado = estadoConfig[trabajo.estado]
                      const urgencia = urgenciaConfig[trabajo.urgencia]
                      return (
                        <div
                          key={trabajo.id}
                          className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground">{trabajo.id}</span>
                              <Badge variant={estado.variant} className="gap-1">
                                <estado.icon className="h-3 w-3" />
                                {estado.label}
                              </Badge>
                              <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                                {urgencia.label}
                              </span>
                            </div>
                            <h3 className="font-medium text-foreground">{trabajo.titulo}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {trabajo.zona}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {trabajo.fechaPublicacion}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ${trabajo.presupuesto}
                              </span>
                            </div>
                            {trabajo.tecnicoAsignado && (
                              <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={trabajo.tecnicoAsignado.avatar} />
                                  <AvatarFallback>{trabajo.tecnicoAsignado.nombre.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{trabajo.tecnicoAsignado.nombre}</p>
                                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="h-3 w-3 fill-warning text-warning" />
                                    {trabajo.tecnicoAsignado.rating}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            {trabajo.estado === "PUBLICADO" && (
                              <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{trabajo.cotizaciones}</p>
                                <p className="text-xs text-muted-foreground">Cotizaciones</p>
                              </div>
                            )}
                            <Button variant="outline" size="sm" className="gap-1" asChild>
                              <Link href={`/dashboard/cliente/trabajos/${trabajo.id}`}>
                                Ver Detalle
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="activos" className="mt-0">
                  <div className="space-y-4">
                    {trabajos
                      .filter((t) => t.estado === "PUBLICADO" || t.estado === "EN_PROGRESO")
                      .map((trabajo) => {
                        const estado = estadoConfig[trabajo.estado]
                        const urgencia = urgenciaConfig[trabajo.urgencia]
                        return (
                          <div
                            key={trabajo.id}
                            className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground">{trabajo.id}</span>
                                <Badge variant={estado.variant} className="gap-1">
                                  <estado.icon className="h-3 w-3" />
                                  {estado.label}
                                </Badge>
                                <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                                  {urgencia.label}
                                </span>
                              </div>
                              <h3 className="font-medium text-foreground">{trabajo.titulo}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {trabajo.zona}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {trabajo.fechaPublicacion}
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-1">
                              Ver Detalle
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                  </div>
                </TabsContent>

                <TabsContent value="completados" className="mt-0">
                  <div className="space-y-4">
                    {trabajos
                      .filter((t) => t.estado === "COMPLETADO")
                      .map((trabajo) => {
                        const estado = estadoConfig[trabajo.estado]
                        return (
                          <div
                            key={trabajo.id}
                            className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground">{trabajo.id}</span>
                                <Badge variant={estado.variant} className="gap-1">
                                  <estado.icon className="h-3 w-3" />
                                  {estado.label}
                                </Badge>
                              </div>
                              <h3 className="font-medium text-foreground">{trabajo.titulo}</h3>
                              {trabajo.tecnicoAsignado && (
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{trabajo.tecnicoAsignado.nombre.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{trabajo.tecnicoAsignado.nombre}</span>
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              Dejar Reseña
                            </Button>
                          </div>
                        )
                      })}
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
