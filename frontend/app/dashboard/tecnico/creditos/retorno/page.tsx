// app/dashboard/tecnico/creditos/retorno/page.tsx
//
// PagueloFácil navega aquí al terminar el pago (dentro del popup).
// Esta página solo muestra un spinner — el padre lee la URL del popup
// directamente mediante polling, así que no necesita hacer nada más.
//
'use client';

export default function RetornoPage() {
  // El padre (pago/page.tsx) detecta esta URL via polling y cierra el popup.
  // Esta pantalla solo se ve un instante antes de que el popup sea cerrado.
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Procesando pago…</p>
    </div>
  );
}