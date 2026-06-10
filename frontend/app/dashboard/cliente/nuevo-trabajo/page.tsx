"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Wrench,
  ArrowLeft,
  X,
  MapPin,
  Clock,
  DollarSign,
  Info,
  ImageIcon,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { storeJob, getCategories } from "@/lib/api"
import LocationPicker from "@/components/LocationPicker"
import { LocationData } from "@/types/location"
import { Loader2 } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"




export default function NuevoTrabajoPage() {
  const [categorias, setCategorias] = useState<{ id: number; name: string }[]>([])
const [categoriasLoading, setCategoriasLoading] = useState(true)

useEffect(() => {
  getCategories()
    .then((res) => setCategorias(res.data))
    .catch(() => setCategorias([]))
    .finally(() => setCategoriasLoading(false))
}, [])

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    urgencia: "normal" as "normal" | "urgente" | "emergencia", 
    presupuesto: "",
  })
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [jobUbicacion, setJobUbicacion] = useState<LocationData | null>(null)

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      setIsLoading(true)
      setError("")

      const categoryMap: Record<string, number> = {
        'mantenimiento': 1,
        'reparacion': 2,
        'instalacion': 3,
        'limpieza': 4,
        'recarga': 5,
        'diagnostico': 2
      }

       const category_id = parseInt(formData.categoria)
      const urgencyMap: Record<string, 'normal' | 'urgent' | 'emergency'> = {
        'normal': 'normal',
        'urgente': 'urgent',
        'emergencia': 'emergency'
      }

      try {
        console.log('URLs a enviar:', uploadedUrls)

        await storeJob({
          title: formData.titulo,
          description: formData.descripcion,
          category_id,
          provincia: jobUbicacion!.provincia,
          distrito:  jobUbicacion!.distrito,
          latitude:  jobUbicacion!.lat,
          longitude: jobUbicacion!.lng,
          urgency: urgencyMap[formData.urgencia] || 'normal',
          budget: formData.presupuesto ? parseFloat(formData.presupuesto) : null,
          image_urls: uploadedUrls,
        })

        router.push('/dashboard/cliente/trabajos')
      } catch (err: any) {
        setError(err.message || 'Error al publicar el trabajo')
        setIsLoading(false)
      }
    }
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.titulo && formData.descripcion && formData.categoria
    }
    if (step === 2) {
      // Ahora es obligatorio seleccionar un punto en el mapa para continuar
      return jobUbicacion !== null && formData.urgencia
    }
    return true
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/cliente">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Nuevo Trabajo</h1>
              <p className="text-xs text-muted-foreground">Paso {step} de 3</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mx-auto max-w-3xl px-8 py-6">
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-4 -z-10 h-1 w-full -translate-y-1/2 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>

          {[
            { id: 1, label: "Descripción" },
            { id: 2, label: "Ubicación" },
            { id: 3, label: "Confirmar" }
          ].map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ${
                  s.id < step
                    ? "bg-primary text-primary-foreground"
                    : s.id === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground border-2 border-background"
                }`}
              >
                {s.id < step ? <CheckCircle2 className="h-5 w-5" /> : s.id}
              </div>
              <span className={`text-xs transition-colors duration-300 ${s.id <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-4 pb-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Job Description */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Describe tu trabajo</CardTitle>
                <CardDescription>
                  Proporciona los detalles del servicio que necesitas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título del trabajo *</Label>
                  <Input
                    id="titulo"
                    placeholder="Ej: Mantenimiento de aire acondicionado split"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formData.titulo.length}/100 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Tipo de servicio *</Label>
                  <Select
                      value={formData.categoria}
                      onValueChange={(v) => setFormData({ ...formData, categoria: v })}
                      disabled={categoriasLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={categoriasLoading ? "Cargando..." : "Selecciona el tipo de servicio"} />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción detallada *</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe con detalle qué necesitas: marca y modelo del equipo, síntomas del problema, antigüedad del equipo, etc."
                    className="min-h-[150px]"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    maxLength={1000}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formData.descripcion.length}/1000 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label>Imágenes (opcional)</Label>
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{
                      maxFiles: 5,
                      multiple: true,
                      folder: 'oficiospro/jobs',
                      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                      maxFileSize: 5000000,
                    }}
                    onSuccess={(result: any) => {
                      const url = result.info.secure_url
                      setUploadedUrls((prev) => [...prev, url].slice(0, 5))
                      setPreviewImages((prev) => [...prev, url].slice(0, 5))
                    }}
                  >
                    {({ open }) => (
                      <div
                        onClick={() => open()}
                        className="cursor-pointer rounded-lg border-2 border-dashed border-input p-6 text-center hover:bg-muted/50 transition-colors"
                      >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          Haz clic para subir imágenes
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Máximo 5 imágenes, 5MB cada una — JPG, PNG, WebP
                        </p>
                      </div>
                    )}
                  </CldUploadWidget>

                  {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {previewImages.map((src, index) => (
                        <div key={index} className="group relative aspect-square">
                          <img
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Location & Urgency */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Ubicación y urgencia</CardTitle>
                <CardDescription>
                  Indica en el mapa dónde necesitas el servicio y qué tan urgente es
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Mapa unificado obligatorio */}
                <div className="space-y-2">
                  <Label>Selecciona la ubicación en el mapa *</Label>
                  <LocationPicker value={jobUbicacion} onChange={(d) => setJobUbicacion(d)} />
                  {jobUbicacion && (
                    <div className="mt-2 p-3 bg-muted rounded-lg flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Detectado:</span> {jobUbicacion.displayName}, {jobUbicacion.distrito}, {jobUbicacion.provincia}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Nivel de urgencia *</Label>
                  <RadioGroup
                    value={formData.urgencia}
                    onValueChange={(v) => setFormData({ ...formData, urgencia: v as "normal" | "urgente" | "emergencia" })}
                    className="space-y-3"
                  > 
                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-input p-4 transition-colors hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                      <RadioGroupItem value="normal" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Normal</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Puedo esperar unos días para agendar el servicio
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-input p-4 transition-colors hover:bg-muted/50 [&:has(:checked)]:border-warning [&:has(:checked)]:bg-warning/5">
                      <RadioGroupItem value="urgente" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-warning" />
                          <span className="font-medium">Urgente</span>
                          <span className="rounded bg-warning/20 px-2 py-0.5 text-xs text-warning-foreground">
                            Prioridad
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Necesito atención en las próximas 24-48 horas
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-input p-4 transition-colors hover:bg-muted/50 [&:has(:checked)]:border-destructive [&:has(:checked)]:bg-destructive/5">
                      <RadioGroupItem value="emergencia" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-destructive" />
                          <span className="font-medium">Emergencia</span>
                          <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs text-destructive">
                            Inmediato
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Es una emergencia, necesito atención hoy mismo
                        </p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto estimado (opcional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="presupuesto"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.presupuesto}
                      onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Indica cuánto estás dispuesto a pagar (los técnicos pueden cotizar diferente)
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirma tu trabajo</CardTitle>
                <CardDescription>
                  Revisa los detalles antes de publicar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <Info className="h-5 w-5" />
                    <span className="font-medium">Resumen del trabajo</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Título</p>
                      <p className="font-medium text-foreground">{formData.titulo}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Tipo de servicio</p>
                      <p className="font-medium text-foreground">
                        {categorias.find((c) => String(c.id) === formData.categoria)?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Descripción</p>
                      <p className="text-sm text-foreground whitespace-pre-line">{formData.descripcion}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Provincia</p>
                        <p className="font-medium text-foreground">
                          {jobUbicacion?.provincia || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Distrito</p>
                        <p className="font-medium text-foreground">
                          {jobUbicacion?.distrito || "No especificado"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Urgencia</p>
                      <p className="font-medium capitalize text-foreground">{formData.urgencia}</p>
                    </div>

                    {formData.presupuesto && (
                      <div>
                        <p className="text-xs text-muted-foreground">Presupuesto estimado</p>
                        <p className="font-medium text-foreground">${formData.presupuesto}</p>
                      </div>
                    )}

                    {previewImages.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs text-muted-foreground">Imágenes adjuntas</p>
                        <div className="flex gap-2">
                          {previewImages.map((src, index) => (
                            <img
                              key={index}
                              src={src}
                              alt={`Preview ${index + 1}`}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 font-medium text-foreground">¿Qué pasa después?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Tu trabajo será visible para técnicos en {jobUbicacion ? `${jobUbicacion.distrito}, ${jobUbicacion.provincia}` : 'la zona seleccionada'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Recibirás cotizaciones de técnicos verificados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Podrás comparar propuestas y elegir la mejor opción</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {error && (
            <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)} disabled={isLoading}>
                Anterior
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={!canProceed() || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publicando...
                </>
              ) : step < 3 ? (
                "Continuar"
              ) : (
                "Publicar"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}