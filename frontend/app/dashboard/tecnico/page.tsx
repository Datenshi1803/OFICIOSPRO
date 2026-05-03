"use client"

import { useState, useEffect } from "react"
import {
  Clock, CheckCircle2, AlertCircle, Star, ChevronRight, 
  MapPin, Calendar, DollarSign, Briefcase, Eye, Send, 
  Loader2, Zap, ChevronDown, ChevronUp, ArrowUpRight, RefreshCw,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TrendingUp } from "lucide-react"
import { getAvailableJobs, getMyBids, storeBid, JobData, BidData } from "@/lib/api"

const urgenciaConfig: Record<string, { label: string; bgClass: string; dotClass: string; icon: any }> = {
  normal:    { label: "Normal",     bgClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", dotClass: "bg-slate-500", icon: Clock },
  urgent:    { label: "Urgente",    bgClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dotClass: "bg-amber-500", icon: AlertCircle },
  emergency: { label: "Emergencia", bgClass: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400", dotClass: "bg-rose-500", icon: Zap },
}

const estadoBidConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending:  { label: "Pendiente", variant: "secondary" },
  accepted: { label: "Aceptada",  variant: "default"   },
  rejected: { label: "Rechazada", variant: "destructive" },
}

export default function TecnicoDashboard() {
  const [activeTab, setActiveTab]             = useState("disponibles")
  const [trabajos, setTrabajos]               = useState<JobData[]>([])
  const [misCotizaciones, setMisCotizaciones] = useState<BidData[]>([])
  const [loading, setLoading]                 = useState(true)
  const [refreshing, setRefreshing]           = useState(false)
  const [error, setError]                     = useState<string | null>(null)
  const [searchQuery, setSearchQuery]         = useState("")
  const [expandedJob, setExpandedJob]         = useState<number | null>(null)

  // Modal cotizar
  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedJob, setSelectedJob]   = useState<JobData | null>(null)
  const [submitting, setSubmitting]     = useState(false)
  const [bidErrors, setBidErrors]       = useState<Record<string, string>>({})
  const [bidSuccess, setBidSuccess]     = useState(false)
  const [bidForm, setBidForm]           = useState({
    amount: "", estimated_days: "", proposal: "", availability_date: "",
  })

  const isVerified = !!user?.is_verified
  const jobsCompleted = user?.jobs_completed ?? 0

  const handleLogout = async () => {
    await logout()
  }

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

  const trabajosFiltrados = trabajos.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAceptadas = misCotizaciones.filter(b => b.status === "accepted").length
  const tasaAceptacion = misCotizaciones.length > 0
    ? Math.round((totalAceptadas / misCotizaciones.length) * 100)
    : 0

  return (
    <div className="space-y-8">
      
      {/* Header de Bienvenida */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between px-2">
        <div>
          <p className="text-sm font-medium text-primary mb-1">
            {trabajos.length > 0
              ? `Hay ${trabajos.length} trabajo${trabajos.length > 1 ? "s" : ""} disponible${trabajos.length > 1 ? "s" : ""} en tu zona`
              : "Resumen general"}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Hola, {user?.name?.split(" ")[0] || "Técnico"} 
          </h2>
        </div>
        <Button variant="outline" className="gap-2 rounded-full shadow-sm hover:shadow-md transition-all bg-card" onClick={() => loadData(true)} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Trabajos completados", value: user?.jobs_completed || "0", icon: Briefcase, color: "from-blue-500/20 to-blue-500/5", iconBg: "bg-blue-500" },
          { label: "Tasa de aceptación", value: `${tasaAceptacion}%`, icon: TrendingUp, color: "from-emerald-500/20 to-emerald-500/5", iconBg: "bg-emerald-500" },
          { label: "Cotizaciones enviadas", value: misCotizaciones.length.toString(), icon: Send, color: "from-indigo-500/20 to-indigo-500/5", iconBg: "bg-indigo-500" },
          { label: "Reputación", value: user?.reputation_score || "0.00", icon: Star, color: "from-amber-500/20 to-amber-500/5", iconBg: "bg-amber-500" },
        ].map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} text-white shadow-inner`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight text-foreground">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mercado de Trabajos */}
      <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <CardTitle className="text-xl">Mercado de Trabajos</CardTitle>
          <CardDescription>Explora trabajos disponibles y gestiona tus cotizaciones</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="bg-secondary/50 p-1 rounded-xl">
                <TabsTrigger value="disponibles" className="rounded-lg gap-2">
                  <Eye className="h-4 w-4" /> Disponibles
                  {!loading && <Badge variant="secondary" className="ml-0.5 h-5 px-1.5">{trabajos.length}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="cotizaciones" className="rounded-lg gap-2">
                  <Send className="h-4 w-4" /> Mis Ofertas
                  {!loading && misCotizaciones.length > 0 && (
                    <Badge variant="secondary" className="ml-0.5 h-5 px-1.5">{misCotizaciones.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="asignados" className="rounded-lg gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Asignados
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="disponibles" className="mt-0 space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground font-medium">Cargando trabajos...</p>
                  </div>
                ) : trabajosFiltrados.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-2xl">
                    <Briefcase className="h-8 w-8 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-bold">Sin resultados</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">No hay trabajos disponibles en este momento.</p>
                  </div>
                ) : (
                  trabajosFiltrados.map((trabajo) => {
                    const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                    const yaCotice = misCotizaciones.some(b => b.job_id === trabajo.id)
                    const expanded = expandedJob === trabajo.id
                    const UrgIcon = urgencia.icon

                    return (
                      <div key={trabajo.id} className={`group rounded-2xl border bg-card p-5 transition-all duration-300 ${yaCotice ? "border-emerald-200 bg-emerald-50/10" : "hover:border-primary/30 hover:shadow-md"}`}>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="font-mono">#{trabajo.code}</Badge>
                              <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${urgencia.bgClass}`}>
                                <UrgIcon className="h-3 w-3" /> {urgencia.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{trabajo.title}</h3>
                            <p className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>{trabajo.description}</p>
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg">
                                <MapPin className="h-4 w-4 text-primary" /> {trabajo.zone}
                              </div>
                              {trabajo.budget && (
                                <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                                  <DollarSign className="h-4 w-4" /> ${trabajo.budget}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-start sm:items-end gap-4 min-w-[160px] pt-4 lg:pt-0 lg:border-l lg:pl-6">
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" /> 
                              {new Date(trabajo.created_at).toLocaleDateString()}
                            </span>
                            <Button 
                              className="w-full rounded-xl font-semibold"
                              disabled={!isVerified || yaCotice}
                              onClick={() => handleCotizar(trabajo)}
                            >
                              {yaCotice ? "Oferta enviada" : "Cotizar ahora"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </TabsContent>

              {/* Otras Tabs (Cotizaciones/Asignados) simplificadas para brevedad */}
              <TabsContent value="cotizaciones" className="mt-0">
                {misCotizaciones.length === 0 ? (
                  <div className="py-16 text-center border-2 border-dashed rounded-2xl">
                    <p className="text-muted-foreground">Aún no has enviado cotizaciones.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {misCotizaciones.map((cot) => (
                      <div key={cot.id} className="rounded-2xl border p-5 flex justify-between items-center">
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

      {/* Modal Cotizar */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" /> Enviar Cotización
            </DialogTitle>
          </DialogHeader>

          {bidSuccess ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold">¡Enviada con éxito!</h3>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monto (USD)</Label>
                  <Input type="number" value={bidForm.amount} onChange={(e) => setBidForm({...bidForm, amount: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Días estimados</Label>
                  <Input type="number" value={bidForm.estimated_days} onChange={(e) => setBidForm({...bidForm, estimated_days: e.target.value})} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Propuesta</Label>
                <Textarea rows={4} value={bidForm.proposal} onChange={(e) => setBidForm({...bidForm, proposal: e.target.value})} className="rounded-xl" />
              </div>
              <DialogFooter>
                <Button onClick={handleSubmitBid} disabled={submitting} className="w-full rounded-xl">
                  {submitting ? "Enviando..." : "Confirmar Cotización"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}