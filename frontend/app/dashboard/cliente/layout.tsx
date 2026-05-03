"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Wrench, Plus, Search, Bell, Home, FileText,
  MessageSquare, Settings, Menu, X,
  User, Star, MoreVertical, LogOut, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientOnly } from "@/components/protected-route"

interface ClienteLayoutProps {
  children: ReactNode
}

export default function ClienteLayout({ children }: ClienteLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const user = { name: "Benjamin Bartuano", role: "Cliente" }

  const navigation = [
    { name: "Inicio", href: "/dashboard/cliente", icon: Home },
    { name: "Mis Trabajos", href: "/dashboard/cliente/trabajos", icon: FileText },
    { name: "Mensajes", href: "/dashboard/cliente/mensajes", icon: MessageSquare, badge: 2 },
    { name: "Configuración", href: "/dashboard/cliente/configuracion", icon: Settings },
  ]

  return (
    <ClientOnly>
      <div className="min-h-screen bg-slate-50 dark:bg-background font-sans">
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        <aside className={`fixed inset-y-4 left-4 z-50 w-[260px] transform rounded-2xl bg-card border shadow-xl transition-all duration-300 ease-out lg:translate-x-0 flex flex-col overflow-hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-[120%]"}`}>
          
          <div className="flex h-20 items-center justify-between px-6 bg-gradient-to-b from-primary/5 to-transparent border-b border-border/50">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">OficiosPro</span>
            </Link>
            <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
            {navigation.map((item) => {
              const isCurrent = pathname === item.href
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all duration-200"
                >
                  <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Perfil con Menú de Opciones */}
          <div className="p-4 bg-muted/30 border-t m-2 rounded-xl mt-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="h-10 w-10 ring-2 ring-background shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {user.role}
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
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 text-rose-500 focus:text-rose-500 focus:bg-rose-50 dark:focus:bg-rose-500/10">
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
              <button className="lg:hidden bg-secondary p-2 rounded-lg text-muted-foreground" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hidden sm:block">
                Panel de Control
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar trabajos..." className="w-64 pl-10 bg-secondary/50 border-transparent rounded-full h-10 focus:bg-background transition-all" />
                </div>
              </div>

              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-card"></span>
              </Button>

              <Button size="sm" className="hidden gap-2 sm:flex rounded-full shadow-md shadow-primary/10" asChild>
                <Link href="/dashboard/cliente/nuevo-trabajo">
                  <Plus className="h-4 w-4" />
                  Nuevo Trabajo
                </Link>
              </Button>
            </div>
          </header>

          <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </main>
        </div>
      </div>
    </ClientOnly>
  )
}