'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertCircle,
  Zap,
  Star,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CreditCard,
  Crown,
} from 'lucide-react';

interface Package {
  id: number;
  name: string;
  credits: number;
  price: number;
  is_featured: boolean;
}

export default function ComprarCreditosPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bid-credit-packages`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error al cargar paquetes');

        setPackages(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = async (pkg: Package) => {
    setLoading(true);
    setError('');
    setSelectedPackage(pkg);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/bid-credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ package_id: pkg.id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al iniciar el pago');

      window.location.href = data.data.payment_url;
    } catch (err: any) {
      setError(err.message);
      setSelectedPackage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Fondo premium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute bottom-[-140px] left-[-100px] h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[110px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            Cotizaciones adicionales
          </div>

          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Compra créditos y gana más oportunidades
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Elige el paquete que mejor se adapte a ti y continúa enviando cotizaciones
            para conseguir nuevos trabajos.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-sm ring-1 ring-border">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Pago seguro
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-sm ring-1 ring-border">
              <Zap className="h-4 w-4 text-primary" />
              Créditos sin vencimiento
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-sm ring-1 ring-border">
              <CreditCard className="h-4 w-4 text-primary" />
              PagueloFácil
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mx-auto mb-8 max-w-3xl rounded-2xl border-destructive/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loadingPackages ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card/80 px-10 py-8 shadow-xl backdrop-blur">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Cargando paquetes disponibles...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => {
              const isLoading = loading && selectedPackage?.id === pkg.id;
              const pricePerCredit = (pkg.price / pkg.credits).toFixed(2);

              return (
                <article
                  key={pkg.id}
                  className={`
                    group relative flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] border p-1 transition-all duration-300
                    ${
                      pkg.is_featured
                        ? 'border-primary/40 bg-gradient-to-b from-primary to-primary/80 shadow-2xl shadow-primary/30 lg:-translate-y-4'
                        : 'border-border bg-card/80 shadow-lg shadow-black/5 backdrop-blur hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10'
                    }
                  `}
                >
                  {pkg.is_featured && (
                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur">
                      <Crown className="h-3.5 w-3.5 fill-white" />
                      Popular
                    </div>
                  )}

                  <div
                    className={`
                      flex h-full flex-col rounded-[1.7rem] p-6
                      ${pkg.is_featured ? 'bg-white/10 text-white' : 'bg-background/60'}
                    `}
                  >
                    <div className="mb-7">
                      <div
                        className={`
                          mb-5 flex h-12 w-12 items-center justify-center rounded-2xl
                          ${pkg.is_featured ? 'bg-white/20' : 'bg-primary/10'}
                        `}
                      >
                        {pkg.is_featured ? (
                          <Star className="h-6 w-6 fill-white text-white" />
                        ) : (
                          <Zap className="h-6 w-6 text-primary" />
                        )}
                      </div>

                      <p
                        className={`
                          text-sm font-black uppercase tracking-[0.2em]
                          ${pkg.is_featured ? 'text-white/75' : 'text-muted-foreground'}
                        `}
                      >
                        {pkg.name}
                      </p>

                      <div className="mt-4 flex items-end gap-1">
                        <span className="text-5xl font-black tracking-tight">
                          ${pkg.price}
                        </span>
                        <span
                          className={`
                            mb-2 text-sm font-bold
                            ${pkg.is_featured ? 'text-white/70' : 'text-muted-foreground'}
                          `}
                        >
                          USD
                        </span>
                      </div>

                      <p
                        className={`
                          mt-2 text-sm
                          ${pkg.is_featured ? 'text-white/70' : 'text-muted-foreground'}
                        `}
                      >
                        ${pricePerCredit} por cotización
                      </p>
                    </div>

                    <div
                      className={`
                        mb-7 h-px w-full
                        ${pkg.is_featured ? 'bg-white/20' : 'bg-border'}
                      `}
                    />

                    <ul className="mb-8 flex-1 space-y-4">
                      <li className="flex items-center gap-3">
                        <span
                          className={`
                            flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                            ${pkg.is_featured ? 'bg-white/20' : 'bg-primary/10'}
                          `}
                        >
                          <Zap className={pkg.is_featured ? 'h-4 w-4 text-white' : 'h-4 w-4 text-primary'} />
                        </span>
                        <span className="text-sm font-semibold">
                          {pkg.credits} cotizaciones disponibles
                        </span>
                      </li>

                      <li className="flex items-center gap-3">
                        <span
                          className={`
                            flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                            ${pkg.is_featured ? 'bg-white/20' : 'bg-emerald-500/10'}
                          `}
                        >
                          <CheckCircle2 className={pkg.is_featured ? 'h-4 w-4 text-white' : 'h-4 w-4 text-emerald-500'} />
                        </span>
                        <span
                          className={`
                            text-sm
                            ${pkg.is_featured ? 'text-white/85' : 'text-muted-foreground'}
                          `}
                        >
                          Sin fecha de vencimiento
                        </span>
                      </li>

                      <li className="flex items-center gap-3">
                        <span
                          className={`
                            flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                            ${pkg.is_featured ? 'bg-white/20' : 'bg-emerald-500/10'}
                          `}
                        >
                          <ShieldCheck className={pkg.is_featured ? 'h-4 w-4 text-white' : 'h-4 w-4 text-emerald-500'} />
                        </span>
                        <span
                          className={`
                            text-sm
                            ${pkg.is_featured ? 'text-white/85' : 'text-muted-foreground'}
                          `}
                        >
                          Pago protegido y encriptado
                        </span>
                      </li>
                    </ul>

                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      disabled={loading}
                      className={`
                        group/btn flex h-13 w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60
                        ${
                          pkg.is_featured
                            ? 'bg-white text-primary shadow-xl hover:bg-white/90'
                            : 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90'
                        }
                      `}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          Comprar ahora
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer seguro */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border bg-card/80 p-5 text-center shadow-lg backdrop-blur">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Pago 100% seguro procesado por PagueloFácil
          </div>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Serás redirigido a PagueloFácil para completar tu compra de forma segura.
            Tus créditos se acreditarán después de confirmar el pago.
          </p>
        </div>
      </section>
    </main>
  );
}