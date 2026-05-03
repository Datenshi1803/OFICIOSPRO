"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
  Loader2,
  Briefcase,
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
import { getClientJobs, JobData } from "@/lib/api"

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  published: { label: "Publicado", variant: "default", icon: Clock },
  in_progress: { label: "En Progreso", variant: "secondary", icon: AlertCircle },
  completed: { label: "Completado", variant: "outline", icon: CheckCircle2 },
  reviewed: { label: "Reseñado", variant: "default", icon: Star },
  cancelled: { label: "Cancelado", variant: "destructive", icon: X },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgent: { label: "Urgente", className: "bg-warning/20 text-warning-foreground" },
  emergency: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

export default function ClienteTrabajos() {
  const { logout, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")
  
  const [trabajos, setTrabajos] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    await logout()
  }

  const navigation = [
    { name: "Inicio", href: "/dashboard/cliente", icon: Home, current: false },
    { name: "Mis Trabajos", href: "/dashboard/cliente/trabajos", icon: FileText, current: true },
    { name: "Mensajes", href: "/dashboard/cliente/mensajes", icon: MessageSquare, current: false, badge: 2 },
    { name: "Configuración", href: "/dashboard/cliente/configuracion", icon: Settings, current: false },
  ]

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const res = await getClientJobs()
        setTrabajos(res.data)
      } catch (err: any) {
        setError(err.message || "Error al cargar datos")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

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
                <AvatarImage src={user?.avatar_url || ""} />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  {user?.name?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name || "Cliente"}</p>
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
              <h1 className="text-lg font-semibold text-foreground">Mis Trabajos</h1>
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
          {error && (
            <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

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
                  <TabsTrigger value="todos" className="gap-2">
                    Todos
                    {!loading && <Badge variant="secondary" className="ml-1">{trabajos.length}</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="activos" className="gap-2">
                    Activos
                    {!loading && <Badge variant="secondary" className="ml-1">{trabajos.filter(t => t.status === "published" || t.status === "in_progress").length}</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="completados" className="gap-2">
                    Completados
                    {!loading && <Badge variant="secondary" className="ml-1">{trabajos.filter(t => t.status === "completed" || t.status === "reviewed").length}</Badge>}
                  </TabsTrigger>
                </TabsList>

                {["todos", "activos", "completados"].map(tabValue => (
                  <TabsContent key={tabValue} value={tabValue} className="mt-0">
                    {loading ? (
                      <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : trabajos.filter(t => 
                        tabValue === "todos" ? true :
                        tabValue === "activos" ? t.status === "published" || t.status === "in_progress" :
                        ["completed", "reviewed"].includes(t.status)
                      ).length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-foreground">No hay trabajos en esta sección</h3>
                        <p className="text-sm text-muted-foreground">Aquí aparecerán tus solicitudes de servicio</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {trabajos.filter(t => 
                          tabValue === "todos" ? true :
                          tabValue === "activos" ? t.status === "published" || t.status === "in_progress" :
                          ["completed", "reviewed"].includes(t.status)
                        ).map((trabajo) => {
                          const estado = estadoConfig[trabajo.status] || { label: trabajo.status, variant: "outline", icon: Clock }
                          const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                          return (
                            <div key={trabajo.id} className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1 space-y-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono text-xs text-muted-foreground">{trabajo.code}</span>
                                    <Badge variant={estado.variant as any} className="gap-1">
                                      <estado.icon className="h-3 w-3" />
                                      {estado.label}
                                    </Badge>
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                                      {urgencia.label}
                                    </span>
                                  </div>
                                  <h3 className="font-medium text-foreground">{trabajo.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{trabajo.description}</p>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {trabajo.zone}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(trabajo.created_at).toLocaleDateString()}
                                    </span>
                                    {trabajo.budget && (
                                      <span className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        Presupuesto: ${trabajo.budget}
                                      </span>
                                    )}
                                  </div>
                                </div>
  
                                <div className="flex gap-2 flex-shrink-0">
                                  <Button variant="outline" size="sm" className="gap-1" asChild>
                                    <Link href={`/dashboard/cliente/trabajos/${trabajo.id}`}>
                                      Ver Detalle
                                      <ChevronRight className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
