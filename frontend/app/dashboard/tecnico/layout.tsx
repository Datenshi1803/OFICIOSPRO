"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useQuota } from "@/hooks/use-quota"
import { TechnicianOnly } from "@/components/protected-route"
import {
  Wrench, Home, FileText, MessageSquare, User, Settings,
  Menu, X, Bell, Search, Star, MoreVertical, LogOut, AlertCircle,
  Zap, Gift, ShoppingCart, Coins, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TecnicoLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const { quota, loading: loadingQuota } = useQuota()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  const freeCredits  = quota?.free_bids_remaining  ?? 0
  const paidCredits  = quota?.paid_bids_remaining  ?? 0
  const totalCredits = freeCredits + paidCredits

  const navigation = [
    { name: "Inicio", href: "/dashboard/tecnico", icon: Home },
    { name: "Trabajos", href: "/dashboard/tecnico/trabajos", icon: Wrench },
    { name: "Mis Cotizaciones", href: "/dashboard/tecnico/cotizaciones", icon: FileText },
    { name: "Mensajes", href: "/dashboard/tecnico/mensajes", icon: MessageSquare, badge: 3 },
    { name: "Mi Perfil", href: "/dashboard/tecnico/perfil", icon: User },
  ]

  return (
    <TechnicianOnly>
      <div className="min-h-screen bg-slate-50 dark:bg-background font-sans selection:bg-primary/20">

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-4 left-4 z-50 w-[260px] transform rounded-2xl bg-card border shadow-xl transition-all duration-300 ease-out lg:translate-x-0 flex flex-col overflow-hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-[120%]"}`}>

          <div className="flex h-20 items-center justify-between px-6 bg-gradient-to-b from-primary/5 to-transparent">
            <Link href="/" className="flex items-center gap-3 px-1">
              <img
                src="/Logo3.svg"
                alt="OficiosPro"
                className="h-14 w-auto object-contain drop-shadow-sm"
              />
            </Link>
            <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1.5 px-4 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* ── Créditos / Comprar ────────────────────────────────── */}
            <div className="pt-2 pb-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1.5">
                Créditos
              </p>

              <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-3 mb-2 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                      <Gift className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    </span>
                    Gratuitos
                  </span>
                  {loadingQuota
                    ? <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    : <span className="text-xs font-black text-foreground tabular-nums">{freeCredits}</span>
                  }
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                      <Zap className="h-3 w-3 text-primary fill-primary" />
                    </span>
                    De pago
                  </span>
                  {loadingQuota
                    ? <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    : <span className="text-xs font-black text-foreground tabular-nums">{paidCredits}</span>
                  }
                </div>

                <div className="h-px bg-border/60" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Total</span>
                  {loadingQuota
                    ? <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    : <span className="flex items-center gap-1 text-xs font-black text-primary">
                        <Coins className="h-3.5 w-3.5" />
                        {totalCredits}
                      </span>
                  }
                </div>
              </div>

              <Link
                href="/dashboard/tecnico/creditos"
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-primary bg-primary/8 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Comprar créditos</span>
                {!loadingQuota && (
                  <span className="ml-auto flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-primary/15 group-hover:bg-white/20 text-[10px] font-black tabular-nums transition-colors">
                    {totalCredits}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          <div className="p-4 bg-muted/30 border-t m-2 rounded-xl mt-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="h-10 w-10 ring-2 ring-background shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user?.name?.charAt(0) ?? "T"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{user?.name ?? "Técnico"}</p>
                  <p className="text-[10px] flex items-center text-muted-foreground font-medium uppercase tracking-wider">
                    <Star className="h-3 w-3 text-amber-400 mr-1 fill-amber-400" />
                    {user?.reputation_score ?? "0.00"} • Pro
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-background/80">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 rounded-xl p-2 shadow-xl border-muted/20 backdrop-blur-lg">
                  <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 py-1.5">
                    Mi Cuenta
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5">
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver Perfil Público</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>Soporte Técnico</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-muted/50" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg cursor-pointer py-2.5 text-rose-500 focus:text-rose-500 focus:bg-rose-50 dark:focus:bg-rose-500/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-bold">Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>

        <div className="lg:pl-[290px] pr-4 sm:pr-6 lg:pr-8 py-4 transition-all duration-300">

          <header className="sticky top-4 z-30 flex h-16 items-center justify-between rounded-2xl border bg-card/80 backdrop-blur-md px-4 sm:px-6 shadow-sm mb-8">
            <div className="flex items-center gap-4">
              <button className="lg:hidden bg-secondary p-2 rounded-lg" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hidden sm:block">
                Panel de Control
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/tecnico/creditos"
                className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-bold shadow-sm hover:border-primary/40 hover:text-primary transition-colors"
              >
                {loadingQuota
                  ? <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  : <Zap className="h-3.5 w-3.5 text-primary fill-primary" />
                }
                <span>{loadingQuota ? "..." : totalCredits}</span>
                <span className="text-muted-foreground font-normal hidden sm:inline">créditos</span>
              </Link>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar..." className="w-64 pl-10 bg-secondary/50 border-transparent rounded-full h-10" />
              </div>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-card"></span>
              </Button>
            </div>
          </header>

          <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </main>
        </div>
      </div>
    </TechnicianOnly>
  )
}