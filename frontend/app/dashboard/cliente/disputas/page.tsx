"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Plus,
  ArrowLeft,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  MoreVertical,
  MessageSquare,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const estadoConfig: Record<string, { label: string; variant: string; icon: React.ElementType; color: string }> = {
  open: { label: "Abierta", variant: "default", icon: AlertCircle, color: "text-yellow-600" },
  in_review: { label: "En Revisión", variant: "secondary", icon: Clock, color: "text-blue-600" },
  resolved: { label: "Resuelta", variant: "outline", icon: CheckCircle2, color: "text-green-600" },
  rejected: { label: "Rechazada", variant: "destructive", icon: XCircle, color: "text-red-600" },
  closed: { label: "Cerrada", variant: "outline", icon: CheckCircle2, color: "text-gray-600" },
}

interface Dispute {
  id: number
  job_id: number
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
  created_by_role: string
}

export default function ClientDisputesPage() {
  const { user } = useAuth()
  const [disputes, setDisputes] = useState<Dispute[]>([])
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
      const response = await fetch("http://127.0.0.1:8000/api/disputes", {
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

  const filteredDisputes = disputes.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || d.status === activeTab
    return matchesSearch && matchesTab
  })

  const openCount = disputes.filter(d => d.status === "open").length
  const inReviewCount = disputes.filter(d => d.status === "in_review").length
  const resolvedCount = disputes.filter(d => d.status === "resolved").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/cliente">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Mis Disputas</h1>
              <p className="text-xs text-muted-foreground">Gestiona tus disputas activas</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/cliente/disputas/nueva">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Disputa
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Abiertas</p>
                <p className="text-2xl font-bold text-foreground">{openCount}</p>
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
                <p className="text-2xl font-bold text-foreground">{inReviewCount}</p>
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
                <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disputes */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Disputas</CardTitle>
                <CardDescription>Total: {disputes.length} disputas</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Buscar disputas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="open">Abiertas</TabsTrigger>
                <TabsTrigger value="in_review">En Revisión</TabsTrigger>
                <TabsTrigger value="resolved">Resueltas</TabsTrigger>
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
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchTerm ? "No se encontraron disputas que coincidan." : "No tienes disputas en este estado."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDisputes.map((dispute) => {
                      const estado = estadoConfig[dispute.status] || estadoConfig.open
                      return (
                        <Link
                          key={dispute.id}
                          href={`/dashboard/cliente/disputas/${dispute.id}`}
                          className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:bg-muted/50"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {dispute.title}
                                </h3>
                                <Badge variant={estado.variant as any} className="gap-1">
                                  <estado.icon className="h-3 w-3" />
                                  {estado.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {dispute.description}
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                Creada: {new Date(dispute.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/dashboard/cliente/disputas/${dispute.id}`}>
                                  <ChevronRight className="h-5 w-5" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
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
