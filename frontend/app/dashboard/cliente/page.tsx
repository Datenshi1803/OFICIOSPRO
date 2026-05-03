"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  FileText, Clock, CheckCircle2, DollarSign, 
  MapPin, Calendar, ChevronRight, Filter 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const trabajos = [
  {
    id: "OFP-2025-00042",
    titulo: "Mantenimiento de aire acondicionado split",
    estado: "PUBLICADO",
    zona: "Costa del Este",
    urgencia: "normal",
    presupuesto: 150,
    fechaPublicacion: "2025-04-15",
    cotizaciones: 4,
  },
  {
    id: "OFP-2025-00038",
    titulo: "Instalación de aire acondicionado nuevo",
    estado: "EN_PROGRESO",
    zona: "San Francisco",
    urgencia: "urgente",
    presupuesto: 350,
    fechaPublicacion: "2025-04-12",
    cotizaciones: 6,
    tecnicoAsignado: {
      nombre: "Carlos Mendoza",
      avatar: "",
      rating: 4.9,
    },
  },
]

const estadoConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PUBLICADO: { label: "Publicado", variant: "default" },
  EN_PROGRESO: { label: "En Progreso", variant: "secondary" },
  COMPLETADO: { label: "Completado", variant: "outline" },
  CANCELADO: { label: "Cancelado", variant: "destructive" },
}

const urgenciaConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  urgente: { label: "Urgente", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500" },
  emergencia: { label: "Emergencia", className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-500" },
}

export default function ClientePage() {
  const [activeTab, setActiveTab] = useState("todos")
  
  const [trabajos, setTrabajos] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Resumen de Estadísticas */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Trabajos Activos", value: "2", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Cotizaciones", value: "10", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Completados", value: "8", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Total Gastado", value: "$1,250", icon: DollarSign, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-800" },
        ].map((stat) => (
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
                {trabajos.map((trabajo) => {
                  const estado = estadoConfig[trabajo.estado]
                  const urgencia = urgenciaConfig[trabajo.urgencia]
                  return (
                    <div key={trabajo.id} className="group flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-md sm:flex-row sm:items-center">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">{trabajo.id}</span>
                          <Badge variant={estado.variant} className="rounded-full font-bold text-[10px]">{estado.label}</Badge>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight ${urgencia.className}`}>{urgencia.label}</span>
                        </div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{trabajo.titulo}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{trabajo.zona}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{trabajo.fechaPublicacion}</span>
                          <span className="flex items-center gap-1.5 font-bold text-foreground"><DollarSign className="h-3.5 w-3.5" />${trabajo.presupuesto}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-none">
                        {trabajo.estado === "PUBLICADO" && (
                          <div className="text-right">
                            <p className="text-xl font-black text-primary">{trabajo.cotizaciones}</p>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Ofertas</p>
                          </div>
                        )}
                        <Button variant="secondary" size="sm" className="rounded-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                          <Link href={`/dashboard/cliente/trabajos/${trabajo.id}`}>
                            Gestionar
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}