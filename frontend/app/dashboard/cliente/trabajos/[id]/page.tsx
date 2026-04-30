"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  MessageSquare,
  Shield,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  AlertCircle,
  Phone,
  Mail,
  User,
  Wrench,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getJobBids, BidData } from "@/lib/api"

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  published:      { label: "Publicado",   variant: "default"   },
  in_progress:    { label: "En Progreso", variant: "secondary" },
  completed:      { label: "Completado",  variant: "outline"   },
  cancelled:      { label: "Cancelado",   variant: "destructive" },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal:    { label: "Normal",     className: "bg-muted text-muted-foreground"         },
  urgent:    { label: "Urgente",    className: "bg-warning/20 text-warning-foreground"  },
  emergency: { label: "Emergencia", className: "bg-destructive/20 text-destructive"     },
}

export default function TrabajoDetallePage() {
  const params = useParams()
  const jobId = Number(params.id)

  const [bids, setBids]                         = useState<BidData[]>([])
  const [loading, setLoading]                   = useState(true)
  const [error, setError]                       = useState<string | null>(null)
  const [sortBy, setSortBy]                     = useState<"reputation" | "price" | "date">("reputation")
  const [expandedBid, setExpandedBid]           = useState<number | null>(null)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [selectedBid, setSelectedBid]           = useState<BidData | null>(null)
  const [accepting, setAccepting]               = useState(false)

  // ── Cargar cotizaciones ─────────────────────────────────────────────────────
  useEffect(() => {
    async function loadBids() {
      setLoading(true)
      setError(null)
      try {
        const res = await getJobBids(jobId, sortBy)
        setBids(res.data)
      } catch (err: any) {
        setError(err.message || "Error al cargar cotizaciones")
      } finally {
        setLoading(false)
      }
    }
    loadBids()
  }, [jobId, sortBy])

  function handleAccept(bid: BidData) {
    setSelectedBid(bid)
    setShowAcceptDialog(true)
  }

  async function confirmAccept() {
    // Por implementar: endpoint de aceptar cotización
    setAccepting(true)
    await new Promise(r => setTimeout(r, 1000)) // placeholder
    setAccepting(false)
    setShowAcceptDialog(false)
  }

  // Stats de cotizaciones
  const amounts      = bids.map(b => parseFloat(b.amount))
  const minAmount    = amounts.length ? Math.min(...amounts) : 0
  const maxAmount    = amounts.length ? Math.max(...amounts) : 0
  const avgAmount    = amounts.length ? amounts.reduce((a, b) => a + b, 0) / amounts.length : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/cliente">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Detalle del Trabajo</h1>
            <p className="font-mono text-xs text-muted-foreground">#{jobId}</p>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Columna principal ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Cotizaciones */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Cotizaciones recibidas</CardTitle>
                    <CardDescription>
                      {loading ? "Cargando..." : `${bids.length} técnico${bids.length !== 1 ? "s" : ""} han enviado propuestas`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "reputation" | "price" | "date")}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                    >
                      <option value="reputation">Mejor valorado</option>
                      <option value="price">Menor precio</option>
                      <option value="date">Más reciente</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Loading */}
                {loading && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}

                {/* Sin cotizaciones */}
                {!loading && bids.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">Aún no hay cotizaciones</h3>
                    <p className="text-sm text-muted-foreground">Los técnicos disponibles serán notificados.</p>
                  </div>
                )}

                {/* Lista de cotizaciones */}
                {!loading && bids.map((bid, index) => {
                  const isExpanded    = expandedBid === bid.id
                  const isBestPrice   = parseFloat(bid.amount) === minAmount && amounts.length > 1
                  const isBestRating  = bid.technician && parseFloat(bid.technician.reputation_score) === Math.max(...bids.map(b => parseFloat(b.technician?.reputation_score || "0"))) && bids.length > 1
                  const isNew         = bid.technician?.reputation_label === "Nuevo"

                  return (
                    <div
                      key={bid.id}
                      className={`rounded-lg border bg-card transition-all ${
                        index === 0 ? "border-primary shadow-sm" : "border-border"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          {/* Info técnico */}
                          <div className="flex gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={bid.technician?.avatar_url || ""} />
                                <AvatarFallback>{bid.technician?.name?.charAt(0) || "T"}</AvatarFallback>
                              </Avatar>
                              {bid.technician?.is_verified && (
                                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary border-2 border-background">
                                  <Shield className="h-2.5 w-2.5 text-primary-foreground" />
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{bid.technician?.name || "Técnico"}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-warning text-warning" />
                                <span>{isNew ? "Nuevo" : bid.technician?.reputation_label}</span>
                                {!isNew && (
                                  <>
                                    <span>·</span>
                                    <span>{bid.technician?.jobs_completed} trabajos</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Precio y badges */}
                          <div className="flex items-start gap-4">
                            <div className="flex flex-wrap gap-1">
                              {isBestPrice && (
                                <Badge variant="outline" className="border-accent text-accent text-xs">
                                  Mejor precio
                                </Badge>
                              )}
                              {isBestRating && !isNew && (
                                <Badge variant="outline" className="border-warning text-warning text-xs">
                                  Mejor valorado
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-foreground">${bid.amount}</p>
                              <p className="text-xs text-muted-foreground">{bid.estimated_days} día{bid.estimated_days !== 1 ? "s" : ""}</p>
                            </div>
                          </div>
                        </div>

                        {/* Info rápida */}
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Disponible: {bid.availability_date.split("T")[0]}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {bid.estimated_days} día{bid.estimated_days !== 1 ? "s" : ""} estimados
                          </div>
                        </div>

                        {/* Propuesta expandible */}
                        <button
                          onClick={() => setExpandedBid(isExpanded ? null : bid.id)}
                          className="mt-4 flex w-full items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                        >
                          <span>Ver propuesta completa</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 rounded-lg bg-muted/50 p-4">
                            <p className="text-sm text-foreground">{bid.proposal}</p>
                          </div>
                        )}

                        {/* Acciones */}
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAccept(bid)}
                            disabled={bid.status !== "pending"}
                          >
                            {bid.status === "accepted" ? "✓ Aceptada" : "Aceptar Cotización"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen de cotizaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total recibidas</span>
                  <span className="font-medium text-foreground">{bids.length}</span>
                </div>
                {bids.length > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Precio más bajo</span>
                      <span className="font-medium text-accent">${minAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Precio más alto</span>
                      <span className="font-medium text-foreground">${maxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Promedio</span>
                      <span className="font-medium text-foreground">${avgAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <h4 className="mb-2 font-medium text-foreground">¿Necesitas ayuda?</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  Si tienes dudas sobre cómo elegir al mejor técnico, contáctanos.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contactar soporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ── Dialog: Confirmar aceptar ── */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar selección</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas aceptar esta cotización?
            </DialogDescription>
          </DialogHeader>

          {selectedBid && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedBid.technician?.name?.charAt(0) || "T"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{selectedBid.technician?.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {selectedBid.technician?.reputation_label} · {selectedBid.technician?.jobs_completed} trabajos
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Monto</p>
                  <p className="text-lg font-bold text-foreground">${selectedBid.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Días estimados</p>
                  <p className="font-medium text-foreground">{selectedBid.estimated_days} días</p>
                </div>
              </div>

              <div className="rounded-lg bg-warning/10 p-3">
                <p className="text-sm text-foreground">
                  Al aceptar, se habilitará un chat con el técnico y los demás serán notificados.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAcceptDialog(false)} disabled={accepting}>
              Cancelar
            </Button>
            <Button onClick={confirmAccept} disabled={accepting} className="gap-2">
              {accepting && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirmar selección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
