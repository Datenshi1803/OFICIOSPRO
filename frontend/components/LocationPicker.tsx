// components/LocationPicker.tsx
'use client'

import dynamic from 'next/dynamic'
import { LocationData } from '@/types/location'

interface Props {
  onChange: (data: LocationData) => void;
  value: LocationData | null;
}

// Deshabilitamos SSR para evitar errores del objeto global 'window' en Next.js App Router
const MapComponent = dynamic(() => import('./MapInner'), { 
  ssr: false,
  loading: () => <div className="h-[250px] bg-gray-100 rounded-lg animate-pulse border border-gray-200" />
})

export default function LocationPicker({ onChange, value }: Props) {
  return (
    <div className="space-y-2 border p-4 rounded-xl bg-white shadow-sm">
      <label className="block text-sm font-semibold text-gray-700">Zona de Cobertura / Ubicación</label>
      <p className="text-xs text-gray-500 bg-gray-50 border rounded-lg p-2.5">
        🛡️ <strong>Privacidad:</strong>El punto mostrado en el mapa es aproximado. Tu ubicación exacta no será compartida para proteger la privacidad y seguridad de todos los usuarios.
      </p>
      
      {/* Enviamos el 'value' actual para sincronizar el estado interno del mapa */}
      <MapComponent onChange={onChange} value={value} />

      {/* Feedback visual de lo que se guardará en la base de datos */}
      {value && (
        <div className="mt-2 p-3 bg-green-50 text-green-800 rounded-lg text-xs space-y-1 border border-green-100">
          <p><strong>Provincia:</strong> {value.provincia}</p>
          <p><strong>Distrito:</strong> {value.distrito}</p>
          <p><strong>Zona/Vecindario:</strong> {value.neighborhood}</p>
        </div>
      )}
    </div>
  )
}