"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  MoreVertical,
  Filter,
  Loader2,
  Eye,
  CheckIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const estadoConfig: Record<string, { label: string; variant: string; color: string }> = {
  open: { label: "Abierta", variant: "default", color: "bg-yellow-100 text-yellow-800" },
  in_review: { label: "En Revisión", variant: "secondary", color: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resuelta", variant: "outline", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rechazada", variant: "destructive", color: "bg-red-100 text-red-800" },
  closed: { label: "Cerrada", variant: "outline", color: "bg-gray-100 text-gray-800" },
}

interface AdminDispute {
  id: number
  job_id: number
  title: string
  description: string
  status: string
  created_by_role: string
  client_name: string
  technician_name: string
  created_at: string
  updated_at: string
}

export default function AdminDisputesPage() {
  const { user } = useAuth()
  const [disputes, setDisputes] = useState<AdminDispute[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    loadDisputes()
  }, [])

  const loadDisputes = async () => {
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://127.0.0.1:8000/api/admin/disputes", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      if (!response.ok) throw new Error("Error al cargar disputas")
      const data = await response.json()
      setDisputes(data.data || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar las disputas")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (disputeId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/api/admin/disputes/${disputeId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) throw new Error("Error al actualizar")
      loadDisputes()
    } catch (err: any) {
      setError(err.message || "Error al actualizar la disputa")
    }
  }

  const filteredDisputes = disputes.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.technician_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || d.status === activeTab
    return matchesSearch && matchesTab
  })

  const stats = {
    open: disputes.filter(d => d.status === "open").length,
    in_review: disputes.filter(d => d.status === "in_review").length,
    resolved: disputes.filter(d => d.status === "resolved").length,
    rejected: disputes.filter(d => d.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Gestión de Disputas</h1>
            <p className="text-xs text-muted-foreground">Panel de administración</p>
          </div>
          <Button asChild>
            <Link href="/admin">Volver</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Abiertas</p>
                <p className="text-2xl font-bold text-foreground">{stats.open}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Revisión</p>
                <p className="text-2xl font-bold text-foreground">{stats.in_review}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resueltas</p>
                <p className="text-2xl font-bold text-foreground">{stats.resolved}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rechazadas</p>
                <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disputes Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Todas las Disputas</CardTitle>
                <CardDescription>Total: {disputes.length} disputas</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Todas ({disputes.length})</TabsTrigger>
                <TabsTrigger value="open">Abiertas</TabsTrigger>
                <TabsTrigger value="in_review">En Revisión</TabsTrigger>
                <TabsTrigger value="resolved">Resueltas</TabsTrigger>
                <TabsTrigger value="rejected">Rechazadas</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredDisputes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">No hay disputas</h3>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr className="text-sm">
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Título</th>
                          <th className="text-left py-3 px-4 font-medium">Cliente</th>
                          <th className="text-left py-3 px-4 font-medium">Técnico</th>
                          <th className="text-left py-3 px-4 font-medium">Estado</th>
                          <th className="text-left py-3 px-4 font-medium">Fecha</th>
                          <th className="text-right py-3 px-4 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDisputes.map((dispute) => {
                          const estado = estadoConfig[dispute.status]
                          return (
                            <tr key={dispute.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                              <td className="py-3 px-4 text-sm font-mono text-muted-foreground">#{dispute.id}</td>
                              <td className="py-3 px-4 text-sm font-medium text-foreground max-w-xs truncate">
                                {dispute.title}
                              </td>
                              <td className="py-3 px-4 text-sm text-foreground">{dispute.client_name}</td>
                              <td className="py-3 px-4 text-sm text-foreground">{dispute.technician_name}</td>
                              <td className="py-3 px-4">
                                <Badge variant={estado.variant as any}>{estado.label}</Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">
                                {new Date(dispute.created_at).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/disputas/${dispute.id}`}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Ver Detalle
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />

                                    {dispute.status !== "in_review" && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(dispute.id, "in_review")}>
                                        <Clock className="mr-2 h-4 w-4" />
                                        Revisar
                                      </DropdownMenuItem>
                                    )}

                                    {dispute.status !== "resolved" && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(dispute.id, "resolved")}>
                                        <CheckIcon className="mr-2 h-4 w-4" />
                                        Resolver
                                      </DropdownMenuItem>
                                    )}

                                    {dispute.status !== "rejected" && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(dispute.id, "rejected")}>
                                        <XIcon className="mr-2 h-4 w-4" />
                                        Rechazar
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
