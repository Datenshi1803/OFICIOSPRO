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

  // Limpiar el intervalo al desmontar
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

      openPopup(result.data.url);

    } catch (err: any) {
      setError(err.message ?? 'Error al iniciar el pago.');
      setStage('error');
    }
  };

  const openPopup = (url: string) => {
    // Centrar el popup en la pantalla
    const w = 520, h = 680;
    const left = window.screenX + (window.outerWidth  - w) / 2;
    const top  = window.screenY + (window.outerHeight - h) / 2;

    const popup = window.open(
      url,
      'paguelofacil_checkout',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      // El navegador bloqueó el popup
      setError(
        'Tu navegador bloqueó la ventana de pago. ' +
        'Permite ventanas emergentes para este sitio e intenta nuevamente.'
      );
      setStage('error');
      return;
    }

    popupRef.current = popup;
    setStage('waiting');

    // Vigilar el popup hasta que navegue a nuestra URL de retorno
    const retornoPath = '/dashboard/tecnico/creditos/retorno';

    pollRef.current = setInterval(() => {
      try {
        // Si el popup fue cerrado manualmente por el usuario
        if (popup.closed) {
          clearInterval(pollRef.current!);
          setStage('summary');
          return;
        }

        // Cuando el popup navega a nuestro dominio podemos leer su URL
        const popupUrl = popup.location.href;

        if (popupUrl.includes(retornoPath)) {
          clearInterval(pollRef.current!);
          const params = new URL(popupUrl).searchParams;
          popup.close();

          const oper   = params.get('Oper')   ?? params.get('oper');
          const estado = params.get('Estado') ?? params.get('estado');
          const total  = params.get('TotalPagado') ?? params.get('totalpagado');
          const razon  = params.get('Razon')  ?? params.get('razon') ?? '';

          if (oper && estado !== 'Denegada' && total !== '0') {
            confirmPayment(oper);
          } else {
            setStage('error');
            setError(razon || 'El pago fue rechazado. Verifica los datos de tu tarjeta.');
          }
        }
      } catch {
        // Error de cross-origin normal mientras el popup está en paguelofacil.com
        // Se ignora — solo podemos leer la URL cuando vuelve a nuestro dominio
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

      sessionStorage.removeItem('pending_payment');
      sessionStorage.setItem('payment_result', JSON.stringify(result.data));
      router.push('/dashboard/tecnico/creditos/exitoso');

    } catch (err: any) {
      setStage('error');
      setError(
        `Tu pago fue procesado pero hubo un error al acreditar. ` +
        `Contacta soporte. (Oper: ${oper})`
      );
    }
  };

  if (!paymentData) return null;

  return (
    <main className="mx-auto max-w-lg px-4 py-10">

      {/* Resumen */}
      <div className="mb-6 rounded-2xl border bg-card p-5">
        <h2 className="text-lg font-bold">Resumen del pedido</h2>
        <p className="mt-1 text-muted-foreground">{paymentData.description}</p>
        <p className="mt-3 text-3xl font-black">${paymentData.amount} USD</p>
      </div>

      {/* Error */}
      {stage === 'error' && (
        <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Botón de pago */}
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

      {/* Cargando enlace */}
      {stage === 'loading' && (
        <div className="flex flex-col items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Preparando pasarela de pago…</p>
        </div>
      )}

      {/* Esperando que el usuario complete el pago en el popup */}
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

      {/* Confirmando con el backend */}
      {stage === 'confirming' && (
        <div className="flex flex-col items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Confirmando tu pago…</p>
        </div>
      )}

    </main>
  );
}