"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  FileText, Clock, CheckCircle2, DollarSign, 
  MapPin, Calendar, ChevronRight, Filter, Loader2 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getClientJobs, JobData } from "@/lib/api"

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  published: { label: "Publicado", variant: "default" },
  in_progress: { label: "En Progreso", variant: "secondary" },
  completed: { label: "Completado", variant: "outline" },
  cancelled: { label: "Cancelado", variant: "destructive" },
  reviewed: { label: "Reseñado", variant: "default" },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  urgente: { label: "Urgente", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500" },
  emergencia: { label: "Emergencia", className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-500" },
}

export default function ClientePage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [trabajosData, setTrabajosData] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadTrabajos() {
      setLoading(true)
      setError(null)

      try {
        const response = await getClientJobs()
        if (isMounted) {
          setTrabajosData(response.data ?? [])
        }
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : "Error al cargar los trabajos")
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTrabajos()

    return () => {
      isMounted = false
    }
  }, [])

  const normalizeStatus = (status: string | undefined) => status?.toLowerCase() ?? ""

  const trabajosActivos = trabajosData.filter((trabajo) => {
    const status = normalizeStatus(trabajo.status)
    return status === "published" || status === "in_progress"
  })

  const trabajosCompletados = trabajosData.filter((trabajo) => {
    const status = normalizeStatus(trabajo.status)
    return status === "completed" || status === "reviewed"
  })

  const getTrabajosByTab = (tab: string) => {
    if (tab === "activos") return trabajosActivos
    if (tab === "completados") return trabajosCompletados
    return trabajosData
  }

  const totalCotizaciones = trabajosData.reduce((sum, trabajo) => sum + (trabajo.bids_count ?? 0), 0)

  const stats = [
    { label: "Trabajos Activos", value: trabajosActivos.length.toString(), icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Cotizaciones", value: totalCotizaciones.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Completados", value: trabajosCompletados.length.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Total Gastado", value: "$1,250", icon: DollarSign, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-800" },
  ]

  const renderTrabajos = (trabajos: JobData[]) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }

    if (trabajos.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-2xl">
          <CheckCircle2 className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No tienes trabajos en esta sección aún.</p>
        </div>
      )
    }

    return trabajos.map((trabajo) => {
      const statusKey = normalizeStatus(trabajo.status)
      const estado = estadoConfig[statusKey] ?? { label: trabajo.status, variant: "outline" }
      const urgencia = urgenciaConfig[trabajo.urgency] ?? urgenciaConfig.normal

      return (
        <div key={trabajo.id} className="group flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-md sm:flex-row sm:items-center">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">{trabajo.code || trabajo.id}</span>
              <Badge variant={estado.variant} className="rounded-full font-bold text-[10px]">{estado.label}</Badge>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight ${urgencia.className}`}>{urgencia.label}</span>
            </div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{trabajo.title}</h3>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{trabajo.zone}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(trabajo.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5 font-bold text-foreground"><DollarSign className="h-3.5 w-3.5" />{trabajo.budget ? `$${trabajo.budget}` : "Sin presupuesto"}</span>
              <span className="flex items-center gap-1.5 text-slate-500">{trabajo.bids_count ?? 0} cotizaciones</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-none">
            <Button variant="secondary" size="sm" className="rounded-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
              <Link href={`/dashboard/cliente/trabajos/${trabajo.id}`}>
                Gestionar
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      {/* Resumen de Estadísticas */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Listado de Trabajos Recientes */}
      <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Mis Trabajos Recientes</CardTitle>
            <CardDescription>Gestiona tus solicitudes en curso</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 border-b">
              <TabsList className="bg-transparent gap-6 h-12">
                <TabsTrigger value="todos" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0">Todos</TabsTrigger>
                <TabsTrigger value="activos" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0">Activos</TabsTrigger>
                <TabsTrigger value="completados" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0">Completados</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="todos" className="mt-0 space-y-4">
                {renderTrabajos(getTrabajosByTab("todos"))}
              </TabsContent>

              <TabsContent value="activos" className="mt-0 space-y-4">
                {renderTrabajos(getTrabajosByTab("activos"))}
              </TabsContent>

              <TabsContent value="completados" className="mt-0 space-y-4">
                {renderTrabajos(getTrabajosByTab("completados"))}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}