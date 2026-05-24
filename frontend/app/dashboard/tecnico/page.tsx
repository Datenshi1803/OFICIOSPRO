"use client"

import { useState, useEffect } from "react"
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Eye,
  Send,
  Loader2,
  Zap,
  ArrowUpRight,
  RefreshCw,
  Images,
  User,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useQuota } from "@/hooks/use-quota"
import { getAvailableJobs, getMyBids, storeBid, JobData, BidData } from "@/lib/api"
import { optimizeCloudinaryUrl } from "@/lib/cloudinary"

const urgenciaConfig: Record<string, { label: string; bgClass: string; dotClass: string; icon: any }> = {
  normal: {
    label: "Normal",
    bgClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dotClass: "bg-slate-500",
    icon: Clock,
  },
  urgent: {
    label: "Urgente",
    bgClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dotClass: "bg-amber-500",
    icon: AlertCircle,
  },
  emergency: {
    label: "Emergencia",
    bgClass: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    dotClass: "bg-rose-500",
    icon: Zap,
  },
}

const estadoBidConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending: { label: "Pendiente", variant: "secondary" },
  accepted: { label: "Aceptada", variant: "default" },
  rejected: { label: "Rechazada", variant: "destructive" },
}

export default function TecnicoDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { loading: loadingQuota, quotaMessage, checkAndBid, quota } = useQuota()

  const [activeTab, setActiveTab] = useState("disponibles")
  const [trabajos, setTrabajos] = useState<JobData[]>([])
  const [misCotizaciones, setMisCotizaciones] = useState<BidData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [bidErrors, setBidErrors] = useState<Record<string, string>>({})
  const [bidSuccess, setBidSuccess] = useState(false)
  const [bidForm, setBidForm] = useState({
    amount: "",
    estimated_days: "",
    proposal: "",
    availability_date: "",
  })

  // ── Nuevo: modal de detalles ──────────────────────────────
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailJob, setDetailJob] = useState<JobData | null>(null)

  const isVerified = !!user?.is_verified

  async function loadData(showRefresh = false) {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      const [jobsRes, bidsRes] = await Promise.all([getAvailableJobs(), getMyBids()])
      setTrabajos(jobsRes.data)
      setMisCotizaciones(bidsRes.data)
    } catch (err: any) {
      setError(err.message || "Error al cargar datos")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { loadData() }, [])

  function handleCotizar(job: JobData) {
    if (!checkAndBid()) return
    setSelectedJob(job)
    setBidForm({ amount: "", estimated_days: "", proposal: "", availability_date: "" })
    setBidErrors({})
    setBidSuccess(false)
    setShowBidModal(true)
  }

  function handleVerDetalles(job: JobData) {
    setDetailJob(job)
    setShowDetailModal(true)
  }

  async function handleSubmitBid() {
    if (!selectedJob) return
    setBidErrors({})
    setSubmitting(true)
    try {
      await storeBid({
        job_id: selectedJob.id,
        amount: parseFloat(bidForm.amount),
        estimated_days: parseInt(bidForm.estimated_days),
        proposal: bidForm.proposal,
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

  const trabajosFiltrados = trabajos.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalAceptadas = misCotizaciones.filter((b) => b.status === "accepted").length
  const tasaAceptacion =
    misCotizaciones.length > 0 ? Math.round((totalAceptadas / misCotizaciones.length) * 100) : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            {trabajos.length > 0
              ? `Hay ${trabajos.length} trabajo${trabajos.length > 1 ? "s" : ""} disponible${trabajos.length > 1 ? "s" : ""} en tu zona`
              : "Resumen general"}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Hola, {user?.name?.split(" ")[0] || "Técnico"}
          </h2>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-full bg-card shadow-sm transition-all hover:shadow-md"
          onClick={() => loadData(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Trabajos completados", value: user?.jobs_completed || "0", icon: Briefcase, color: "from-blue-500/20 to-blue-500/5", iconBg: "bg-blue-500" },
          { label: "Tasa de aceptación", value: `${tasaAceptacion}%`, icon: TrendingUp, color: "from-emerald-500/20 to-emerald-500/5", iconBg: "bg-emerald-500" },
          { label: "Cotizaciones enviadas", value: misCotizaciones.length.toString(), icon: Send, color: "from-indigo-500/20 to-indigo-500/5", iconBg: "bg-indigo-500" },
          { label: "Reputación", value: user?.reputation_score || "0.00", icon: Star, color: "from-amber-500/20 to-amber-500/5", iconBg: "bg-amber-500" },
        ].map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden rounded-2xl border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
            <CardContent className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} text-white shadow-inner`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-foreground">{stat.value}</h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle className="text-xl">Mercado de Trabajos</CardTitle>
          <CardDescription>Explora trabajos disponibles y gestiona tus cotizaciones</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="rounded-xl bg-secondary/50 p-1">
                <TabsTrigger value="disponibles" className="gap-2 rounded-lg">
                  <Eye className="h-4 w-4" />
                  Disponibles
                  {!loading && (
                    <Badge variant="secondary" className="ml-0.5 h-5 px-1.5">{trabajos.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="cotizaciones" className="gap-2 rounded-lg">
                  <Send className="h-4 w-4" />
                  Mis Ofertas
                  {!loading && misCotizaciones.length > 0 && (
                    <Badge variant="secondary" className="ml-0.5 h-5 px-1.5">{misCotizaciones.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="asignados" className="gap-2 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  Asignados
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="disponibles" className="mt-0 space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Cargando trabajos...</p>
                  </div>
                ) : trabajosFiltrados.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 text-center">
                    <Briefcase className="mb-4 h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-bold">Sin resultados</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">No hay trabajos disponibles en este momento.</p>
                  </div>
                ) : (
                  trabajosFiltrados.map((trabajo) => {
                    const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                    const yaCotice = misCotizaciones.some((b) => b.job_id === trabajo.id)
                    const expanded = expandedJob === trabajo.id
                    const UrgIcon = urgencia.icon
                    const imageCount = trabajo.images?.length ?? 0

                    return (
                      <div
                        key={trabajo.id}
                        className={`group rounded-2xl border bg-card p-5 transition-all duration-300 ${
                          yaCotice ? "border-emerald-200 bg-emerald-50/10" : "hover:border-primary/30 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="font-mono">#{trabajo.code}</Badge>
                              <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${urgencia.bgClass}`}>
                                <UrgIcon className="h-3 w-3" />
                                {urgencia.label}
                              </span>
                              {/* ── Indicador de imágenes ── */}
                              {imageCount > 0 && (
                                <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                  <Images className="h-3 w-3" />
                                  {imageCount} {imageCount === 1 ? "imagen" : "imágenes"}
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                              {trabajo.title}
                            </h3>

                            <p className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-2"}`}>
                              {trabajo.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/50 px-3 py-1 text-sm font-medium text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                {trabajo.zone}
                              </div>
                              {trabajo.budget && (
                                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                                  <DollarSign className="h-4 w-4" />
                                  ${trabajo.budget}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex min-w-[160px] flex-col items-start justify-between gap-3 pt-4 sm:items-end lg:border-l lg:pl-6 lg:pt-0">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(trabajo.created_at).toLocaleDateString()}
                            </span>

                            <div className="w-full space-y-2">
                              {/* ── Botón Ver detalles ── */}
                              <Button
                                variant="outline"
                                className="w-full rounded-xl font-semibold"
                                onClick={() => handleVerDetalles(trabajo)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </Button>

                              {yaCotice ? (
                                <Button className="w-full rounded-xl font-semibold" disabled>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Oferta enviada
                                </Button>
                              ) : quota?.can_bid ? (
                                <Button
                                  className="w-full rounded-xl font-semibold"
                                  disabled={!isVerified || loadingQuota}
                                  onClick={() => handleCotizar(trabajo)}
                                >
                                  <Send className="mr-2 h-4 w-4" />
                                  Cotizar ahora
                                </Button>
                              ) : (
                                <Button
                                  className="w-full rounded-xl font-semibold"
                                  variant="outline"
                                  disabled={loadingQuota}
                                  onClick={() => router.push('/dashboard/tecnico/creditos')}
                                >
                                  <Zap className="mr-2 h-4 w-4 text-primary" />
                                  Comprar créditos
                                </Button>
                              )}

                              {!yaCotice && quotaMessage() && (
                                <p className="text-right text-xs text-muted-foreground">{quotaMessage()}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </TabsContent>

              <TabsContent value="cotizaciones" className="mt-0">
                {misCotizaciones.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed py-16 text-center">
                    <p className="text-muted-foreground">Aún no has enviado cotizaciones.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {misCotizaciones.map((cot) => (
                      <div key={cot.id} className="flex items-center justify-between rounded-2xl border p-5">
                        <div>
                          <p className="font-bold">Trabajo #{cot.job_id}</p>
                          <p className="text-sm text-muted-foreground">{cot.proposal}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">${cot.amount}</p>
                          <Badge variant={estadoBidConfig[cot.status]?.variant || "secondary"}>
                            {estadoBidConfig[cot.status]?.label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* ── Modal de detalles del trabajo ── */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="rounded-2xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Detalles del Trabajo
            </DialogTitle>
          </DialogHeader>

          {detailJob && (() => {
            const urgencia = urgenciaConfig[detailJob.urgency] || urgenciaConfig.normal
            const UrgIcon = urgencia.icon
            const yaCotice = misCotizaciones.some((b) => b.job_id === detailJob.id)

            return (
              <div className="max-h-[70vh] overflow-y-auto space-y-5 py-2 pr-1">
                {/* Encabezado */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="font-mono">#{detailJob.code}</Badge>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${urgencia.bgClass}`}>
                      <UrgIcon className="h-3 w-3" />
                      {urgencia.label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{detailJob.title}</h2>
                </div>

                {/* Descripción */}
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descripción</p>
                  <p className="text-sm leading-relaxed">{detailJob.description}</p>
                </div>

                {/* Info del trabajo */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/30 p-3">
                    <p className="mb-1 text-xs text-muted-foreground">Zona</p>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      {detailJob.zone}
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-3">
                    <p className="mb-1 text-xs text-muted-foreground">Publicado</p>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(detailJob.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {detailJob.budget && (
                    <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
                      <p className="mb-1 text-xs text-muted-foreground">Presupuesto</p>
                      <div className="flex items-center gap-1.5 font-medium text-emerald-600">
                        <DollarSign className="h-4 w-4" />
                        ${detailJob.budget}
                      </div>
                    </div>
                  )}
                  {detailJob.category && (
                    <div className="rounded-xl bg-muted/30 p-3">
                      <p className="mb-1 text-xs text-muted-foreground">Categoría</p>
                      <p className="font-medium">{detailJob.category.name}</p>
                    </div>
                  )}
                </div>

                {/* Info del cliente */}
                {detailJob.client && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cliente</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{detailJob.client.name}</p>
                        {detailJob.client.reputation_score && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-amber-500" />
                            {detailJob.client.reputation_score} reputación
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Imágenes */}
                  {detailJob.images && detailJob.images.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Imágenes ({detailJob.images.length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {detailJob.images.map((img) => (
                          <a key={img.id} href={optimizeCloudinaryUrl(img.url, 1920)} target="_blank" rel="noopener noreferrer">
                            <img
                              src={optimizeCloudinaryUrl(img.url, 400)}
                              alt="Imagen del trabajo"
                              className="aspect-square w-full rounded-xl object-cover transition-opacity hover:opacity-80"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Botón cotizar desde el modal */}
                <DialogFooter>
                  {yaCotice ? (
                    <Button className="w-full rounded-xl" disabled>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Ya enviaste una oferta
                    </Button>
                  ) : quota?.can_bid ? (
                    <Button
                      className="w-full rounded-xl font-semibold"
                      disabled={!isVerified || loadingQuota}
                      onClick={() => {
                        setShowDetailModal(false)
                        handleCotizar(detailJob)
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Cotizar este trabajo
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-xl font-semibold"
                      variant="outline"
                      onClick={() => router.push('/dashboard/tecnico/creditos')}
                    >
                      <Zap className="mr-2 h-4 w-4 text-primary" />
                      Comprar créditos para cotizar
                    </Button>
                  )}
                </DialogFooter>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* ── Modal de cotización ── */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Enviar Cotización
            </DialogTitle>
          </DialogHeader>

          {bidSuccess ? (
            <div className="space-y-3 py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-bold">¡Enviada con éxito!</h3>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {bidErrors.general && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                  {bidErrors.general}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monto (USD)</Label>
                  <Input type="number" value={bidForm.amount} onChange={(e) => setBidForm({ ...bidForm, amount: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Días estimados</Label>
                  <Input type="number" value={bidForm.estimated_days} onChange={(e) => setBidForm({ ...bidForm, estimated_days: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fecha de disponibilidad</Label>
                <Input type="date" value={bidForm.availability_date} onChange={(e) => setBidForm({ ...bidForm, availability_date: e.target.value })} className="rounded-xl" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <Label>Propuesta</Label>
                <Textarea rows={4} value={bidForm.proposal} onChange={(e) => setBidForm({ ...bidForm, proposal: e.target.value })} className="rounded-xl" />
              </div>
              <DialogFooter>
                <Button onClick={handleSubmitBid} disabled={submitting} className="w-full rounded-xl">
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</>
                  ) : (
                    "Confirmar Cotización"
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}