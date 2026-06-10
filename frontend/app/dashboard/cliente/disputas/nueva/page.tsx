"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Job {
  id: number
  title: string
  code: string
}

export default function NewDisputePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    job_id: "",
    title: "",
    description: "",
    reason: "",
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://127.0.0.1:8000/api/my-jobs", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      if (!response.ok) throw new Error("Error al cargar trabajos")
      const data = await response.json()
      setJobs(data.data || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar tus trabajos")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.job_id || !formData.title || !formData.description || !formData.reason) {
      setError("Por favor completa todos los campos requeridos")
      return
    }

    setSubmitting(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://127.0.0.1:8000/api/disputes", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          job_id: parseInt(formData.job_id),
          title: formData.title,
          description: formData.description,
          reason: formData.reason,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Error al crear la disputa")
      }

      router.push("/dashboard/cliente/disputas")
    } catch (err: any) {
      setError(err.message || "Error al crear la disputa")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/cliente/disputas">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Nueva Disputa</h1>
              <p className="text-xs text-muted-foreground">Reporta un problema con un trabajo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Información de la Disputa</CardTitle>
            <CardDescription>
              Proporciona los detalles del problema que deseas reportar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Selection */}
              <div className="space-y-2">
                <Label htmlFor="job_id">Trabajo *</Label>
                <Select value={formData.job_id} onValueChange={(value) => setFormData({ ...formData, job_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el trabajo afectado" />
                  </SelectTrigger>
                  <SelectContent>
                    {loading ? (
                      <SelectItem value="" disabled>
                        Cargando trabajos...
                      </SelectItem>
                    ) : jobs.length === 0 ? (
                      <SelectItem value="" disabled>
                        No tienes trabajos disponibles
                      </SelectItem>
                    ) : (
                      jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id.toString()}>
                          {job.code} - {job.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Selecciona el trabajo relacionado con esta disputa
                </p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Disputa *</Label>
                <Input
                  id="title"
                  placeholder="Ej: Trabajo incompleto"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.title.length}/200 caracteres
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Problema *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe detalladamente qué pasó..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/1000 caracteres
                </p>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Razón de la Disputa *</Label>
                <Textarea
                  id="reason"
                  placeholder="Explica por qué estás abriendo esta disputa..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.reason.length}/1000 caracteres
                </p>
              </div>

              {/* Important Info */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <h4 className="font-medium text-blue-900 mb-2">Información importante</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Las disputas serán revisadas por nuestro equipo en 24 horas</li>
                  <li>Ambas partes tendrán la oportunidad de responder</li>
                  <li>Se tomarán decisiones basadas en evidencia y términos de servicio</li>
                  <li>Las disputas falsas pueden resultar en sanciones</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" asChild>
                  <Link href="/dashboard/cliente/disputas">Cancelar</Link>
                </Button>
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear Disputa"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
