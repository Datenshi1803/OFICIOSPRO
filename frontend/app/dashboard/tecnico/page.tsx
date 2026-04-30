"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
  Menu, X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  ChevronRight,
  MapPin, Calendar,
  DollarSign,
  Filter,
  MoreVertical,
  TrendingUp,
  Users,
  Briefcase,
  Eye,
  Send,
  Shield,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getAvailableJobs, getMyBids, storeBid, JobData, BidData } from "@/lib/api"

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal:    { label: "Normal",     className: "bg-muted text-muted-foreground" },
  urgent:    { label: "Urgente",    className: "bg-warning/20 text-warning-foreground" },
  emergency: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

const estadoBidConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending:  { label: "Pendiente", variant: "secondary" },
  accepted: { label: "Aceptada",  variant: "default" },
  rejected: { label: "Rechazada", variant: "destructive" },
}

export default function TecnicoDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab]     = useState("disponibles")
  const [trabajos, setTrabajos]       = useState<JobData[]>([])
  const [misCotizaciones, setMisCotizaciones] = useState<BidData[]>([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)

  // Modal cotizar
  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedJob, setSelectedJob]   = useState<JobData | null>(null)
  const [submitting, setSubmitting]     = useState(false)
  const [bidErrors, setBidErrors]       = useState<Record<string, string>>({})
  const [bidSuccess, setBidSuccess]     = useState(false)
  const [bidForm, setBidForm] = useState({
    amount: "", estimated_days: "", proposal: "", availability_date: "",
  })

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {}
  const isVerified = !!user?.is_verified

  const navigation = [
    { name: "Inicio",           href: "/dashboard/tecnico",              icon: Home,          current: true  },
    { name: "Trabajos",         href: "/dashboard/tecnico/trabajos",     icon: Briefcase,     current: false },
    { name: "Mis Cotizaciones", href: "/dashboard/tecnico/cotizaciones", icon: FileText,      current: false },
    { name: "Mensajes",         href: "/dashboard/tecnico/mensajes",     icon: MessageSquare, current: false, badge: 3 },
    { name: "Mi Perfil",        href: "/dashboard/tecnico/perfil",       icon: User,          current: false },
    { name: "Configuración",    href: "/dashboard/tecnico/configuracion",icon: Settings,      current: false },
  ]

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const [jobsRes, bidsRes] = await Promise.all([
          getAvailableJobs(),
          getMyBids(),
        ])
        setTrabajos(jobsRes.data)
        setMisCotizaciones(bidsRes.data)
      } catch (err: any) {
        setError(err.message || "Error al cargar datos")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleCotizar(job: JobData) {
    setSelectedJob(job)
    setBidForm({ amount: "", estimated_days: "", proposal: "", availability_date: "" })
    setBidErrors({})
    setBidSuccess(false)
    setShowBidModal(true)
  }

  async function handleSubmitBid() {
    if (!selectedJob) return
    setBidErrors({})
    setSubmitting(true)
    try {
      await storeBid({
        job_id:            selectedJob.id,
        amount:            parseFloat(bidForm.amount),
        estimated_days:    parseInt(bidForm.estimated_days),
        proposal:          bidForm.proposal,
        availability_date: bidForm.availability_date,
      })
      setBidSuccess(true)
      const bidsRes = await getMyBids()
      setMisCotizaciones(bidsRes.data)
      setTimeout(() => setShowBidModal(false), 1500)
    } catch (err: any) {
      setBidErrors({ general: err.message || "Error al enviar cotización" })
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
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
              <Link key={item.name} href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {"badge" in item && item.badge && (
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
                  {user?.name?.charAt(0) || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name || "Técnico"}</p>
                  {isVerified && <Shield className="h-4 w-4 text-sidebar-primary" />}
                </div>
                <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  {user?.reputation_score || "0.00"} · {user?.jobs_completed || 0} trabajos
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

      {/* ── Main Content ── */}
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
              { label: "Trabajos este mes",      value: user?.jobs_completed || "0", icon: Briefcase,  color: "text-primary", change: "" },
              { label: "Cotizaciones enviadas",  value: misCotizaciones.length.toString(), icon: Send, color: "text-accent",   change: "" },
              { label: "Tasa de aceptación",     value: misCotizaciones.length > 0 ? `${Math.round((misCotizaciones.filter(b => b.status === "accepted").length / misCotizaciones.length) * 100)}%` : "0%", icon: TrendingUp, color: "text-warning", change: "" },
              { label: "Reputación",             value: user?.reputation_score || "0.00", icon: Star,   color: "text-accent",  change: "" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
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
                      <span className="text-3xl font-bold text-foreground">{user?.reputation_score || "0.00"}</span>
                      <span className="text-muted-foreground">/ 5.0</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user?.jobs_completed > 0 ? `Basado en ${user.jobs_completed} trabajos` : "Sin trabajos completados aún"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isVerified ? (
                    <Badge variant="outline" className="gap-1 border-accent text-accent">
                      <Shield className="h-3 w-3" />
                      Verificado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 border-warning text-warning">
                      <AlertCircle className="h-3 w-3" />
                      Pendiente verificación
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

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
                    {!loading && (
                      <Badge variant="secondary" className="ml-1">{trabajos.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="cotizaciones" className="gap-2">
                    <Send className="h-4 w-4" />
                    Mis Cotizaciones
                    {!loading && misCotizaciones.length > 0 && (
                      <Badge variant="secondary" className="ml-1">{misCotizaciones.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="asignados" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Asignados
                  </TabsTrigger>
                </TabsList>

                {/* ── Tab: Disponibles ── */}
                <TabsContent value="disponibles" className="mt-0">
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : trabajos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-foreground">No hay trabajos disponibles</h3>
                      <p className="text-sm text-muted-foreground">Los nuevos trabajos en tu zona aparecerán aquí</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trabajos.map((trabajo) => {
                        const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                        const yaCotice = misCotizaciones.some(b => b.job_id === trabajo.id)
                        return (
                          <div key={trabajo.id} className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-xs text-muted-foreground">{trabajo.code}</span>
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
                                  {trabajo.budget && (
                                    <span className="flex items-center gap-1">
                                      <DollarSign className="h-4 w-4" />
                                      Presupuesto: ${trabajo.budget}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2 flex-shrink-0">
                                {yaCotice ? (
                                  <Badge variant="outline" className="gap-1 border-accent text-accent">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Ya cotizaste
                                  </Badge>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="gap-1"
                                    disabled={!isVerified}
                                    onClick={() => handleCotizar(trabajo)}
                                  >
                                    <Send className="h-4 w-4" />
                                    Cotizar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </TabsContent>

                {/* ── Tab: Mis Cotizaciones ── */}
                <TabsContent value="cotizaciones" className="mt-0">
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : misCotizaciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Send className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-foreground">Sin cotizaciones enviadas</h3>
                      <p className="mb-6 max-w-sm text-sm text-muted-foreground">Tus cotizaciones aparecerán aquí</p>
                      <Button variant="outline" onClick={() => setActiveTab("disponibles")}>
                        Ver trabajos disponibles
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {misCotizaciones.map((cotizacion) => {
                        const estadoBid = estadoBidConfig[cotizacion.status] || estadoBidConfig.pending
                        return (
                          <div key={cotizacion.id} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground">Job #{cotizacion.job_id}</span>
                                <Badge variant={estadoBid.variant}>{estadoBid.label}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">{cotizacion.proposal}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Disponible: {cotizacion.availability_date.split("T")[0]}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {cotizacion.estimated_days} días estimados
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <div className="text-right">
                                <p className="text-lg font-bold text-foreground">${cotizacion.amount}</p>
                                <p className="text-xs text-muted-foreground">Tu cotización</p>
                              </div>
                              <Button variant="outline" size="sm" className="gap-1">
                                Ver
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </TabsContent>

                {/* ── Tab: Asignados ── */}
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

      {/* ── Modal: Enviar Cotización ── */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Cotización</DialogTitle>
            <DialogDescription>
              {selectedJob?.code} — {selectedJob?.title}
            </DialogDescription>
          </DialogHeader>

          {bidSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">¡Cotización enviada!</h3>
              <p className="text-sm text-muted-foreground">El cliente será notificado</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                {bidErrors.general && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                    {bidErrors.general}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="amount">Monto (USD) *</Label>
                    <Input
                      id="amount" type="number" step="0.01" min="1" placeholder="0.00"
                      value={bidForm.amount}
                      onChange={(e) => setBidForm({ ...bidForm, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="days">Días estimados *</Label>
                    <Input
                      id="days" type="number" min="1" placeholder="1"
                      value={bidForm.estimated_days}
                      onChange={(e) => setBidForm({ ...bidForm, estimated_days: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Disponible desde *</Label>
                  <Input
                    id="date" type="date" min={today}
                    value={bidForm.availability_date}
                    onChange={(e) => setBidForm({ ...bidForm, availability_date: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proposal">
                    Propuesta * <span className="text-muted-foreground text-xs">(20-500 caracteres)</span>
                  </Label>
                  <Textarea
                    id="proposal" rows={4} maxLength={500}
                    placeholder="Describe qué incluye tu servicio, materiales, garantía..."
                    value={bidForm.proposal}
                    onChange={(e) => setBidForm({ ...bidForm, proposal: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground text-right">{bidForm.proposal.length}/500</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBidModal(false)} disabled={submitting}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmitBid} disabled={submitting} className="gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Enviando..." : "Enviar cotización"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
