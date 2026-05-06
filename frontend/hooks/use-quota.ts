'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Quota {
  can_bid: boolean;
  bid_type: 'free' | 'paid' | null;
  free_bids_remaining: number;
  paid_bids_remaining: number;
}

export function useQuota() {
  const router = useRouter();
  const [quota, setQuota] = useState<Quota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/quota`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error al consultar cuota');
        setQuota(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuota();
  }, []);

  // Redirige a compra de créditos si no puede cotizar
  const checkAndBid = () => {
    if (!quota?.can_bid) {
      router.push('/dashboard/tecnico/creditos');
      return false;
    }
    return true;
  };

  // Mensaje informativo según tipo de cuota
  const quotaMessage = () => {
    if (!quota) return null;
    if (!quota.can_bid) return 'No tienes cotizaciones disponibles esta semana.';
    if (quota.bid_type === 'free')
      return `Te quedan ${quota.free_bids_remaining} cotizaciones gratuitas esta semana.`;
    if (quota.bid_type === 'paid')
      return `Usarás 1 crédito pagado. Te quedan ${quota.paid_bids_remaining} créditos.`;
    return null;
  };

  return { quota, loading, error, checkAndBid, quotaMessage };
}