"use client"

import Link from "next/link"
import { useState, useEffect, type ElementType } from "react"
import {
  Plus,
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
  Loader2,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getClientJobs, JobData } from "@/lib/api"

const estadoConfig: Record<
  string,
  {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
    icon: ElementType
  }
> = {
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
  const [activeTab, setActiveTab] = useState("todos")
  const [trabajos, setTrabajos] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const getTrabajosByTab = (tabValue: string) => {
    return trabajos.filter((trabajo) =>
      tabValue === "todos"
        ? true
        : tabValue === "activos"
          ? trabajo.status === "published" || trabajo.status === "in_progress"
          : ["completed", "reviewed"].includes(trabajo.status),
    )
  }

  return (
    <main className="p-4 sm:p-6">
      {error && (
        <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
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

            <Button size="sm" className="gap-2" asChild>
              <Link href="/dashboard/cliente/nuevo-trabajo">
                <Plus className="h-4 w-4" />
                Nuevo Trabajo
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="todos" className="gap-2">
                Todos
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {trabajos.length}
                  </Badge>
                )}
              </TabsTrigger>

              <TabsTrigger value="activos" className="gap-2">
                Activos
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {getTrabajosByTab("activos").length}
                  </Badge>
                )}
              </TabsTrigger>

              <TabsTrigger value="completados" className="gap-2">
                Completados
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {getTrabajosByTab("completados").length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {["todos", "activos", "completados"].map((tabValue) => {
              const trabajosFiltrados = getTrabajosByTab(tabValue)

              return (
                <TabsContent key={tabValue} value={tabValue} className="mt-0">
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : trabajosFiltrados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-foreground">
                        No hay trabajos en esta sección
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Aquí aparecerán tus solicitudes de servicio
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trabajosFiltrados.map((trabajo) => {
                        const estado = estadoConfig[trabajo.status] || {
                          label: trabajo.status,
                          variant: "outline",
                          icon: Clock,
                        }
                        const urgencia = urgenciaConfig[trabajo.urgency] || urgenciaConfig.normal
                        const EstadoIcon = estado.icon

                        return (
                          <div
                            key={trabajo.id}
                            className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-xs text-muted-foreground">
                                    {trabajo.code}
                                  </span>

                                  <Badge variant={estado.variant} className="gap-1">
                                    <EstadoIcon className="h-3 w-3" />
                                    {estado.label}
                                  </Badge>

                                  <span className={`rounded-full px-2 py-0.5 text-xs ${urgencia.className}`}>
                                    {urgencia.label}
                                  </span>
                                </div>

                                <h3 className="font-medium text-foreground">{trabajo.title}</h3>

                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  {trabajo.description}
                                </p>

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

                              <div className="flex flex-shrink-0 gap-2">
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
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
