// app/dashboard/tecnico/creditos/pago/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import PagueloFacilWidget from '@/components/PagueloFacilWidget';

export default function PagoPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Recuperar datos del pago guardados en el paso anterior
    const stored = sessionStorage.getItem('pending_payment');
    if (!stored) {
      router.push('/dashboard/tecnico/creditos');
      return;
    }
    setPaymentData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!paymentData) return;

    const scriptEl = document.createElement('script');
    scriptEl.src = process.env.NEXT_PUBLIC_PAGUELOFACIL_ENV === 'sandbox'
      ? process.env.NEXT_PUBLIC_PAGUELOFACIL_SANDBOX_SCRIPT!
      : process.env.NEXT_PUBLIC_PAGUELOFACIL_PROD_SCRIPT!;
    scriptEl.async = true;
    scriptEl.setAttribute('type', 'text/javascript');
    document.body.appendChild(scriptEl);

    scriptEl.onerror = () => setError('No se pudo cargar el widget PagueloFácil. Revisa la URL del script.');

    scriptEl.onload = () => {
      // @ts-ignore
      window.PF.init({
        cclw:            paymentData.cclw,
        amount:          paymentData.amount,
        lang:            'ES',
        defaultCurrency: 'USD',
        description:     paymentData.description,

        // PagueloFácil llama esto cuando el pago es exitoso
        onTxSuccess: async (data: any) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(
              `${API_URL}/payments/confirm`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  payment_id: paymentData.payment_id,
                  cod_oper:   data.CodOper,
                }),
              }
            );

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            // Limpiar y navegar a pantalla de éxito
            sessionStorage.removeItem('pending_payment');
            sessionStorage.setItem('payment_result', JSON.stringify(result.data));
            router.push('/dashboard/tecnico/creditos/exitoso');

          } catch (err: any) {
            setError('Tu pago fue procesado pero hubo un error al acreditar. Contacta soporte.');
          }
        },

        // PagueloFácil llama esto cuando el pago falla o es rechazado
        onTxError: (err: any) => {
          setError('Pago rechazado. Verifica los datos de tu tarjeta e intenta nuevamente.');
        },
      });
    };

    return () => {
      if (document.body.contains(scriptEl)) {
        document.body.removeChild(scriptEl);
      }
    };
  }, [paymentData]);

  if (!paymentData) return null;

  return (
    <main className="mx-auto max-w-lg px-4 py-10">

      {/* Resumen del pedido — esto sí lo diseña el desarrollador */}
      <div className="mb-6 rounded-2xl border bg-card p-5">
        <h2 className="text-lg font-bold">Resumen del pedido</h2>
        <p className="mt-1 text-muted-foreground">{paymentData.description}</p>
        <p className="mt-3 text-3xl font-black">${paymentData.amount} USD</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Aquí PagueloFácil inyecta su formulario completo */}
      <div id="paguelofacil-container" className="rounded-2xl border bg-card p-4" />

      {/* Botón cancelar — debajo del widget */}
      <button
        onClick={() => router.push('/dashboard/tecnico/creditos')}
        className="mt-4 w-full text-center text-sm text-muted-foreground underline"
      >
        Cancelar y volver
      </button>

    </main>
  );
}