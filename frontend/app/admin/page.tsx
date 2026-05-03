"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Wrench,
  Search,
  Bell,
  User,
  LogOut,
  Home,
  Users,
  FileText,
  CreditCard,
  AlertTriangle,
  Settings,
  Menu,
  X,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Ban,
  Mail,
  Filter,
  Download,
  RefreshCw,
  Loader2,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsers, toggleUserActive, deleteUser, UserData } from "@/lib/api"

const stats = [
  { label: "Usuarios Totales", value: "1,247", change: "+12%", trend: "up", icon: Users },
  { label: "Trabajos este mes", value: "342", change: "+8%", trend: "up", icon: FileText },
  { label: "Comisiones", value: "$4,850", change: "+23%", trend: "up", icon: DollarSign },
  { label: "Disputas activas", value: "3", change: "-2", trend: "down", icon: AlertTriangle },
]

const recentJobs = [
  {
    id: "OFP-2025-00045",
    titulo: "Mantenimiento de 3 aires acondicionados",
    cliente: "María G.",
    estado: "PUBLICADO",
    cotizaciones: 4,
    fecha: "2025-04-15",
  },
  {
    id: "OFP-2025-00044",
    titulo: "Instalación de aire inverter",
    cliente: "Carlos R.",
    estado: "EN_PROGRESO",
    cotizaciones: 6,
    fecha: "2025-04-15",
  },
  {
    id: "OFP-2025-00043",
    titulo: "Reparación - Aire no enfría",
    cliente: "Ana M.",
    estado: "DISPUTADO",
    cotizaciones: 3,
    fecha: "2025-04-14",
  },
]

const pendingVerifications = [
  {
    id: "VER-001",
    tecnico: "Ana Pérez",
    cedula: "8-888-8888",
    fechaSolicitud: "2025-04-15",
    documentos: 2,
  },
  {
    id: "VER-002",
    tecnico: "Miguel Torres",
    cedula: "9-999-9999",
    fechaSolicitud: "2025-04-14",
    documentos: 2,
  },
]

const disputas = [
  {
    id: "DISP-001",
    trabajo: "OFP-2025-00043",
    cliente: "Ana M.",
    tecnico: "José P.",
    motivo: "Trabajo incompleto",
    estado: "abierta",
    fecha: "2025-04-14",
    monto: 150,
  },
  {
    id: "DISP-002",
    trabajo: "OFP-2025-00039",
    cliente: "Pedro L.",
    tecnico: "Carlos M.",
    motivo: "Daños durante instalación",
    estado: "en_revision",
    fecha: "2025-04-12",
    monto: 280,
  },
]

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getUsers()
      if (response.success && response.data) {
        setUsers(response.data.data || response.data)
      }
    } catch (err) {
      console.error('Error loading users:', err)
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (userId: string) => {
    try {
      await toggleUserActive(userId)
      loadUsers()
    } catch (err) {
      console.error('Error toggling user:', err)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return
    
    try {
      await deleteUser(userId)
      loadUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home, current: true },
    { name: "Usuarios", href: "/admin/usuarios", icon: Users, current: false },
    { name: "Trabajos", href: "/admin/trabajos", icon: FileText, current: false },
    { name: "Pagos", href: "/admin/pagos", icon: CreditCard, current: false },
    { name: "Disputas", href: "/admin/disputas", icon: AlertTriangle, current: false, badge: 3 },
    { name: "Verificaciones", href: "/admin/verificaciones", icon: Shield, current: false, badge: 2 },
    { name: "Reportes", href: "/admin/reportes", icon: BarChart3, current: false },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings, current: false },
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
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <Wrench className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground">OficiosPro</span>
                <span className="ml-2 rounded bg-destructive/80 px-1.5 py-0.5 text-xs text-destructive-foreground">Admin</span>
              </div>
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
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Admin User */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-destructive text-destructive-foreground">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">Administrador</p>
                <p className="truncate text-xs text-sidebar-foreground/60">admin@oficiospro.com</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
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
              <h1 className="text-lg font-semibold text-foreground">Panel de Administración</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar usuarios, trabajos..." className="w-80 pl-10" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                5
              </span>
            </Button>

            <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-accent" : "text-destructive"}`}>
                      {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Vista General</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="jobs">Trabajos</TabsTrigger>
              <TabsTrigger value="disputes">Disputas</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending Verifications */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Verificaciones Pendientes</CardTitle>
                      <CardDescription>Técnicos esperando aprobación de cédula</CardDescription>
                    </div>
                    <Badge variant="secondary">{pendingVerifications.length}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingVerifications.map((ver) => (
                      <div key={ver.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="font-medium text-foreground">{ver.tecnico}</p>
                          <p className="text-sm text-muted-foreground">Cédula: {ver.cedula}</p>
                          <p className="text-xs text-muted-foreground">{ver.fechaSolicitud}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-4 w-4" />
                            Ver
                          </Button>
                          <Button size="sm" className="gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            Aprobar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Active Disputes */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Disputas Activas</CardTitle>
                      <CardDescription>Conflictos pendientes de resolución</CardDescription>
                    </div>
                    <Badge variant="destructive">{disputas.length}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {disputas.map((disputa) => (
                      <div key={disputa.id} className="rounded-lg border border-border p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground">{disputa.trabajo}</span>
                              <Badge variant={disputa.estado === "abierta" ? "destructive" : "secondary"}>
                                {disputa.estado === "abierta" ? "Abierta" : "En revisión"}
                              </Badge>
                            </div>
                            <p className="mt-1 font-medium text-foreground">{disputa.motivo}</p>
                            <p className="text-sm text-muted-foreground">
                              {disputa.cliente} vs {disputa.tecnico}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">${disputa.monto}</p>
                            <p className="text-xs text-muted-foreground">{disputa.fecha}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Ver detalle
                          </Button>
                          <Button size="sm" className="flex-1">
                            Resolver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Jobs */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Trabajos Recientes</CardTitle>
                    <CardDescription>Últimos trabajos publicados en la plataforma</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/trabajos">Ver todos</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Cotizaciones</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-mono text-xs">{job.id}</TableCell>
                          <TableCell className="font-medium">{job.titulo}</TableCell>
                          <TableCell>{job.cliente}</TableCell>
                          <TableCell>
                            <Badge variant={job.estado === "DISPUTADO" ? "destructive" : job.estado === "EN_PROGRESO" ? "secondary" : "default"}>
                              {job.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>{job.cotizaciones}</TableCell>
                          <TableCell>{job.fecha}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalle
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Contactar partes
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Ban className="mr-2 h-4 w-4" />
                                  Cancelar trabajo
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                    <CardDescription>Administra clientes y técnicos de la plataforma</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                      <p className="text-destructive">{error}</p>
                      <Button variant="outline" onClick={loadUsers}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reintentar
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Registro</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No hay usuarios registrados
                            </TableCell>
                          </TableRow>
                        ) : (
                          users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">{user.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={user.is_active ? "default" : "destructive"}
                                >
                                  {user.is_active ? "Activo" : "Inactivo"}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.phone || "-"}</TableCell>
                              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Ver perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail className="mr-2 h-4 w-4" />
                                      Enviar email
                                    </DropdownMenuItem>
                                    {user.role === "technician" && (
                                      <DropdownMenuItem>
                                        <Shield className="mr-2 h-4 w-4" />
                                        Verificar cédula
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleToggleActive(user.id)}>
                                      {user.is_active ? (
                                        <>
                                          <Ban className="mr-2 h-4 w-4" />
                                          Desactivar cuenta
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle2 className="mr-2 h-4 w-4" />
                                          Activar cuenta
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="text-destructive"
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      <Ban className="mr-2 h-4 w-4" />
                                      Eliminar usuario
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Todos los Trabajos</CardTitle>
                  <CardDescription>Lista completa de trabajos en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Cotizaciones</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-mono text-xs">{job.id}</TableCell>
                          <TableCell className="font-medium">{job.titulo}</TableCell>
                          <TableCell>{job.cliente}</TableCell>
                          <TableCell>
                            <Badge variant={job.estado === "DISPUTADO" ? "destructive" : "default"}>
                              {job.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>{job.cotizaciones}</TableCell>
                          <TableCell>{job.fecha}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Ver detalle</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disputes Tab */}
            <TabsContent value="disputes">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Disputas</CardTitle>
                  <CardDescription>Resuelve conflictos entre clientes y técnicos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {disputas.map((disputa) => (
                    <div key={disputa.id} className="rounded-lg border border-border p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-foreground">{disputa.id}</span>
                            <Badge variant={disputa.estado === "abierta" ? "destructive" : "secondary"}>
                              {disputa.estado === "abierta" ? "Abierta" : "En revisión"}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-medium text-foreground">{disputa.motivo}</h3>
                          <p className="text-sm text-muted-foreground">
                            Trabajo: <span className="font-mono">{disputa.trabajo}</span>
                          </p>
                          <div className="flex gap-4 text-sm">
                            <span className="text-muted-foreground">Cliente: <span className="text-foreground">{disputa.cliente}</span></span>
                            <span className="text-muted-foreground">Técnico: <span className="text-foreground">{disputa.tecnico}</span></span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">${disputa.monto}</p>
                          <p className="text-sm text-muted-foreground">{disputa.fecha}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">Ver historial completo</Button>
                        <Button variant="outline" size="sm">Contactar cliente</Button>
                        <Button variant="outline" size="sm">Contactar técnico</Button>
                        <Button size="sm" className="gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Resolver disputa
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
