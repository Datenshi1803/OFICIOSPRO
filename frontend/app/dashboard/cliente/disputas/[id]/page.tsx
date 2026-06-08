"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

const estadoConfig: Record<string, { label: string; variant: string }> = {
  open: { label: "Abierta", variant: "default" },
  in_review: { label: "En Revisión", variant: "secondary" },
  resolved: { label: "Resuelta", variant: "outline" },
  rejected: { label: "Rechazada", variant: "destructive" },
  closed: { label: "Cerrada", variant: "outline" },
}

interface DisputeDetail {
  id: number
  job_id: number
  title: string
  description: string
  status: string
  reason: string
  resolution: string | null
  created_at: string
  updated_at: string
}

export default function DisputeDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const disputeId = params.id as string

  const [dispute, setDispute] = useState<DisputeDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    loadDisputeDetail()
  }, [disputeId])

  const loadDisputeDetail = async () => {
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/api/disputes/${disputeId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      if (!response.ok) throw new Error("Error al cargar la disputa")
      const data = await response.json()
      setDispute(data.data)
    } catch (err: any) {
      setError(err.message || "Error al cargar la disputa")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    setSendingMessage(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/api/disputes/${disputeId}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ message: message.trim() }),
      })
      if (!response.ok) throw new Error("Error al enviar el mensaje")
      setMessage("")
      loadDisputeDetail()
    } catch (err: any) {
      setError(err.message || "Error al enviar el mensaje")
    } finally {
      setSendingMessage(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!dispute) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Disputa no encontrada</h3>
          <Button asChild className="mt-4">
            <Link href="/dashboard/cliente/disputas">Volver</Link>
          </Button>
        </div>
      </div>
    )
  }

  const estado = estadoConfig[dispute.status] || estadoConfig.open

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/cliente/disputas">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Detalle de Disputa</h1>
              <p className="text-xs text-muted-foreground">ID: {dispute.id}</p>
            </div>
          </div>
          <Badge variant={estado.variant as any}>{estado.label}</Badge>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Dispute Info */}
            <Card>
              <CardHeader>
                <CardTitle>{dispute.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Descripción</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{dispute.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Razón de la Disputa</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{dispute.reason}</p>
                </div>

                {dispute.resolution && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Resolución</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{dispute.resolution}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Creada</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(dispute.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Actualizada</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(dispute.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Mensajes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.name?.charAt(0) || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">Tú - hace 2 horas</p>
                      <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                        He reportado esta disputa porque el técnico no completó el trabajo según lo acordado.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Admin Support</p>
                      <p className="text-xs text-muted-foreground mb-2">Sistema - hace 1 hora</p>
                      <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                        Hemos revisado tu caso. Nos comunicaremos con el técnico para más información.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                {dispute.status !== "closed" && (
                  <div className="border-t border-border pt-4 space-y-3">
                    <Textarea
                      placeholder="Escribe tu mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-24 resize-none"
                    />
                    <Button onClick={handleSendMessage} disabled={sendingMessage || !message.trim()} className="w-full">
                      {sendingMessage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={estado.variant as any} className="w-full justify-center py-2">
                  {estado.label}
                </Badge>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Contactar Soporte
                </Button>
                {dispute.status !== "closed" && (
                  <Button variant="outline" className="w-full">
                    Cerrar Disputa
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
