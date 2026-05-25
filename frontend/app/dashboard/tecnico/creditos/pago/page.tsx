// app/dashboard/tecnico/creditos/pago/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

type Stage = 'summary' | 'loading' | 'waiting' | 'confirming' | 'error';

export default function PagoPage() {
  const router   = useRouter();
  const popupRef = useRef<Window | null>(null);
  const pollRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const [paymentData, setPaymentData] = useState<any>(null);
  const [stage, setStage]             = useState<Stage>('summary');
  const [error, setError]             = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('pending_payment');
    if (!stored) {
      router.push('/dashboard/tecnico/creditos');
      return;
    }
    setPaymentData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
    };
  }, []);

  const handlePay = async () => {
    if (!paymentData) return;
    setStage('loading');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/payments/create-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_id: paymentData.payment_id }),
      });

      const result = await res.json();
      if (!res.ok || !result.data?.url) {
        throw new Error(result.message ?? 'No se pudo generar el enlace de pago');
      }

      // ✅ Guarda el code LK- para confirmación posterior
      sessionStorage.setItem('pf_link_code', result.data.code);

      openPopup(result.data.url);

    } catch (err: any) {
      setError(err.message ?? 'Error al iniciar el pago.');
      setStage('error');
    }
  };

  const openPopup = (url: string) => {
    const w = 520, h = 680;
    const left = window.screenX + (window.outerWidth  - w) / 2;
    const top  = window.screenY + (window.outerHeight - h) / 2;

    const popup = window.open(
      url,
      'paguelofacil_checkout',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      setError(
        'Tu navegador bloqueó la ventana de pago. ' +
        'Permite ventanas emergentes para este sitio e intenta nuevamente.'
      );
      setStage('error');
      return;
    }

    popupRef.current = popup;
    setStage('waiting');

    pollRef.current = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(pollRef.current!);
          setStage('summary');
          return;
        }

        const popupUrl = popup.location.href;

        // ✅ Detecta tanto /exitoso (demo) como /retorno (producción)
        if (
          popupUrl.includes('/creditos/exitoso') ||
          popupUrl.includes('/creditos/retorno')
        ) {
          clearInterval(pollRef.current!);
          popup.close();

          // Intenta leer params (producción los manda, demo no)
          const params = new URL(popupUrl).searchParams;
          const operFromParams = params.get('Oper') ?? params.get('oper');
          const estadoFromParams = params.get('Estado') ?? params.get('estado');

          // Si vienen params y fue denegada
          if (estadoFromParams === 'Denegada' || estadoFromParams === 'Denied') {
            const razon = params.get('Razon') ?? 'El pago fue rechazado.';
            setStage('error');
            setError(razon);
            return;
          }

          // Usa el Oper de los params si viene (producción), si no usa el LK- guardado (demo)
          const code = operFromParams ?? sessionStorage.getItem('pf_link_code');

          if (code) {
            confirmPayment(code);
          } else {
            setStage('error');
            setError('No se pudo identificar la operación. Contacta soporte.');
          }
        }
      } catch {
        // cross-origin mientras está en paguelofacil.com — normal, ignorar
      }
    }, 500);
  };

  const confirmPayment = async (oper: string) => {
    setStage('confirming');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/payments/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_id: paymentData.payment_id,
          cod_oper:   oper,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message ?? 'Error al confirmar');

      // ✅ Guarda el resultado para mostrarlo en /exitoso
      sessionStorage.removeItem('pending_payment');
      sessionStorage.removeItem('pf_link_code');
      sessionStorage.setItem('payment_result', JSON.stringify(result.data));

      router.push('/dashboard/tecnico/creditos/exitoso');

    } catch (err: any) {
      setStage('error');
      setError(
        `Tu pago fue procesado pero hubo un error al acreditar. ` +
        `Contacta soporte. (Ref: ${oper})`
      );
    }
  };

  if (!paymentData) return null;

  return (
    <main className="mx-auto max-w-lg px-4 py-10">

      <div className="mb-6 rounded-2xl border bg-card p-5">
        <h2 className="text-lg font-bold">Resumen del pedido</h2>
        <p className="mt-1 text-muted-foreground">{paymentData.description}</p>
        <p className="mt-3 text-3xl font-black">${paymentData.amount} USD</p>
      </div>

      {stage === 'error' && (
        <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {(stage === 'summary' || stage === 'error') && (
        <>
          <button
            onClick={handlePay}
            className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition hover:opacity-90"
          >
            Pagar ${paymentData.amount} USD
          </button>
          <button
            onClick={() => router.push('/dashboard/tecnico/creditos')}
            className="mt-4 w-full text-center text-sm text-muted-foreground underline"
          >
            Cancelar y volver
          </button>
        </>
      )}

      {stage === 'loading' && (
        <div className="flex flex-col items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Preparando pasarela de pago…</p>
        </div>
      )}

      {stage === 'waiting' && (
        <div className="flex flex-col items-center rounded-2xl border bg-card px-6 py-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
          <h3 className="text-base font-bold">Ventana de pago abierta</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Completa tu pago en la ventana emergente de PagueloFácil.
            Esta página se actualizará automáticamente al terminar.
          </p>
          <button
            onClick={() => { setStage('summary'); popupRef.current?.close(); }}
            className="mt-6 text-sm text-muted-foreground underline"
          >
            Cancelar
          </button>
        </div>
      )}

      {stage === 'confirming' && (
        <div className="flex flex-col items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Confirmando tu pago…</p>
        </div>
      )}

    </main>
  );
}