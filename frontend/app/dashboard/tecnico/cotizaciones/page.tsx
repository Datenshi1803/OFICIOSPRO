"use client";

import { useEffect, useState } from "react";
import {
  Clock, CheckCircle2, XCircle, Send, Calendar,
  MessageSquare, ChevronDown, ChevronUp, AlertCircle,
  Loader2, Search,
} from "lucide-react";
import { getMyBids, BidData } from "@/lib/api";

const estadoConfig = {
  pending: {
    label: "En espera",
    icon: Clock,
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
    row: "",
  },
  accepted: {
    label: "Aceptada",
    icon: CheckCircle2,
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
    row: "bg-emerald-50/30",
  },
  rejected: {
    label: "Rechazada",
    icon: XCircle,
    badge: "bg-red-100 text-red-600 border border-red-200",
    dot: "bg-red-500",
    row: "",
  },
};

type FiltroTab = "todas" | "pending" | "accepted" | "rejected";

export default function MisCotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState<BidData[]>([]);
  const [loading, setLoading]           = useState(true);
  const [filtro, setFiltro]             = useState<FiltroTab>("todas");
  const [search, setSearch]             = useState("");
  const [expanded, setExpanded]         = useState<number | null>(null);
  const [error, setError]               = useState<string | null>(null);

  useEffect(() => { cargarDatos(); }, []);

  async function cargarDatos() {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyBids();
      if (res.success) setCotizaciones(res.data);
    } catch (err: any) {
      setError(err.message || "Error al cargar cotizaciones");
    } finally {
      setLoading(false);
    }
  }

  const total    = cotizaciones.length;
  const pending  = cotizaciones.filter(b => b.status === "pending").length;
  const accepted = cotizaciones.filter(b => b.status === "accepted").length;
  const rejected = cotizaciones.filter(b => b.status === "rejected").length;

  const filtradas = cotizaciones
    .filter(b => filtro === "todas" ? true : b.status === filtro)
    .filter(b =>
      search === "" ||
      b.proposal.toLowerCase().includes(search.toLowerCase()) ||
      String(b.job_id).includes(search)
    );

  const tabs: { key: FiltroTab; label: string; count: number }[] = [
    { key: "todas",    label: "Todas",      count: total    },
    { key: "pending",  label: "En espera",  count: pending  },
    { key: "accepted", label: "Aceptadas",  count: accepted },
    { key: "rejected", label: "Rechazadas", count: rejected },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">Cargando cotizaciones...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mis Cotizaciones
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Historial completo de tus propuestas enviadas
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* ── Contenedor principal ── */}
      <div className="bg-white dark:bg-card border rounded-2xl shadow-sm overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFiltro(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                filtro === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  filtro === tab.key
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        <div className="p-5 border-b bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por propuesta o número de trabajo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-gray-100">
          {filtradas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <div className="h-20 w-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                <Send className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin cotizaciones</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                {search
                  ? `No se encontraron resultados para "${search}"`
                  : filtro === "todas"
                  ? "Aún no has enviado ninguna cotización"
                  : `No tienes cotizaciones en estado "${tabs.find(t => t.key === filtro)?.label}"`
                }
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-sm text-blue-600 hover:underline font-medium"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            filtradas.map((bid) => {
              const cfg        = estadoConfig[bid.status] || estadoConfig.pending;
              const Icon       = cfg.icon;
              const isExpanded = expanded === bid.id;

              return (
                <div
                  key={bid.id}
                  className={`px-6 py-6 transition-colors hover:bg-gray-50/70 ${cfg.row}`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    {/* Info izquierda */}
                    <div className="flex-1 min-w-0 space-y-3">

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                          Trabajo #{bid.job_id}
                        </span>
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          <Icon className="h-3.5 w-3.5" />
                          {cfg.label}
                        </span>
                      </div>

                      {/* Propuesta */}
                      <p className={`text-base text-gray-700 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                        "{bid.proposal}"
                      </p>

                      {/* Expandir */}
                      {bid.proposal.length > 100 && (
                        <button
                          onClick={() => setExpanded(isExpanded ? null : bid.id)}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {isExpanded
                            ? <><ChevronUp className="h-4 w-4" />Ver menos</>
                            : <><ChevronDown className="h-4 w-4" />Ver propuesta completa</>
                          }
                        </button>
                      )}

                      {/* Fechas */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          Disponible: {new Date(bid.availability_date).toLocaleDateString("es-PA", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {bid.estimated_days} día{bid.estimated_days !== 1 ? "s" : ""} estimados
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Send className="h-4 w-4 text-gray-400" />
                          Enviada el {new Date(bid.created_at).toLocaleDateString("es-PA", { day: "numeric", month: "long" })}
                        </span>
                      </div>
                    </div>

                    {/* Monto derecha */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end flex-shrink-0">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${parseFloat(bid.amount).toLocaleString("es-PA", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">Tu cotización</p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                        {bid.estimated_days} días
                      </span>
                    </div>
                  </div>

                  {/* Banner aceptada */}
                  {bid.status === "accepted" && (
                    <div className="mt-5 rounded-xl bg-emerald-500 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                        <div>
                          <p className="text-white font-bold">¡Tu cotización fue aceptada!</p>
                          <p className="text-white/75 text-sm">El cliente te ha seleccionado. Coordina los detalles del trabajo.</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 bg-white text-emerald-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-50 transition flex-shrink-0">
                        <MessageSquare className="h-4 w-4" />
                        Abrir chat
                      </button>
                    </div>
                  )}

                  {/* Banner rechazada */}
                  {bid.status === "rejected" && (
                    <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3.5">
                      <p className="text-sm text-gray-500">
                        Esta propuesta no fue seleccionada por el cliente.
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {filtradas.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Mostrando <span className="font-semibold text-gray-700">{filtradas.length}</span> de <span className="font-semibold text-gray-700">{total}</span> cotizaciones
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="text-sm text-blue-600 hover:underline font-medium">
                Limpiar filtro
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
