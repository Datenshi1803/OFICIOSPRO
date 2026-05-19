// app/dashboard/tecnico/creditos/exitoso/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface PaymentResult {
  message: string;
  credits_added: number;
  paid_bids_remaining: number;
}

function ExitosoContent() {
  const router = useRouter();
  const [result, setResult] = useState<PaymentResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('payment_result');
    if (stored) {
      setResult(JSON.parse(stored));
      sessionStorage.removeItem('payment_result');
    }
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4">

      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Icono de éxito */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/10">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Título */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <Sparkles className="h-3.5 w-3.5" />
            Pago confirmado
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            ¡Créditos acreditados!
          </h1>
          <p className="mt-2 text-muted-foreground">
            {result?.message ?? 'Tu compra fue procesada exitosamente.'}
          </p>
        </div>

        {/* Card de créditos */}
        <div className="mb-6 overflow-hidden rounded-3xl border bg-card shadow-xl">

          {result ? (
            <div className="divide-y divide-border">
              {/* Créditos añadidos */}
              <div className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Créditos comprados
                  </p>
                  <p className="text-2xl font-black text-foreground">
                    +{result.credits_added}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">cotizaciones</span>
                  </p>
                </div>
              </div>

              {/* Total disponible */}
              <div className="flex items-center gap-4 bg-primary/5 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total disponible ahora
                  </p>
                  <p className="text-2xl font-black text-primary">
                    {result.paid_bids_remaining}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">cotizaciones</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Sin resultado en sessionStorage — igual muestra algo útil
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estado</p>
                <p className="font-bold text-foreground">Pago procesado correctamente</p>
                <p className="text-sm text-muted-foreground">Tus créditos ya están disponibles.</p>
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <button
          onClick={() => router.push('/dashboard/tecnico/trabajos-disponibles')}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90 active:scale-95"
        >
          Ver trabajos disponibles
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => router.push('/dashboard/tecnico/creditos')}
          className="mt-3 w-full text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Volver a mis créditos
        </button>

      </div>
    </main>
  );
}

export default function ExitosoPage() {
  return (
    <Suspense>
      <ExitosoContent />
    </Suspense>
  );
}