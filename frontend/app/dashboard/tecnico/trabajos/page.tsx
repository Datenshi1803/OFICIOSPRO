"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Clock, CheckCircle2, AlertCircle, Star,
  ChevronRight, MapPin, Calendar, DollarSign,
  Filter, MoreVertical, Briefcase, Loader2,
  Send, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getTechnicianJobs, storeBid, JobData } from "@/lib/api"

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal:    { label: "Normal",     className: "bg-muted text-muted-foreground" },
  urgent:    { label: "Urgente",    className: "bg-warning/20 text-warning-foreground" },
  emergency: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  in_progress: { label: "Asignado",   variant: "secondary",    icon: AlertCircle },
  completed:   { label: "Completado", variant: "outline",      icon: CheckCircle2 },
  reviewed:    { label: "Reseñado",   variant: "default",      icon: Star },
  disputed:    { label: "En Disputa", variant: "destructive",  icon: AlertCircle },
  cancelled:   { label: "Cancelado",  variant: "destructive",  icon: X },
  published:   { label: "Publicado",  variant: "outline",      icon: Clock },
}

export default function TecnicoTrabajos() {
  const { user } = useAuth()
  const [activeTab, setActiveTab]   = useState("todos")
  const [trabajos, setTrabajos]     = useState<JobData[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)

  const [selectedJob, setSelectedJob]         = useState<JobData | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showBidModal, setShowBidModal]         = useState(false)
  const [submitting, setSubmitting]             = useState(false)
  const [bidErrors, setBidErrors]               = useState<Record<string, string>>({})
  const [bidSuccess, setBidSuccess]             = useState(false)
  const [bidForm, setBidForm] = useState({
    amount: "", estimated_days: "", proposal: "", availability_date: "",
  })

  const isVerified = !!user?.is_verified
  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const res = await getTechnicianJobs()
        setTrabajos(res.data)
      } catch (err: any) {
        setError(err.message || "Error al cargar datos")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleVerDetalles(job: JobData) {
    setSelectedJob(job)
    setShowDetailsModal(true)
  }

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
      setTimeout(() => setShowBidModal(false), 1500)
    } catch (err: any) {
      setBidErrors({ general: err.message || "Error al enviar cotización" })
    } finally {
      setSubmitting(false)
    }
  }

  const filtrarTrabajos = (tab: string) =>
    trabajos.filter(t =>
      tab === "todos"        ? true :
      tab === "en_progreso"  ? t.status === "in_progress" :
      ["completed", "reviewed"].includes(t.status)
    )

  return (
    <div className="space-y-6">

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Tabla de trabajos */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Mis Trabajos</CardTitle>
              <CardDescription>Visualiza y gestiona todos los trabajos asignados</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="todos">
                Todos
                {!loading && <Badge variant="secondary" className="ml-1">{trabajos.length}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="en_progreso">
                Asignados
                {!loading && filtrarTrabajos("en_progreso").length > 0 && (
                  <Badge variant="secondary" className="ml-1">{filtrarTrabajos("en_progreso").length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completados">Completados</TabsTrigger>
            </TabsList>

            {["todos", "en_progreso", "completados"].map(tabValue => (
              <TabsContent key={tabValue} value={tabValue} className="mt-0">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filtrarTrabajos(tabValue).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">No hay trabajos en esta sección</h3>
                    <p className="text-sm text-muted-foreground">Tus trabajos aparecerán aquí una vez asignados</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filtrarTrabajos(tabValue).map((trabajo) => {
                      const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                      const estado   = estadoConfig[trabajo.status]   || { label: trabajo.status, variant: "outline", icon: Clock }
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
                              <h3 className="font-medium">{trabajo.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{trabajo.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />{trabajo.zone}
                                </span>
                                {trabajo.budget && (
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />Presupuesto: ${trabajo.budget}
                                  </span>
                                )}
                              </div>
                              {trabajo.client && (
                                <div className="flex items-center gap-2 mt-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[10px]">
                                      {trabajo.client.name?.charAt(0) || "C"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">Cliente: {trabajo.client.name}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button variant="outline" size="sm" className="gap-1" onClick={() => handleVerDetalles(trabajo)}>
                                Ver Detalles <ChevronRight className="h-4 w-4" />
                              </Button>
                              {trabajo.status === "published" && (
                                <Button size="sm" className="gap-1" disabled={!isVerified} onClick={() => handleCotizar(trabajo)}>
                                  <Send className="h-4 w-4" /> Cotizar
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
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal: Ver Detalles */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Trabajo</DialogTitle>
            <DialogDescription>Información completa de la solicitud</DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{selectedJob.code}</span>
                <Badge variant={estadoConfig[selectedJob.status]?.variant as any || "outline"}>
                  {estadoConfig[selectedJob.status]?.label || selectedJob.status}
                </Badge>
                <span className={`rounded-full px-2 py-0.5 text-xs ${urgenciaConfig[selectedJob.urgency]?.className || ""}`}>
                  {urgenciaConfig[selectedJob.urgency]?.label || selectedJob.urgency}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                {selectedJob.category && (
                  <p className="text-sm text-muted-foreground">{selectedJob.category.name}</p>
                )}
              </div>

              <div className="bg-muted/50 p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Descripción</p>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium flex items-center gap-1"><MapPin className="h-4 w-4" /> Zona</p>
                  <p className="text-muted-foreground mt-1">{selectedJob.zone}</p>
                </div>
                <div>
                  <p className="font-medium flex items-center gap-1"><Calendar className="h-4 w-4" /> Creado el</p>
                  <p className="text-muted-foreground mt-1">{new Date(selectedJob.created_at).toLocaleDateString()}</p>
                </div>
                {selectedJob.budget && (
                  <div>
                    <p className="font-medium flex items-center gap-1"><DollarSign className="h-4 w-4" /> Presupuesto</p>
                    <p className="text-muted-foreground mt-1">${selectedJob.budget}</p>
                  </div>
                )}
              </div>

              {selectedJob.client && (
                <div className="border-t pt-4">
                  <p className="font-medium mb-2 text-sm">Cliente</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{selectedJob.client.name?.charAt(0) || "C"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedJob.client.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        {selectedJob.client.reputation_score || "0.00"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>Cerrar</Button>
            {selectedJob?.status === "published" && (
              <Button onClick={() => { setShowDetailsModal(false); handleCotizar(selectedJob) }}>
                Cotizar este trabajo
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Enviar Cotización */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Cotización</DialogTitle>
            <DialogDescription>{selectedJob?.code} — {selectedJob?.title}</DialogDescription>
          </DialogHeader>

          {bidSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">¡Cotización enviada!</h3>
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
                    <Input id="amount" type="number" step="0.01" min="1" placeholder="0.00"
                      value={bidForm.amount}
                      onChange={(e) => setBidForm({ ...bidForm, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="days">Días estimados *</Label>
                    <Input id="days" type="number" min="1" placeholder="1"
                      value={bidForm.estimated_days}
                      onChange={(e) => setBidForm({ ...bidForm, estimated_days: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Disponible desde *</Label>
                  <Input id="date" type="date" min={today}
                    value={bidForm.availability_date}
                    onChange={(e) => setBidForm({ ...bidForm, availability_date: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proposal">
                    Propuesta * <span className="text-muted-foreground text-xs">(20-500 caracteres)</span>
                  </Label>
                  <Textarea id="proposal" rows={4} maxLength={500}
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