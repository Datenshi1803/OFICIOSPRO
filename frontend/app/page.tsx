"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Wrench,
  Shield,
  Star,
  Users,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  ChevronRight,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">OficiosPro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#como-funciona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Cómo funciona
            </Link>
            <Link href="#servicios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Servicios
            </Link>
            <Link href="#tecnicos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Para Técnicos
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              <Link href="#como-funciona" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Cómo funciona
              </Link>
              <Link href="#servicios" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Servicios
              </Link>
              <Link href="#tecnicos" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Para Técnicos
              </Link>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/registro">Registrarse</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Disponible en Panamá</span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Conectamos clientes con técnicos de{" "}
              <span className="text-primary">aire acondicionado</span> verificados
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Publica tu trabajo, recibe cotizaciones de técnicos certificados y elige la mejor opción. 
              Sin complicaciones, con garantía de calidad.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                <Link href="/registro?tipo=cliente">
                  Publicar un Trabajo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/registro?tipo=tecnico">
                  Soy Técnico
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4">
            {[
              { value: "500+", label: "Técnicos verificados" },
              { value: "2,000+", label: "Trabajos completados" },
              { value: "4.8", label: "Calificación promedio" },
              { value: "24h", label: "Tiempo de respuesta" },
            ].map((stat) => (
              <Card key={stat.label} className="border-border bg-card/50">
                <CardContent className="p-4 text-center sm:p-6">
                  <div className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="border-t border-border bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              En solo 3 pasos encuentra al técnico perfecto para tu necesidad
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Publica tu trabajo",
                description: "Describe qué necesitas, sube fotos y establece tu presupuesto estimado.",
              },
              {
                step: "02",
                icon: Users,
                title: "Recibe cotizaciones",
                description: "Técnicos verificados te envían sus propuestas con precios y tiempos.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Elige y confirma",
                description: "Compara opciones, selecciona al mejor técnico y agenda tu servicio.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-5xl font-bold text-primary/20">{item.step}</div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Todo lo que necesitas para encontrar el técnico ideal
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Nuestra plataforma te brinda las herramientas para tomar la mejor decisión con confianza.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Técnicos verificados",
                    description: "Todos los técnicos pasan por un proceso de verificación de identidad y credenciales.",
                  },
                  {
                    icon: Star,
                    title: "Sistema de reputación",
                    description: "Reseñas verificadas de clientes reales para que elijas con confianza.",
                  },
                  {
                    icon: Clock,
                    title: "Respuesta rápida",
                    description: "Recibe múltiples cotizaciones en menos de 24 horas.",
                  },
                  {
                    icon: DollarSign,
                    title: "Precios competitivos",
                    description: "Compara cotizaciones y encuentra la mejor relación calidad-precio.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-warning/60" />
                    <div className="h-3 w-3 rounded-full bg-accent/60" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 text-sm font-medium text-muted-foreground">Cotizaciones recibidas</div>
                  <div className="space-y-4">
                    {[
                      { name: "Carlos M.", rating: 4.9, price: "$85", time: "2-3 horas", jobs: 127 },
                      { name: "Roberto S.", rating: 4.7, price: "$95", time: "1-2 horas", jobs: 89 },
                      { name: "Miguel A.", rating: 4.8, price: "$75", time: "3-4 horas", jobs: 203 },
                    ].map((tech, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                            {tech.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{tech.name}</span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                {tech.rating}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">{tech.jobs} trabajos</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{tech.price}</div>
                          <div className="text-xs text-muted-foreground">{tech.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Technicians */}
      <section id="tecnicos" className="border-t border-border bg-sidebar py-20 text-sidebar-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <Card className="border-sidebar-border bg-sidebar-accent">
                <CardContent className="p-8">
                  <div className="mb-6 text-lg font-medium text-sidebar-foreground/80">Tus ganancias potenciales</div>
                  <div className="mb-8 text-5xl font-bold text-sidebar-primary">$2,500+</div>
                  <div className="text-sm text-sidebar-foreground/60">Promedio mensual por técnico activo</div>
                  
                  <div className="mt-8 space-y-4">
                    {[
                      "Acceso a clientes verificados",
                      "Sin cuota mensual - solo pagas por trabajo cerrado",
                      "Soporte para disputas y garantías",
                      "Construye tu reputación digital",
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-sidebar-primary" />
                        <span className="text-sm text-sidebar-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Eres técnico de aire acondicionado?
              </h2>
              <p className="mt-4 text-lg text-sidebar-foreground/80">
                Únete a nuestra red de profesionales verificados y accede a más clientes 
                sin depender del boca a boca.
              </p>

              <div className="mt-10">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link href="/registro?tipo=tecnico">
                    Registrarme como Técnico
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-sidebar-primary">10%</div>
                  <div className="mt-1 text-sm text-sidebar-foreground/60">Comisión por trabajo cerrado</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sidebar-primary">$0</div>
                  <div className="mt-1 text-sm text-sidebar-foreground/60">Cuota de registro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              ¿Listo para encontrar al técnico perfecto?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Publica tu primer trabajo gratis y recibe cotizaciones de técnicos verificados en menos de 24 horas.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto" asChild>
                <Link href="/registro">
                  Comenzar Ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">OficiosPro</span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Conectamos clientes con técnicos de aire acondicionado verificados en Panamá. 
                Calidad garantizada, precios competitivos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground">Plataforma</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cómo funciona</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Para Clientes</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Para Técnicos</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Precios</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Términos de uso</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Política de privacidad</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 OficiosPro. Todos los derechos reservados. Panamá.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
