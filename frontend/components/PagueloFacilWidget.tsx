'use client';

import { useEffect, useRef } from 'react';

interface Props {
  paymentId: number;
  amount: number;
  description: string;
  cclw: string;
  onSuccess: (codOper: string) => void;
  onError: (error: any) => void;
}

export default function PagueloFacilWidget({
  paymentId, amount, description, cclw, onSuccess, onError
}: Props) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const script = document.createElement('script');
    script.src = process.env.NEXT_PUBLIC_PAGUELOFACIL_ENV === 'sandbox'
      ? 'https://sandbox.paguelofacil.com/linktopay/pagos.js'
      : 'https://secure.paguelofacil.com/linktopay/pagos.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      window.PF.init({
        cclw,
        amount,
        lang: 'ES',
        defaultCurrency: 'USD',
        description,
        onTxSuccess: (data: any) => {
          onSuccess(data.CodOper);
        },
        onTxError: (error: any) => {
          onError(error);
        },
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="paguelofacil-container" className="w-full min-h-[300px]" />
  );
}