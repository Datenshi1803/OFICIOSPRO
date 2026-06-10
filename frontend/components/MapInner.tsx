// components/MapInner.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

// Fuzzing en el Frontend (Ofusca la ubicación exacta en un radio de ±400 metros)
function fuzzCoord(coord: number, meters = 400) {
  const delta = (meters / 111320) * (Math.random() - 0.5) * 2
  return parseFloat((coord + delta).toFixed(5))
}

// Reverse Geocoding usando la API Nominatim de OpenStreetMap
async function reverseGeocode(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'OficiosProPanama/1.0 (soporte@oficiospro.com)'
      }
    })
    const data = await res.json()
    const addr = data.address || {}

    return {
      displayName: data.display_name?.split(',').slice(0, 3).join(',') ?? '',
      provincia: addr.state ?? addr.region ?? '—',
      distrito: addr.county ?? addr.city ?? addr.town ?? '—',
      neighborhood: addr.neighbourhood ?? addr.suburb ?? addr.village ?? addr.hamlet ?? addr.borough ?? '—',
    }
  } catch (error) {
    console.error("Error en reverse geocoding:", error)
    return { displayName: '', provincia: '—', distrito: '—', neighborhood: '—' }
  }
}

interface MapInnerProps {
  onChange: (data: any) => void;
  value: any;
}

export default function MapInner({ onChange, value }: MapInnerProps) {
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const customIconRef = useRef<any>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  // 1. Inicialización única del Mapa al montar el componente
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Importar Leaflet solo en cliente
    const L = require('leaflet')

    // Usar el icono por defecto de Leaflet desde CDN
    // No necesitamos crear un icono personalizado, Leaflet lo maneja automáticamente
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    const customIcon = new L.Icon.Default()
    customIconRef.current = customIcon

    // Función unificada para gestionar y reutilizar el marcador de forma segura
    const updateMarker = (map: any, lat: number, lng: number) => {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      } else {
        // Crear marcador con el icono por defecto configurado
        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(map)
      }
    }

    // Coordenadas por defecto (Panamá Centro si no hay datos guardados)
    const initialLat = value?.lat ?? 8.9936
    const initialLng = value?.lng ?? -79.5197
    const initialZoom = value ? 15 : 12

    const map = L.map(containerRef.current).setView([initialLat, initialLng], initialZoom)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Si el usuario ya cuenta con coordenadas previas en el formulario, renderizar el pin de inmediato
    if (value?.lat && value?.lng) {
      updateMarker(map, value.lat, value.lng)
    }

    // Evento de escucha para clicks manuales en el mapa
    map.on('click', async (e: any) => {
      setStatus('loading')
      const { lat, lng } = e.latlng

      // Mover la vista del mapa de forma fluida al punto clickeado
      map.setView([lat, lng], map.getZoom())
      updateMarker(map, lat, lng)

      const geo = await reverseGeocode(lat, lng)
      
      onChange({
        lat: fuzzCoord(lat),
        lng: fuzzCoord(lng),
        ...geo,
      })
      setStatus('done')
    })

    // Limpieza al desmontar el componente de la vista
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      markerRef.current = null
    }
  }, []) // Matriz vacía para asegurar que el mapa se instancie únicamente una vez

  // 2. Función del botón de Geolocalización (GPS del navegador)
  function locateMe() {
    if (!navigator.geolocation) return alert('Tu navegador no soporta geolocalización')

    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        const map = mapRef.current
        if (!map) return

        // Importar Leaflet para acceder a L.marker
        const L = require('leaflet')

        // Centrar mapa y actualizar el pin único
        map.setView([lat, lng], 15)
        
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        } else {
          // Usar el icono ya configurado
          const icon = customIconRef.current || new L.Icon.Default()
          markerRef.current = L.marker([lat, lng], { icon }).addTo(map)
        }

        const geo = await reverseGeocode(lat, lng)
        onChange({
          lat: fuzzCoord(lat),
          lng: fuzzCoord(lng),
          ...geo,
        })
        setStatus('done')
      },
      (error) => {
        console.error("Error obteniendo geolocalización:", error)
        setStatus('idle')
        alert('No se pudo acceder a tu ubicación actual. Por favor, selecciónala manualmente haciendo clic en el mapa.')
      }
    )
  }

  return (
    <div className="space-y-2">
      <div 
        ref={containerRef} 
        className="h-[250px] w-full" 
        style={{ borderRadius: 12, border: '1px solid #e5e7eb', zIndex: 1 }} 
      />
      <button
        type="button"
        onClick={locateMe}
        disabled={status === 'loading'}
        className="w-full py-2 text-sm bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '⏳ Localizando y guardando zona...' : '📍 Usar mi ubicación actual'}
      </button>
    </div>
  )
}