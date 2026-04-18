"use client"

import Link from "next/link"
import { useState } from "react"
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

const trabajo = {
  id: "OFP-2025-00042",
  titulo: "Mantenimiento de aire acondicionado split",
  descripcion: "Necesito mantenimiento preventivo para mi aire acondicionado split de 12,000 BTU marca LG. El equipo tiene aproximadamente 2 años de uso y nunca le han hecho mantenimiento. Está instalado en la sala del apartamento.",
  categoria: "Mantenimiento preventivo",
  estado: "PUBLICADO",
  zona: "Costa del Este",
  direccion: "PH Ocean View, Torre A, Piso 15",
  urgencia: "normal",
  presupuesto: 150,
  fechaPublicacion: "2025-04-15",
  imagenes: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
}

const cotizaciones = [
  {
    id: "COT-001",
    tecnico: {
      id: "TEC-001",
      nombre: "Carlos Mendoza",
      avatar: "",
      rating: 4.9,
      trabajosCompletados: 127,
      verificado: true,
      especialidad: "Mantenimiento y reparación",
      experiencia: "8 años",
    },
    monto: 85,
    tiempoEstimado: "2-3 horas",
    disponibilidad: "2025-04-17",
    propuesta: "Realizo el mantenimiento completo incluyendo: limpieza de filtros, revisión de gas refrigerante, limpieza de serpentines, revisión eléctrica y prueba de funcionamiento. Incluyo materiales de limpieza.",
    fechaEnvio: "2025-04-15T10:30:00",
  },
  {
    id: "COT-002",
    tecnico: {
      id: "TEC-002",
      nombre: "Roberto Santos",
      avatar: "",
      rating: 4.7,
      trabajosCompletados: 89,
      verificado: true,
      especialidad: "Instalación y mantenimiento",
      experiencia: "5 años",
    },
    monto: 95,
    tiempoEstimado: "1-2 horas",
    disponibilidad: "2025-04-16",
    propuesta: "Ofrezco servicio de mantenimiento preventivo con garantía de 30 días. Incluye revisión completa del sistema, limpieza profunda y certificado de mantenimiento.",
    fechaEnvio: "2025-04-15T11:45:00",
  },
  {
    id: "COT-003",
    tecnico: {
      id: "TEC-003",
      nombre: "Miguel Arias",
      avatar: "",
      rating: 4.8,
      trabajosCompletados: 203,
      verificado: true,
      especialidad: "Todo tipo de servicios A/C",
      experiencia: "12 años",
    },
    monto: 75,
    tiempoEstimado: "3-4 horas",
    disponibilidad: "2025-04-18",
    propuesta: "Mantenimiento completo a precio competitivo. Limpieza de unidad interior y exterior, revisión de presiones, verificación de amperaje. Experiencia en todas las marcas.",
    fechaEnvio: "2025-04-15T14:20:00",
  },
  {
    id: "COT-004",
    tecnico: {
      id: "TEC-004",
      nombre: "José Pérez",
      avatar: "",
      rating: 4.6,
      trabajosCompletados: 45,
      verificado: true,
      especialidad: "Mantenimiento residencial",
      experiencia: "3 años",
    },
    monto: 70,
    tiempoEstimado: "2 horas",
    disponibilidad: "2025-04-16",
    propuesta: "Servicio de mantenimiento básico con atención personalizada. Nuevo en la plataforma pero con experiencia comprobada.",
    fechaEnvio: "2025-04-15T16:00:00",
  },
]

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  PUBLICADO: { label: "Publicado", variant: "default", icon: Clock },
  EN_PROGRESO: { label: "En Progreso", variant: "secondary", icon: AlertCircle },
  COMPLETADO: { label: "Completado", variant: "outline", icon: CheckCircle2 },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgente: { label: "Urgente", className: "bg-warning/20 text-warning-foreground" },
  emergencia: { label: "Emergencia", className: "bg-destructive/20 text-destructive" },
}

export default function TrabajoDetallePage() {
  const [sortBy, setSortBy] = useState<"rating" | "precio" | "fecha">("rating")
  const [expandedCotizacion, setExpandedCotizacion] = useState<string | null>(null)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [selectedCotizacion, setSelectedCotizacion] = useState<typeof cotizaciones[0] | null>(null)

  const estado = estadoConfig[trabajo.estado]
  const urgencia = urgenciaConfig[trabajo.urgencia]

  const sortedCotizaciones = [...cotizaciones].sort((a, b) => {
    if (sortBy === "rating") return b.tecnico.rating - a.tecnico.rating
    if (sortBy === "precio") return a.monto - b.monto
    return new Date(b.fechaEnvio).getTime() - new Date(a.fechaEnvio).getTime()
  })

  const handleAcceptCotizacion = (cotizacion: typeof cotizaciones[0]) => {
    setSelectedCotizacion(cotizacion)
    setShowAcceptDialog(true)
  }

  const confirmAccept = () => {
    console.log("Cotización aceptada:", selectedCotizacion)
    setShowAcceptDialog(false)
  }

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
            <p className="font-mono text-xs text-muted-foreground">{trabajo.id}</p>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job Info Card */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={estado.variant} className="gap-1">
                    <estado.icon className="h-3 w-3" />
                    {estado.label}
                  </Badge>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                    {urgencia.label}
                  </span>
                </div>
                <CardTitle className="text-xl">{trabajo.titulo}</CardTitle>
                <CardDescription>{trabajo.categoria}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{trabajo.descripcion}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Zona:</span>
                    <span className="font-medium text-foreground">{trabajo.zona}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Publicado:</span>
                    <span className="font-medium text-foreground">{trabajo.fechaPublicacion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Presupuesto:</span>
                    <span className="font-medium text-foreground">${trabajo.presupuesto}</span>
                  </div>
                </div>

                {trabajo.imagenes.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Imágenes adjuntas</p>
                    <div className="flex gap-2">
                      {trabajo.imagenes.map((img, index) => (
                        <div key={index} className="h-20 w-20 overflow-hidden rounded-lg border border-border">
                          <img src={img} alt={`Imagen ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cotizaciones */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Cotizaciones recibidas</CardTitle>
                    <CardDescription>{cotizaciones.length} técnicos han enviado propuestas</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "rating" | "precio" | "fecha")}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                    >
                      <option value="rating">Mejor valorado</option>
                      <option value="precio">Menor precio</option>
                      <option value="fecha">Más reciente</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedCotizaciones.map((cotizacion, index) => {
                  const isExpanded = expandedCotizacion === cotizacion.id
                  const isBestPrice = cotizacion.monto === Math.min(...cotizaciones.map((c) => c.monto))
                  const isBestRating = cotizacion.tecnico.rating === Math.max(...cotizaciones.map((c) => c.tecnico.rating))

                  return (
                    <div
                      key={cotizacion.id}
                      className={`rounded-lg border bg-card transition-all ${
                        index === 0 ? "border-primary shadow-sm" : "border-border"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          {/* Technician Info */}
                          <div className="flex gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={cotizacion.tecnico.avatar} />
                              <AvatarFallback>{cotizacion.tecnico.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{cotizacion.tecnico.nombre}</span>
                                {cotizacion.tecnico.verificado && (
                                  <Shield className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-warning text-warning" />
                                <span>{cotizacion.tecnico.rating}</span>
                                <span>·</span>
                                <span>{cotizacion.tecnico.trabajosCompletados} trabajos</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{cotizacion.tecnico.especialidad}</p>
                            </div>
                          </div>

                          {/* Price & Badges */}
                          <div className="flex items-start gap-4">
                            <div className="flex flex-wrap gap-1">
                              {isBestPrice && (
                                <Badge variant="outline" className="border-accent text-accent">
                                  Mejor precio
                                </Badge>
                              )}
                              {isBestRating && (
                                <Badge variant="outline" className="border-warning text-warning">
                                  Mejor valorado
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-foreground">${cotizacion.monto}</p>
                              <p className="text-xs text-muted-foreground">{cotizacion.tiempoEstimado}</p>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Disponible: {cotizacion.disponibilidad}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {cotizacion.tiempoEstimado}
                          </div>
                        </div>

                        {/* Expandable Proposal */}
                        <button
                          onClick={() => setExpandedCotizacion(isExpanded ? null : cotizacion.id)}
                          className="mt-4 flex w-full items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                        >
                          <span>Ver propuesta completa</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 rounded-lg bg-muted/50 p-4">
                            <p className="text-sm text-foreground">{cotizacion.propuesta}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 gap-1">
                            <MessageSquare className="h-4 w-4" />
                            Mensaje
                          </Button>
                          <Button size="sm" className="flex-1" onClick={() => handleAcceptCotizacion(cotizacion)}>
                            Aceptar Cotización
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen de cotizaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total recibidas</span>
                  <span className="font-medium text-foreground">{cotizaciones.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio más bajo</span>
                  <span className="font-medium text-accent">${Math.min(...cotizaciones.map((c) => c.monto))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio más alto</span>
                  <span className="font-medium text-foreground">${Math.max(...cotizaciones.map((c) => c.monto))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Promedio</span>
                  <span className="font-medium text-foreground">
                    ${Math.round(cotizaciones.reduce((a, b) => a + b.monto, 0) / cotizaciones.length)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tu presupuesto</span>
                  <span className="font-medium text-foreground">${trabajo.presupuesto}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Clock className="h-4 w-4" />
                  Cerrar cotizaciones
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Cancelar trabajo
                </Button>
              </CardContent>
            </Card>

            {/* Help Card */}
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

      {/* Accept Cotizacion Dialog */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar selección</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas aceptar esta cotización?
            </DialogDescription>
          </DialogHeader>

          {selectedCotizacion && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedCotizacion.tecnico.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{selectedCotizacion.tecnico.nombre}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {selectedCotizacion.tecnico.rating} · {selectedCotizacion.tecnico.trabajosCompletados} trabajos
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Monto</p>
                  <p className="text-lg font-bold text-foreground">${selectedCotizacion.monto}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tiempo estimado</p>
                  <p className="font-medium text-foreground">{selectedCotizacion.tiempoEstimado}</p>
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
            <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAccept}>
              Confirmar selección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
